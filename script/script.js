import { quizCSS } from "./cssQuestion.js";
import { quizHTML } from "./htmlQuestion.js";
import { quizJS } from "./jsQuestion.js";


let contadorQuestao = 0;
let idMode = 1;
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

    const mode = document.querySelector("#mode");
    mode.addEventListener("click", () => {
        changeMode();
    });
    
    const btn = document.querySelector("#btn");
    btn.addEventListener("click", () => {
        const escolha = document.querySelector("#tema");
        const nome = document.querySelector("#nome").value;

        if (nome === "") {
            alert("Por favor, insira seu nome antes de continuar.");
        } else if (escolha.value == "css") {
            musica();
            cssQuiz();
        } else if (escolha.value == "html") {
            musica();
            htmlQuiz();
        } else {
            musica();
            jsQuiz();
        }
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
            <button type="button" id="mode">mode</button>
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
        `
        
        const tit = document.querySelector("#titulo")
        const sub = document.querySelector("#sub")
        tit.innerText = `Quiz SoulCode`
        sub.innerText = ``
        
        const mode = document.querySelector("#mode");
        mode.addEventListener("click", () => {
            changeMode();
        });
    reiniciar()
}

function reiniciar() {
    const reiniciar = document.querySelector("#start");
    start.addEventListener("click", () => {
        inicio()
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
            audio.play(true);
}