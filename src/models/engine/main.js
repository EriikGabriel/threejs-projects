import Game from './script.js'

((doc, win) => {
    var playing = play.value

    if(playing === 'true') {
        Game()
    }

    jogar.addEventListener('click', () => {
        initial.style.display = 'none'
        blocker.style.display = 'initial'
        play.value = 'true'
        Game()
    })

    sair.addEventListener('click', () => {
        win.history.back()
    })
    
})(document, window);