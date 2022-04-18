const entraParticipantes = "https://mock-api.driven.com.br/api/v6/uol/participants";
const statusUser = "https://mock-api.driven.com.br/api/v6/uol/status";
const mensagens = "https://mock-api.driven.com.br/api/v6/uol/messages";
const messageToServer = "https://mock-api.driven.com.br/api/v6/uol/messages";

let sendUser;
let Usuario;
let userName;
let server;
let boxMensagem;
let statusEnviar;
let mensagemEnviada;
const manterConectado = enviar => {
    statusEnviar = enviar.status;
    continuaVerificando();
}

function entraNaSala() {
    userName = { name: prompt("Nome de usuário: ") }
    sendUser = axios.post(entraParticipantes, userName);
    sendUser.then();
    sendUser.catch((response) => { verificacao() });
}
entraNaSala();

function verificacao() {
    Usuario = axios.post(statusUser, userName);
    Usuario.then((response) => {})
        // Usuario.catch((error) => {
        //     windo.location.reload();
        // })
}

function continuaVerificando() {
    setInterval(verificacao, 5000);
}

function mostaUsuario() {
    const promise = axios.get(mensagens);
    promise.then(mostraChat);
}
mostaUsuario();

function mostraChat(response) {
    console.log(response.data)
    let fimDePapo = document.querySelector(".box-message");
    for (let i = 0; i < response.data.length; i++) {
        const m = response.data[i]
        boxMensagem = document.querySelector(".box-message")
        if (response.data[i].text == "entra na sala..." && response.data[i].type == "status") {
            boxMensagem.innerHTML += `<div class="statusMessage">${response.data[i].time} <b>${response.data[i].from}</b> ${response.data[i].text}</div>`
        }
        if (response.data[i].type == "message" && response.data[i].to == "Todos") {
            boxMensagem.innerHTML += `<div class="publicMessage">${response.data[i].time}<b>${response.data[i].from} </b><span> para <b>todos</b>:</span> ${response.data[i].text}</div>`
        }
        if (response.data[i].type == "message" && response.data[i].to != "Todos") {
            boxMensagem.innerHTML += `<div class="publicMessage">${response.data[i].time}<b>${response.data[i].from} </b><span> para <b>${response.data[i].to}</b>:</span> ${response.data[i].text}</div>`
        }
        if (response.data[i].type == "private_message") {
            boxMensagem.innerHTML += `<div class="privateMessage">${response.data[i].time}<b>${response.data[i].from} </b><span> reservadamente para: <b>${response.data[i].to}</b>:</span> ${response.data[i].text}</div>`
        }
        fimDePapo.scrollIntoView(false);
    }


}
setInterval(() => {
    const atualizacao = axios(mensagens);
    atualizacao.then(mostraChat);
}, 3000)

function mandaMensagem() {
    mensagemEnviada = document.querySelector(".botaoenviar").value;
    corpoMensagem = {
        from: userName.name,
        to: "Todos",
        text: mensagemEnviada,
        type: "message"
    };
    let blabla = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", corpoMensagem);

    ;
    // messageToServer.catch((error) => {
    //     window.location.reload();
    // })
}