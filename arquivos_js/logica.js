
const perguntas = [
    'Quem pintou o quadro Mona Lisa?',
    'Quem criou os personagens Mickey e Minnie Mouse?',
    'Quem foi o vencedor do Big Brother Brasil 20?',
]
const alternativas = [
    ['O pintor francês Oscar-Claude Monet.',
    'O pintor pós-impressionista neerlandês Vincent Van Gogh',
    'O pintor, escultor, arquiteto e poeta do Renascimento Italiano Michelangelo',
    'O pintor italiano Leonardo Da Vinci.'],

    ['Daniel Ek empreendedor sueco',
    'O empresário norte-americano Walt Disney.',
    'O escritor James Stewart',
    'Wilmot Reed Hastings fundador e CEO da Netflix'],

    ['A médica Thelma Assis.',
    'O surfista Lucas Chumbo;',
    'O arquiteto Breno',
    'A influenciadora digital, Mari Gonzalez']
]
const respostas = [
    'O pintor italiano Leonardo Da Vinci.',
    'O empresário norte-americano Walt Disney.',
    'A médica Thelma Assis.',
]

let divPrincipal = document.querySelector('#tela-principal')
let numeroPergunta = 1 // apenas para adicionar nas perguntas uma ordem númerica
let indiceAleatorio = null
let pontuacao = null
let nome = null

/*  proxima adição
function criaTelaInicial(){
    let divTexto = document.createElement('div')
}
*/
function capturaNome(){
    let botaoJogar = document.querySelector('#botao-jogar')
    let inputTexto = document.querySelector("#input-texto")
    if (inputTexto.value === ''){
        botaoJogar.disabled = true
        let mensagemAviso = document.querySelector("#mensagem-aviso")
        mensagemAviso.textContent = 'Você precisa digitar um nome antes de começar a jogar'
    } else{
        botaoJogar.disabled = false
        nome = inputTexto.value
        inicializaGame()
    }

}

function inicializaGame(){
    removeConteudoPagina()
    criaElementosHtmlPerguntas()
    criaBotoes()
    criaParagrafoResultado()
    indiceAleatorio = adicionaPergunta(geraNumeroAleatorio())
}

function removeConteudoPagina(){
    divPrincipal.innerText = ''
}

function criaBotoes(){
    let divBotoes = document.createElement('div')
    divBotoes.className = 'offset-2 col-8 mt-3 mb-3 d-flex justify-content-center '

    let inputHome = document.createElement('input')
    inputHome.id = 'botao-home'
    inputHome.className = 'btn me-4 btn-red'
    inputHome.type = 'button'
    inputHome.value = 'Voltar para home 🏠'
    inputHome.addEventListener('click', () => window.location.href = 'index.html')

    let inputProximaPergunta = document.createElement('input')
    inputProximaPergunta.id = 'botao-proxima-pergunta'
    inputProximaPergunta.className = 'btn me-4 btn-orange'
    inputProximaPergunta.type = 'button'
    inputProximaPergunta.value = 'Proxima pergunta ⏭️'
    inputProximaPergunta.disabled = true
    inputProximaPergunta.addEventListener('click', imprimeProximaPergunta)

    let inputVerificaResposta = document.createElement('input')
    inputVerificaResposta.id = 'botao-verifica-resposta'
    inputVerificaResposta.className = 'btn me-4 btn-yellow'
    inputVerificaResposta.type = 'button'
    inputVerificaResposta.value = 'Verificar resposta ✔️'
    inputVerificaResposta.disabled = true
    inputVerificaResposta.addEventListener('click', verificaResposta)

    divBotoes.appendChild(inputHome)
    divBotoes.appendChild(inputProximaPergunta)
    divBotoes.appendChild(inputVerificaResposta)

    divPrincipal.appendChild(divBotoes)

}

function criaElementosHtmlPerguntas(){
    let divPalco = document.createElement('div') // Aqui é onde coloco as perguntas junto com as alernativas
    divPalco.className = 'offset-2 col-8 mt-5 '
    divPalco.id = 'palco-principal'
    divPrincipal.appendChild(divPalco)

    let divPergunta = document.createElement('div')
    let h4 = document.createElement('h4')
    h4.className = 'display-5'

    divPergunta.appendChild(h4)
    divPalco.appendChild(divPergunta)

    for ( let i = 0; i < 4; i++){
        let divAlternativa = document.createElement('div')
        divAlternativa.className = 'form-check pb-2'

        let inputAlternativa = document.createElement('input')
        inputAlternativa.className = 'form-check-input input-radio-cor input-'
        inputAlternativa.id = i
        inputAlternativa.type = 'radio'
        inputAlternativa.name = 'flexRadioDefault'
        inputAlternativa.value = i
        inputAlternativa.addEventListener("click", () =>  controlaEstadosInputBotao('input verifica','habilita'))

        let labelAlternativa = document.createElement('label')
        labelAlternativa.className = 'form-check-label'
        labelAlternativa.id = `label${i}`

        divAlternativa.appendChild(inputAlternativa)
        divAlternativa.appendChild(labelAlternativa)

        divPalco.appendChild(divAlternativa)
    }

}

function criaParagrafoResultado(){
    let divResultado = document.createElement('div')
    divResultado.className = 'text-center'
    let p = document.createElement('p')
    p.id = 'mensagem-resultado'
    divResultado.appendChild(p)
    divPrincipal.appendChild(divResultado)
}

function adicionaPergunta(indice){
    let h4 = document.querySelector('h4')
    h4.textContent = `${numeroPergunta++}) ${perguntas[indice]}`

    for (let i = 0; i < 4; i++){
        let label = document.querySelector(`#label${i}`)
        label.textContent = alternativas[indice][i]
    }
    return indice
}

function geraNumeroAleatorio() {
    let numeroAleatorio = parseInt(Math.random() * 3)
    if (perguntas.length > 0){
        while (numeroAleatorio >= perguntas.length){
            numeroAleatorio = parseInt(Math.random() * 3)
        }
    }
    return numeroAleatorio
}

function verificaResposta(){
    let elementosInput = desabilitaInputAlternativas()
    let resposta = obtemAtributoSelecionado(elementosInput)
    let resultado = ''

    respostas.forEach(valor => {
        if (valor === resposta){
            resultado = 'certo'
            pontuacao += 100
        }
    });

    imprimiResultado(resultado)
    controlaExibicaoMensagemFinal()
}

function desabilitaInputAlternativas(){
    let elementosInput = document.querySelectorAll('.form-check-input')
    elementosInput.forEach(function(valor) {
        valor.disabled = true
    });
    controlaEstadosInputBotao('input verifica', 'desabilita')
    controlaEstadosInputBotao('input proxima', 'habilita')
    return elementosInput
}

function obtemAtributoSelecionado(elementosInput){
    for (let i = 0; i < elementosInput.length; i++){
        if ( elementosInput[i].checked){
            let textoLabel = document.querySelector(`#label${i}`).textContent
            return textoLabel
        }
    }
}

function imprimiResultado(resultado){
    let p = document.querySelector('#mensagem-resultado')
    if (resultado === 'certo' ){
        if(perguntas.length <= 1){
            p.textContent = 'Parabéns você acertou a última questão. Infelizmente o jogo chegou ao fim :('
        } else {
            p.textContent = 'Parabéns você acertou a questão. Pule para a próxima'
        }

    } else {
        if(perguntas.length <= 1){
            p.textContent = 'Lamento você errou a última questão. Infelizmente o jogo chegou ao fim :('
        } else {
            p.textContent = 'Lamento você errou a questão. Pule para a próxima'
        }
    }

}

function controlaExibicaoMensagemFinal(){ // melhorar esse nome
    if (perguntas.length <= 1){
        controlaEstadosInputBotao('input proxima', 'desabilita')
        setTimeout( () => {
            imprimiPontuacao()
        }, 2400 )
    }
}

function imprimeProximaPergunta(){
    controlaEstadosInputBotao('input proxima', 'desabilita')
    controlaEstadosInputBotao('input verifica', 'desabilita')
    if ( perguntas.length > 1 ){
        removeItemArray(indiceAleatorio)
        inicializaGame()
    }
}

function removeItemArray(indice){
    perguntas.splice(indice, 1)
    alternativas.splice(indice, 1)
}

function imprimiPontuacao(){
    removeConteudoPagina()
    let h2 = document.createElement('h2')
    h2.className = 'display-5 text-center'
    h2.textContent = `Parabéns por chegar até o final. Sua pontuação foi de ${pontuacao} pontos`
    divPrincipal.appendChild(h2)
    registraPontos()
    criaBotoes()
}

function registraPontos() {
    localStorage.setItem(nome, pontuacao)
}

function controlaEstadosInputBotao(input, acao){
    let botaoVerificaResposta = document.querySelector("#botao-verifica-resposta")
    let botaoProximaPergunta = document.querySelector("#botao-proxima-pergunta")
    let botaoJogar = document.querySelector('#botao-jogar')
    if (input === 'input verifica'){
        if ( acao === 'desabilita'){
            botaoVerificaResposta.disabled = true
        } else if ( acao === 'habilita'){
            botaoVerificaResposta.disabled = false
        }

    } else if (input === 'input proxima'){
        if ( acao === 'desabilita'){
            botaoProximaPergunta.disabled = true
        } else if ( acao === 'habilita'){
            botaoProximaPergunta.disabled = false
        }
    } else if (input === 'input jogar'){
        botaoJogar.disabled = false
    }
}