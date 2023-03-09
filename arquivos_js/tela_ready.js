
const tipoPergunta = 'front-end' // temporario
geraTextoInicial()

function geraTextoInicial(){
    const palcoPrincipal = document.querySelector('#palco-principal') 
    let h4 = document.createElement('h4')
    h4.className = 'text-center'
    h4.textContent = `Você terá que responder 10 questões sobre  ${tipoPergunta}.
    Está preparado? `
    palcoPrincipal.appendChild(h4)
}
