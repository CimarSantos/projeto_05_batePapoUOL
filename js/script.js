const entraParticipantes = "https://mock-api.driven.com.br/api/v6/uol/participants";
const statusUser = "https://mock-api.driven.com.br/api/v6/uol/status";
const mensagens = "https://mock-api.driven.com.br/api/v6/uol/messages";

let sendUser;
let Usuario;
let userName;
let server;


function entraNaSala() {
    userName = { name: prompt("Nome de usuário: ") }

    sendUser = axios.post(entraParticipantes, userName);

    sendUser.then(entraNaSala);
    sendUser.catch((response) => { verificacao() });
}

function verificacao() {
    Usuario = axios.post(statusUser, userName);

    Usuario.then((response) => {

    })

    Usuario.catch((error) => {
        windo.location.reload();
    })
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
    let areaChat = document.querySelector(".box-message");
    for (let i = 0; i < response.data.length; i++) {
        const m = response.data[i]
        const boxMensagem = document.querySelector(".box-message");
        if (response.data[i].text == "entra na sala..." && response.data[i].type == "status") {

            boxMensagem.innerHTML += `<div class="statusMessage"> <p class="letra-time">(${response.data[i].time})</p> <p><span>${response.data[i].from}</span></p> ${response.data[i].text}</div>`
        }
        if (response.data[i].type == "message" && response.data[i].to == "Todos") {
            boxMensagem.innerHTML += `<div class="publicMessage"><p class="letra-time">(${response.data[i].time})</p> <p><span>${response.data[i].from}</span></p> <p>para</p> <span>todos: </span> ${response.data[i].text}</div>`
        }
        if (response.data[i].type == "message" && response.data[i].to != "Todos") {
            boxMensagem.innerHTML += `<div class="publicMessage"><p class="letra-time">(${response.data[i].time})</p> <span>${response.data[i].from} </span> <p> para </p> <b>${response.data[i].to}</b>: ${response.data[i].text}</div>`
        }
        if (response.data[i].type == "private_message") {
            boxMensagem.innerHTML += `<div class="privateMessage"> <p class="letra-time">(${response.data[i].time})</p> <span>${response.data[i].from}</span> <p> reservadamente </p> para: <b>${response.data[i].to}</b> ${response.data[i].text}</div>`
        }
        areaChat.scrollIntoView(false);
    }
}

setInterval(() => {
    const atualizacao = axios(mensagens);
    atualizacao.then(mostraChat);

}, 3000)



function mandaMensagem() {

    const mensagemEnviada = document.querySelectorAll("input").value;

    corpoMensagem = {
        from: userName,
        to: "Todos",
        text: mensagemEnviada,
        type: "message",
    };

    messageToServer = axios.post(mensagens, mensagemEnviada);
    messageToServer.then((response) => {
        corpoMensagem = axios.post(mensagens);
        toServer.then(mostraChat);
    });
    messageToServer.catch((error) => {
        window.location.reload();
    })
}