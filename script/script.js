import {quizCSS} from "./cssQuestion.js" ;
import {quizHTML} from "./htmlQuestion.js" ;
import {quizJS } from "./jsQuestion.js" ;

const formulario = document.querySelector("#formulario");
function inicio() {
    const sub = document.querySelector("#sub")
    sub.innerText=`Insira seu nome e selecione um tema`
    formulario.innerHTML=`
    <label for="nome"> Nome</label>
    <input type="text" id="nome">
    <label for="tema">Tema</label>
    <select name="tema" id="tema" >
    <option value="html">HTML</option>
    <option value="css">CSS</option>
    <option value="js">JavaScript</option>
    </select>
    <button type="button" id="btn">Iniciar Quiz</button>
    `
    const btn = document.querySelector("#btn");
    const escolha = document.querySelector("#tema");
    btn.addEventListener("click", () =>{
        let selected = escolha.value;
        alert(selected);
        if(selected == "css"){
            cssQuiz();
        } else if (selected == "html" ) {
            htmlQuiz();
        } else {
            jsQuiz ();
        } 
        
    })
    
}

inicio();

let j = 0;
function jsQuiz() {
    const sub = document.querySelector("#sub")
    sub.innerText=`Teste seu conhecimento de JavaScript!`
    formulario.innerHTML=`
    <div id="questao">
    <div class="resposta">
    <h3>${quizJS[j].pergunta}</h3>
        </div>
    </div>`

    for(let i=0;i <=3; i++){
        formulario.innerHTML+=`
    <div class="resposta">
    <label>
       <input type="radio" name="resposta" value="${i}">
       ${quizJS[j].alternativas[i]}
        </label>
    </div>
        `
    };   
    formulario.innerHTML+=`
    <div class="proxima">
        <button type="button" id="next">Proxima questão</button>
    </div>
        <button type="button" id="start">Reiniciar Quiz</button>
        `
    const next = document.querySelector("#next")
    next.addEventListener("click", () => {
        j++
        if(j == 10){
            conclusao();
        }
        jsQuiz();  
});
    const start = document.querySelector("#start")
    start.addEventListener("click", () => {
        j=0;
    inicio();   
});
}


function htmlQuiz() {
    const sub = document.querySelector("#sub")
    sub.innerText=`Teste seu conhecimento de Html!`
    formulario.innerHTML=`
    <div id="questao">
        <div class="resposta">
            <h3>${quizHTML[j].pergunta}</h3>
        </div>
    </div>`
    for(let i=0;i <=3; i++){
        formulario.innerHTML+=`
    <div class="resposta">
        <label>
        <input type="radio" name="resposta" value="${i}">
        ${quizHTML[j].alternativas[i]}
     </label>
    </div>
        `
    };   
    formulario.innerHTML+=`
    <div class="proxima">
        <button type="button" id="next">Proxima questão</button>
    </div>
        <button type="button" id="start">Reiniciar Quiz</button>
        `
    const next = document.querySelector("#next")
    next.addEventListener("click", () => {
        j++
        if(j == 10){
            conclusao();
        }
        htmlQuiz();  
});
    const start = document.querySelector("#start")
    start.addEventListener("click", () => {
        j=0;
    inicio();   
});
}


function cssQuiz() {
    const sub = document.querySelector("#sub")
    sub.innerText=`Teste seu conhecimento de Css!`
    formulario.innerHTML=`
    <div id="questao">
        <div class="resposta">
            <h3>${quizCSS[j].pergunta}</h3>
        </div>
    </div>`
    for(let i=0;i <=3; i++){
        formulario.innerHTML+=`
    <div class="resposta">
    <label>
    <input type="radio" name="resposta" value="${i}">
    ${quizCSS[j].alternativas[i]}
     </label>
    </div>
        `
    };   
    formulario.innerHTML+=`
    <div class="proxima">
        <button type="button" id="next">Proxima questão</button>
    </div>
        <button type="button" id="start">Reiniciar Quiz</button>
        `
    const next = document.querySelector("#next")
    next.addEventListener("click", () => {
        j++
        if(j == 10){
            conclusao();
        }
        cssQuiz();
});
    const start = document.querySelector("#start")
    start.addEventListener("click", () => {
        j=0;
    inicio();   
});
}

function conclusao() {
    const principal = document.querySelector("main")
    principal.innerHTML=`<h1>Resultados</h1>
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
    `
    const start = document.querySelector("#start");
    start.addEventListener("click", () => {
        j=0;
    inicio()   
});
}





