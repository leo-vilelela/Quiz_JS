import { quizCSS } from "./cssQuestion.js";
import { quizHTML } from "./htmlQuestion.js";
import { quizJS } from "./jsQuestion.js";

let idMode = 1;
let contadorQuestao = 0;
let idSom = 0;
let timerInterval; // Variável para armazenar o intervalo do cronômetro
function startTimer(duration, display) {
    let timer = duration, hours, minutes, seconds;
    timerInterval = setInterval(function () {
    hours = parseInt(timer / 3600, 10);
    minutes = parseInt((timer % 3600) / 60, 10);
    seconds = parseInt(timer % 60, 10);
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    display.textContent = hours + ":" + minutes + ":" + seconds;
    if (--timer < 0) {
        clearInterval(timerInterval);
}
    }, 1000);
}

function inicio() {
    contadorQuestao = 0;
    const content = document.querySelector("#principal");
    content.innerHTML = " ";
    const sub = document.querySelector("#sub");
    sub.innerText = `Insira seu nome e selecione um tema`;
    content.innerHTML = `
        <form>
            <label for="nome"> Nome</label>
            <input type="text" id="nome">
            <label for="tema">Tema</label>
            <select name="tema" id="tema">
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="js">JavaScript</option>
            </select>
            <button type="button" id="btn">Iniciar Quiz</button>
        </form>
        <button type="button" id="mode">mode</button>
    `;

    const btn = document.querySelector("#btn");
    
    const mode = document.querySelector("#mode");
    mode.addEventListener("click", () => {
        changeMode();
    });
    btn.addEventListener("click", () => {
        const escolha = document.querySelector("#tema");
        const nome = document.querySelector("#nome").value;
        if (nome === "") {
        alert("Por favor, insira seu nome antes de continuar.");
        } else if (escolha.value == "css") {
            idSom = 0;
            musica();
            cssQuiz();
        } else if (escolha.value == "html") {
            idSom = 0;
            musica();
            htmlQuiz();
        } else {
            idSom = 0;
            musica();
            jsQuiz();
        }
      // Iniciando o cronômetro ao iniciar o quiz (aqui defini 30 minutos)
        const duration = 60 * 30; // 30 minutos em segundos
        const display = document.querySelector("#timer");
        startTimer(duration, display);
    });
    btn.addEventListener("click", () => {
        const escolha = document.querySelector("#tema");
        const nome = document.querySelector("#nome").value;
    
        if (nome === "") {
            alert("Por favor, insira seu nome antes de continuar.");
        } else if (escolha.value == "css") {
            musica();
            cssQuiz();
            idSom = 0;
        } else if (escolha.value == "html") {
            idSom = 0;
            musica();
            htmlQuiz();
        } else {
            idSom = 0;
            musica();
            jsQuiz();
        }
    
        // Iniciando o cronômetro ao iniciar o quiz (aqui definimos 30 minutos)
        const duration = 60 * 30; // 30 minutos em segundos
        const display = document.querySelector("#timer");
        startTimer(duration, display);
    });
    
}

inicio();

function jsQuiz() {
    const content = document.querySelector("#principal");
    const sub = document.querySelector("#sub")
    sub.innerText = `Teste seu conhecimento de JavaScript!`
    content.innerHTML = `
        <div id="questao">
            <div class="resposta">
                <h3>${quizJS[contadorQuestao].pergunta}</h3>
            </div>
        </div>
    `
    for (let i = 0; i <= 3; i++) {
        content.innerHTML += `
            <div class="resposta">
            <label>
                <input type="radio" name="resposta" value="${i}">
                ${quizJS[contadorQuestao]?.alternativas[i]}
                </label>
            </div>
        `
    };
    content.innerHTML += `
        <div class="proxima">
            <button type="button" id="next">Proxima questão</button>
        </div>
            <button type="button" id="start">Reiniciar Quiz</button>
            <button type="button" id="mode">Mode</button>
            <button type="button" id="mute">Mute</button>
    `
    const next = document.querySelector("#next");
    next.addEventListener("click", () => {
    contadorQuestao++;
    const selectedAnswer = document.querySelector("input[name='resposta']:checked");
    if (contadorQuestao === 10) {
        conclusao();
    } else {
        if (selectedAnswer?.value !== undefined) {
            jsQuiz();
        } else {
            alert("Por favor, selecione uma opção.");
        }
    }
});
const mode = document.querySelector("#mode");
        mode.addEventListener("click", () => {
            changeMode();
        });
    reiniciar();
const mute = document.querySelector("#mute");
    mute.addEventListener("click", () => {
        mutar();
    });
}

function htmlQuiz() {
    const content = document.querySelector("#principal");
    const sub = document.querySelector("#sub")
    sub.innerText = `Teste seu conhecimento de Html!`
    content.innerHTML = `
        <div id="questao">
            <div class="resposta">
                <h3>${quizHTML[contadorQuestao].pergunta}</h3>
            </div>
        </div>
    `
    for (let i = 0; i <= 3; i++) {
        content.innerHTML += `
            <div class="resposta">
                <label>
                <input type="radio" name="resposta" value="${i}">
                ${quizHTML[contadorQuestao]?.alternativas[i]}
                </label>
            </div>
        `
    };
    content.innerHTML += `
        <div class="proxima">
            <button type="button" id="next">Proxima questão</button>
            </div>
            <button type="button" id="start">Reiniciar Quiz</button>
            <button type="button" id="mode">mode</button>
            <button type="button" id="mute">Mute</button>
            `
            
            
    const next = document.querySelector("#next");
    next.addEventListener("click", () => {
    contadorQuestao++;
    const selectedAnswer = document.querySelector("input[name='resposta']:checked");
    if (contadorQuestao === 10) {
        conclusao();
    } else {
        if (selectedAnswer?.value !== undefined) {
            htmlQuiz();
        } else {
            alert("Por favor, selecione uma opção.");
        }
    }
});
    const mode = document.querySelector("#mode");
    mode.addEventListener("click", () => {
        changeMode();
    });   
reiniciar();
const mute = document.querySelector("#mute");
        mute.addEventListener("click", () => {
            mutar();
        });
}

function cssQuiz() {
    
    const content = document.querySelector("#principal");
    const sub = document.querySelector("#sub")
    sub.innerText = `Teste seu conhecimento de Css!`
    content.innerHTML = `
        <div id="questao">
            <div class="resposta">
                <h3>${quizCSS[contadorQuestao].pergunta}</h3>
            </div>
        </div>
    `
    
    for (let i = 0; i <= 3; i++) {
        content.innerHTML += `
            <div class="resposta">
            <label>
            <input type="radio" name="resposta" value="${i}">
            ${quizCSS[contadorQuestao]?.alternativas[i]}
                </label>
            </div>
        `
    };
    content.innerHTML += `
    <div class="proxima">
    <button type="button" id="next">Proxima questão</button>
    </div>
    <button type="button" id="start">Reiniciar Quiz</button>
    <button type="button" id="mode">mode</button>
    <button type="button" id="mute">Mute</button>
    `

    const next = document.querySelector("#next");
    next.addEventListener("click", () => {
    contadorQuestao++;
    const selectedAnswer = document.querySelector("input[name='resposta']:checked");
    if (contadorQuestao === 10) {
        conclusao();
    } else {
        if (selectedAnswer?.value !== undefined) {
            cssQuiz();
        } else {
            alert("Por favor, selecione uma opção.");
        }
    }
});

const mode = document.querySelector("#mode");
mode.addEventListener("click", () => {
    changeMode();
});
reiniciar();
const mute = document.querySelector("#mute");
        mute.addEventListener("click", () => {
            mutar();
        });
}

function conclusao() {
    let ct = document.querySelector("#principal")
    ct.innerHTML = `
        <h1>Resultados</h1> 
        <h2 id="titulo"></h2>
        <h2 id="sub"></h2>
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Tempo</th>
                    <th>Data Quiz</th>
                    <th>Pontuação</th>
                </tr>
            </thead>
            <tbody id="quiz-results">
            </tbody>
        </table>

        <p>Média de acertos: <span id="media-acertos">--</span></p>
        <p>Média de erros: <span id="media-erros">--</span></p>

        <div class="rank-tables">
            <table>
                <caption>Tema HTML</caption>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Nome</th>
                        <th>Pontuação</th>
                    </tr>
                </thead>
                <tbody id="html-rank">
                </tbody>
            </table>

            <table>
                <caption>Tema CSS</caption>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Nome</th>
                        <th>Pontuação</th>
                    </tr>
                </thead>
                <tbody id="css-rank">
                </tbody>
            </table>

            <table>
                <caption>Tema JavaScript</caption>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Nome</th>
                        <th>Pontuação</th>
                    </tr>
                </thead>
                <tbody id="js-rank">
                </tbody>
            </table>
        </div>
        <button type="button" id="start">Reiniciar Quiz</button>
        <button type="button" id="mode">mode</button>
        <button type="button" id="mute">Mute</button>
        `
        
        const tit = document.querySelector("#titulo")
        const sub = document.querySelector("#sub")
        tit.innerText = `Quiz SoulCode`
        sub.innerText = ``
        
        const mode = document.querySelector("#mode");
        mode.addEventListener("click", () => {
            changeMode();
        });
        const mute = document.querySelector("#mute");
        mute.addEventListener("click", () => {
            mutar();
        });
        reiniciar();
        
}

function reiniciar() {
    const reiniciar = document.querySelector("#start");
    start.addEventListener("click", () => {
        inicio()
        const audio = document.querySelector("audio")
        audio.pause()
    });
}

function changeMode() {   
    idMode++;
    const body = document.querySelector("body");
        if((idMode % 2) == 0){
            body.style.backgroundColor = "#27292b";
        }else{
            body.style.backgroundColor = '#FFFFFF';
        }
}

function musica() {
    const inicio = document.querySelector("body")
            inicio.innerHTML+=`<audio>`
            const audio = document.querySelector("audio");
            audio.src = "../thinking-time-148496.mp3";
            audio.play();
}

function mutar() {        
        const audio = document.querySelector("audio");
        if((idSom % 2) === 0 ){
            audio.pause();
            idSom++;    
        }else{
            audio.play();
            idSom++;    
        }
        
    
}