const url = 'https://mock-api.driven.com.br/api/v6/uol';

let sendUser;
let Usuario;
let userName;
let server;
let boxMensagem;
let statusEnviar;
let mensagemEnviada;

function entraNaSala() {
    userName = { name: prompt('Nome de usuário: ') };
    sendUser = axios.post(`${url}/participants`, userName);
    sendUser.then(sucessoLogin);
    sendUser.catch(erroLogin);
}
entraNaSala();

function erroLogin() {
    alert('O usuário já logado. Tente novamente com outro nome.');
    entraNaSala();
}

function sucessoLogin() {
    obterMensagens();
    setInterval(manterConectado, 5000);
    setInterval(obterMensagens, 3000);
}

function manterConectado() {
    const requisicao = axios.post(`${url}/status`, userName);
    requisicao.then(console.log('Mantendo contectado...'));
}

function obterMensagens() {
    const requisicao = axios.get(`${url}/messages`);
    requisicao.then(mostraChat);
}

function mostraChat(response) {
    let boxMensagem = document.querySelector('.box-message');
    boxMensagem.innerHTML = '';
    for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].type == 'status') {
            boxMensagem.innerHTML += `<div class="statusMessage">${response.data[i].time} <b>${response.data[i].from}</b> ${response.data[i].text}</div>`;
        }
        if (response.data[i].type == 'message' && response.data[i].to == 'Todos') {
            boxMensagem.innerHTML += `<div class="publicMessage">${response.data[i].time}<b>${response.data[i].from} </b><span> para <b>todos</b>:</span> ${response.data[i].text}</div>`;
        }
        if (response.data[i].type == 'message' && response.data[i].to != 'Todos') {
            boxMensagem.innerHTML += `<div class="publicMessage">${response.data[i].time}<b>${response.data[i].from} </b><span> para <b>${response.data[i].to}</b>:</span> ${response.data[i].text}</div>`;
        }
        if (
            response.data[i].type == 'private_message' &&
            (response.data[i].to == userName.name ||
                response.data[i].from == userName.name)
        ) {
            boxMensagem.innerHTML += `<div class="privateMessage">${response.data[i].time}<b>${response.data[i].from} </b><span> reservadamente para: <b>${response.data[i].to}</b>:</span> ${response.data[i].text}</div>`;
        }
        boxMensagem.scrollIntoView(false);
    }
}

function mandaMensagem() {
    mensagemEnviada = document.querySelector('.botaoenviar').value;
    corpoMensagem = {
        from: userName.name,
        to: 'Todos',
        text: mensagemEnviada,
        type: 'message',
    };
    const requisicao = axios.post(`${url}/messages`, corpoMensagem);
    requisicao.then(obterMensagens);
    requisicao.catch(tratarErro);
}

function tratarErro() {
    window.location.reload();
}
