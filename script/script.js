import { quizCSS } from "./cssQuestion.js";
import { quizHTML } from "./htmlQuestion.js";
import { quizJS } from "./jsQuestion.js";
import { participantesHtml } from "./nomesHTML.js";
import { participantesCss } from "./nomesCSS.js";
import { participantesJS } from "./nomesJS.js";


let idMode = 1;
let contadorQuestao = 0;
let idSom = 0;
let nome;
let escolha;
let data = Date();
let acertos = 0;
let timerInterval; 
let tempoDecorrido = 0;
let tempoTotalQuiz = 0;
let erros = 0;
let totalPerguntas = 10;


function pausarCronometro() {
    clearInterval(timerInterval);
}

function IniciarCronometro() {
    resetTimer(); // Chama a função para zerar o cronômetro
    const duration = 5 * 60; // 5 minutos em segundos
    const display = document.querySelector("#timer");
    startTimer(duration, display); // Inicia o cronômetro novamente com a nova duração
}

function startTimer(_duration, display) {
    let timer = 0;
    let hours, minutes, seconds;
    timerInterval = setInterval(function () {
        timer++;
        hours = parseInt(timer / 3600, 10);
        minutes = parseInt((timer % 3600) / 60, 10);
        seconds = parseInt(timer % 60, 10);
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = hours + ":" + minutes + ":" + seconds;

        // Atualize o tempo total do quiz
        tempoTotalQuiz = timer;
    }, 1000);
}


function formatarTempo(tempoSegundos) {
    const hours = parseInt(tempoSegundos / 3600, 10);
    const minutes = parseInt((tempoSegundos % 3600) / 60, 10);
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

function armazenarTempo() {
    const quizResults = document.querySelector("#quiz-results");
    const tempoFormatado = formatarTempo(tempoDecorrido);
    quizResults.innerHTML += `
        <tr>
            <td>${nome}</td>
            <td>${tempoFormatado}</td>
            <td>${escolha.value}</td>
            <td>${data.slice(4, 21)}</td>
            <td>${acertos}/10</td>
        </tr>
    `;
}

// Formulário inicial
function inicio() {
    contadorQuestao = 0;
    const content = document.querySelector("#principal");
    content.innerHTML = " ";
    const sub = document.querySelector("#sub");
    sub.innerText= `Instruções:
                    -Coloque seu nome
                    -Selecione uma das opções de quiz
                    (HTML, CSS. JAVASCRIPT)
                    -Você terá 5 minutos para 
                    responder 10 questões.
                    -Ao final terá os resultados`
;
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
            <button type="button" id="btn">Iniciar<br>Quiz</button>
        </form>
        <button type="button" id="mode"><span class="material-symbols-outlined">
        brightness_medium
        </span></button>
    `;

    const btn = document.querySelector("#btn");
    const mode = document.querySelector("#mode");
    mode.addEventListener("click", () => {
        changeMode();
    });
    btn.addEventListener("click", () => {
        escolha = document.querySelector("#tema");
        nome = document.querySelector("#nome").value;
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
        // Iniciando o cronômetro ao iniciar o quiz (aqui defini 5 minutos)
        const duration = 5 * 60; // 5 minutos em segundos
        const display = document.querySelector("#timer");
        startTimer(duration, display);
        });
}


inicio();

// Função que inicia o Quiz Java Script
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
            <button type="button" id="mode"><span class="material-symbols-outlined">
            brightness_medium
            </span></button>
            <button type="button" id="mute"><span class="material-symbols-outlined">
            play_circle
            </span></button>
    `
    const next = document.querySelector("#next");
    next.addEventListener("click", () => {
    contadorQuestao++;
    const selectedAnswer = document.querySelector("input[name='resposta']:checked");
    
    contarAcertos(selectedAnswer.value, quizJS);
    
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

    reiniciar();
}

// Função que inicia o Quiz HTML
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
            <button type="button" id="mode"><span class="material-symbols-outlined">
            brightness_medium
            </span></button>
            <button type="button" id="mute"><span class="material-symbols-outlined">
            play_circle
            </span></button>
            `
            
            
    const next = document.querySelector("#next");
    next.addEventListener("click", () => {
    contadorQuestao++;
    const selectedAnswer = document.querySelector("input[name='resposta']:checked");
    
    contarAcertos(selectedAnswer.value, quizHTML);
    
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

        reiniciar();
}

// Função que inicia o Quiz CSS
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
    <button type="button" id="mode"><span class="material-symbols-outlined">
    brightness_medium
    </span></button>
    <button type="button" id="mute"><span class="material-symbols-outlined">
    play_circle
    </span></button>
    `

    const next = document.querySelector("#next");
    next.addEventListener("click", () => {
    contadorQuestao++;
    const selectedAnswer = document.querySelector("input[name='resposta']:checked");
    
    contarAcertos(selectedAnswer.value, quizCSS);
    
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

        reiniciar();
}

if (contadorQuestao === 10) {
    armazenarTempo();
    conclusao();
}


// Função que monta a tela de resultados e insights
function conclusao() {
    
    validaEscolha(escolha);
    
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
                    <th>Tema</th>
                    <th>Data Quiz</th>
                    <th>Pontuação</th>
                </tr>
            </thead>
            <tbody id="quiz-results">
            <tr>
                <th>${nome}</th>
                <th>${formatTempo(tempoTotalQuiz)}</th> <!-- Use a função formatTempo para exibir o tempo formatado -->
                <th>${escolha.value}</th>
                <th>${data.slice(4, 21)}</th>
                <th>${acertos}/10</th>
            </tr>
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
                <tbody id="html-rank">`
                let htmlRank = document.querySelector("#html-rank")
                let posicaoHtml = 1;
                let acumuladorHtml =0;
                let erros =0;
                for (let i = 0; i <= participantesHtml.length - 1; i++){
                    htmlRank.innerHTML+= ` 
                    <tr>
                        <th>${posicaoHtml}° Posição</th>
                        <th>${participantesHtml[i].nome}</th>
                        <th>${participantesHtml[i].pontuacao}/10</th>
                    </tr>
                `
                posicaoHtml++;
                acumuladorHtml+=participantesHtml[i].pontuacao;
                erros=(10 * participantesHtml.length - acumuladorHtml);
                }
                htmlRank.innerHTML+= ` 
                    <tr>
                        <th colspan=3 class="media">Média de acertos:${(acumuladorHtml/participantesHtml.length).toFixed(2)}</th>
                    </tr>
                    <tr>   
                        <th colspan =3 class="mediaErros">Média de erros:${(erros/participantesHtml.length).toFixed(2)}</th>
                    </tr>`
                ct.innerHTML +=  `
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
                <tbody id="css-rank">`
                let cssRank = document.querySelector("#css-rank")
                let posicaoCss = 1;
                let acumuladorCss=0;
                for (let i = 0; i <= participantesCss.length - 1; i++){
                    cssRank.innerHTML+= ` 
                    <tr>
                        <th>${posicaoCss}° Posição</th>
                        <th>${participantesCss[i].nome}</th>
                        <th>${participantesCss[i].pontuacao}/10</th>
                    </tr>
                `
                posicaoCss++;
                acumuladorCss+=participantesCss[i].pontuacao;
                erros=(10 * participantesCss.length - acumuladorCss);
            }
            cssRank.innerHTML+= ` 
                <tr>
                    <th colspan =3 class="media">Média de acertos:${(acumuladorCss/participantesCss.length).toFixed(2)}</th>
                </tr>
                <tr>
                    <th colspan =3 class="mediaErros">Média de erros:${(erros/participantesCss.length).toFixed(2)}</th>
                </tr>`
            ct.innerHTML +=  `
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
                <tbody id="js-rank">`
                let jsRank = document.querySelector("#js-rank")
                let posicaoJs = 1;
                let acumuladorJs=0;
                for (let i = 0; i <= participantesJS.length - 1; i++){
                    jsRank.innerHTML+= ` 
                    <tr>
                        <th>${posicaoJs}° Posição</th>
                        <th>${participantesJS[i].nome}</th>
                        <th>${participantesJS[i].pontuacao}/10</th>
                    </tr>
                `
                posicaoJs++;
                acumuladorJs+=participantesJS[i].pontuacao;
                erros=(10 * participantesJS.length - acumuladorJs);
                }
                jsRank.innerHTML+= ` 
                    <tr >
                        <th colspan =3 class="media">Média de acertos:${(acumuladorJs/participantesJS.length).toFixed(2)}</th>
                    </tr>
                    <tr>    
                        <th colspan =3 class="mediaErros">Média de erros:${(erros/participantesJS.length).toFixed(2)}</th>
                    </tr>`
            ct.innerHTML +=  `
                </tbody>
            </table>
        </div>
        <button type="button" id="start">Reiniciar Quiz</button>
        <button type="button" id="mode"><span class="material-symbols-outlined">
        brightness_medium
        </span></button>
        <button type="button" id="mute"><span class="material-symbols-outlined">
            play_circle
            </span></button>
        `

    const mediaAcertos = acertos / totalPerguntas;
    const mediaErros = erros / totalPerguntas;

    const mediaAcertosElement = document.querySelector("#media-acertos");
    const mediaErrosElement = document.querySelector("#media-erros");

    mediaAcertosElement.textContent = mediaAcertos.toFixed(2); // Exibe a média de acertos com duas casas decimais
    mediaErrosElement.textContent = mediaErros.toFixed(2); // Exibe a média de erros com duas casas decimais

    // Função que formata o tempo em horas, minutos e segundos
    function formatTempo(tempoSegundos) {
        let hours = parseInt(tempoSegundos / 3600, 10);
        let minutes = parseInt((tempoSegundos % 3600) / 60, 10);
        let seconds = parseInt(tempoSegundos % 60, 10);

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        return hours + ":" + minutes + ":" + seconds;
    }
        
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
        acertos = 0;
        pausarCronometro();
        
        function organizaRank(){
            participantesHtml.sort((a, b) =>  b.pontuacao - a.pontuacao );
            participantesCss.sort((a, b) =>  b.pontuacao - a.pontuacao );
            participantesJS.sort((a, b) =>  b.pontuacao - a.pontuacao );
        }
        
        function validaEscolha(escolha){
            if(escolha.value == "html"){
                participantesHtml.push({nome: nome, tempo: formatTempo(tempoTotalQuiz), tema: escolha.value, dataQuiz: data.slice(4, 21), pontuacao: acertos} )
                organizaRank();
            }else if(escolha.value == "css"){
                participantesCss.push({nome: nome, tempo: formatTempo(tempoTotalQuiz), tema: escolha.value, dataQuiz: data.slice(4, 21), pontuacao: acertos} )
                organizaRank();
            }else{
                participantesJS.push({nome: nome, tempo: formatTempo(tempoTotalQuiz), tema: escolha.value, dataQuiz: data.slice(4, 21), pontuacao: acertos} )
                organizaRank();
            }
        }
}

// Função que calcula os acertos
function contarAcertos(answer, subject) {
    if (answer == subject[contadorQuestao - 1].resposta) {
        acertos++;
        alert(`Parabéns, você acertou ${acertos}/10!`);
    } else {
        erros++;
        alert(`O erro é parte do aprendizado, vá em frente!`);
    }
}



// Função que reinicia o quiz
function reiniciar() {
    const reiniciarBtn = document.querySelector("#start");
    reiniciarBtn.addEventListener("click", () => {
      inicio();
      const audio = document.querySelector("audio");
      audio.pause();
      pausarCronometro(); // Pausa o cronômetro
      IniciarCronometro(); // Chama a função para reiniciar o cronômetro
    });
  }

// Função para alterar entre os temas Dark e Light
function changeMode() {   
    idMode++;
    const body = document.querySelector("body");
        if((idMode % 2) == 0){
            body.style.backgroundColor = "#27292b";
        }else{
            body.style.backgroundColor = '#FFFFFF';
        }
}

//  Função que inicia a execução da trilha de audio
function musica() {
    const inicio = document.querySelector("body")
            inicio.innerHTML+=`<audio>`
            const audio = document.querySelector("audio");
            audio.src = "../thinking-time-148496.mp3";
            audio.play();
}

//  Função que controla a execução da trilha de audio
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



