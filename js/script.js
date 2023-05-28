const texto = document.querySelector("#texto")
const entrada = document.querySelector("#entrada")
const reiniciar = document.querySelector("#reiniciar")
const resultado = document.querySelector("#resultado")
const historico = document.querySelector("#historico")
const alternaTemaBtn = document.querySelector("#alternarTema")

const textos = [
    "Você até pode escolher não plantar, mas com certeza vai colher!",
    "O mais importante da vida não é a situação em que estamos, mas a direção para a qual nos movemos.",
    "Existem apenas dois erros cometidos no caminho para o sucesso: não começar, e não chegar ao fim.",
    "A única pessoa que pode te fazer feliz é aquela que você vê quando se olha no espelho.",
    "Acredite que as grandes batalhas são dadas às pessoas de grande caráter!",
]

function novoTexto() {
    const index = Math.floor(Math.random() * textos.length)
    texto.textContent = textos[index]
}

function atualizarTeste() {
    iniciar()

    if (entrada.value === texto.textContent) {
        verificar()
    }
}

function iniciar() {
    const statusDoTeste = JSON.parse(localStorage.getItem("testeEmAndamento"))


    if(!statusDoTeste) {
        localStorage.setItem('tempoInicial', new Date().getTime())
        localStorage.setItem('testeEmAndamento', true)
    }
}

function verificar (){
    const tempoFinal = new Date().getTime()
    const tempoInicial = parseInt(localStorage.getItem('tempoInicial'))
    const tempoGasto = (tempoFinal - tempoInicial)/1000

    resultado.textContent = `Parabens! Você levou ${tempoGasto} segundos !!`

    adicionarAoHistorico(texto.textContent, tempoGasto)

    localStorage.setItem('testeEmandamento', false)
    entrada.value = ''
    novoTexto()
}

function adicionarAoHistorico(textoDigitado, tempoGasto) {
    const itemHistorico = document.createElement('p')

    itemHistorico.textContent = `texto "${textoDigitado}" - tempo: ${tempoGasto} segundos.`

    historico.appendChild(itemHistorico)
}

function reiniciarTeste() {
    entrada.value = ''
    resultado.textContent = ''
    novoTexto()
    localStorage.setItem("testeEmAndamento", false)
    historico.innerHTML = ''
}

function alternarTema() {
    const body = document.body

    body.classList.toggle("claro")
    body.classList.toggle("escuro")
}

entrada.addEventListener("keyup" , atualizarTeste)
reiniciar.addEventListener("click", reiniciarTeste)

alternaTemaBtn.addEventListener("click", alternarTema)

novoTexto()