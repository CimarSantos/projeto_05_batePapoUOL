const userName = prompt("Nome de usuário: ");

const entra = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", { name: userName });
entra.then(conexao);
entra.then(puxaChat);

function conexao(response) {
    const status = response.status;

    setInterval(function() {

        const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", { name: userName });
        promise.then(response => console.log(response.status));
        promise.catch(response => console.log(erro.response.status));

    }, 5000);
}

function puxaChat(response) {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(response => {
        console.log(response.data);
    });
    setInterval(puxaChat, 3000);
}








/* let chat;
let mensagem = document.querySelector(".box-message"); */

/* function puxaChat(buscando) {

    let time = buscando.data.time;
    let from = buscando.data.from;

    mostrandoMensagem(time, from, to, type, text);


} */

/* function mostrandoMensagem(time, from, to, type, text) {

    chat = [{
        from: "",
        to: "",
        text: "",
        type: "",
        time: ""
    }]
    mensagem.innerHTML += `${time} ${from} ${to} ${type} ${text}`;
} */