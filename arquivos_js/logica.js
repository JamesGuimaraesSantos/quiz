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

let pontuacao = 0

let botaoVerificaResposta = document.querySelector('#botao-verifica-resposta')
let botaoProximaPergunta = document.querySelector('#botao-proxima-pergunta')
const palcoPrincipal = document.querySelector('#palco-principal') // as perguntas são adicionadas aqui.
let p = criaElementosHtml() /* retorna o paragrafo que vou escrever dinâmicamente mensagens de sucesso 
ou falha */ 
let numeroPergunta = 1 // Apenas para adicionar um número no inicio da pergunta
 /*A função criaElementosHtml cria a seguinte estrutura html:
        <div>
            <h4>  texto-pergutna </h4>
        </div>

        <div>
            <input>  seletor </input>
            <label>  texto-alternativa </label>
        </div>

        <div>
            <p>  texto-resultado </p>
        </div>
essa estrutura é adicionada na div com id: palcoPrincipal   
*/
function criaElementosHtml(){ 
    let divPergunta = document.createElement('div')
    let h4 = document.createElement('h4')
    h4.className = 'display-5'

    divPergunta.appendChild(h4)
    palcoPrincipal.appendChild(divPergunta)

    for ( let i = 0; i < 4; i++){
        let divAlternativa = document.createElement('div')
        divAlternativa.className = 'form-check pb-2'

        let input = document.createElement('input')
        input.className = 'form-check-input input-radio-cor input-borda'
        input.id = i
        input.type = 'radio'
        input.name = 'flexRadioDefault'
        input.value = i
        input.addEventListener("click", () => botaoVerificaResposta.disabled = false)

        let label = document.createElement('label')
        label.className = 'form-check-label'
        label.id = `label${i}` 

        divAlternativa.appendChild(input)
        divAlternativa.appendChild(label)

        palcoPrincipal.appendChild(divAlternativa)
    }
    let divResultado = document.createElement('div')
    let p = document.createElement('p')
    p.id = 'mensagem-resultado'
    divResultado.appendChild(p)

    palcoPrincipal.appendChild(divResultado)
    return p // esse paragrafo é utilizado para escrever as mensagens de sucesso ou fracasso
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

let indiceAleatorio = adicionaPergunta(geraNumeroAleatorio())

function adicionaPergunta(indice){
    let h4 = document.querySelector('h4')
    h4.textContent = `${numeroPergunta++}) ${perguntas[indice]}`

    for (let i = 0; i < 4; i++){
        let label = document.querySelector(`#label${i}`)
        label.textContent = alternativas[indice][i]
    }
    return indice
}

function desabilitaInputs(){
    let elementosInput = document.querySelectorAll('.form-check-input')
    elementosInput.forEach(function(valor) {
        valor.disabled = true
    });

    botaoVerificaResposta.disabled = true
    botaoProximaPergunta.disabled= false
    return elementosInput
}

function verificaResposta(){
    let elementosInput = desabilitaInputs()
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

function controlaExibicaoMensagemFinal(){ // melhorar esse nome
    if (perguntas.length <= 1){
        botaoProximaPergunta.disabled = true
        setTimeout( () => {
            imprimiPontuacao()
        }, 2400 )
    }
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

    palcoPrincipal.appendChild(p)
}

function imprimeProximaPergunta(){ 
    botaoProximaPergunta.disabled = true

    if ( perguntas.length > 1 ){
        removeItemArray(indiceAleatorio)
        removeConteudoPagina()
        criaElementosHtml()
        indiceAleatorio = geraNumeroAleatorio() 
        adicionaPergunta(indiceAleatorio)
    } 
}

function removeItemArray(indice){
    perguntas.splice(indice, 1)
    alternativas.splice(indice, 1)
}

function removeConteudoPagina(){
    palcoPrincipal.innerText = ''
}
    
function imprimiPontuacao(){
    removeConteudoPagina()

    let h2 = document.createElement('h2')
    h2.className = 'display-5 text-center'
    h2.textContent = `Parabens por chegar até o final. Sua pontuação foi de ${pontuacao} pontos`
    palcoPrincipal.appendChild(h2)

    botaoVerificaResposta.disabled = true
}