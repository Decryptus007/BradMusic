window.onload = () => {
    const grid = document.querySelector('.grid')
    const flagsLeft = document.getElementById('flagsLeft')
    const win = document.getElementById('win')
    const inse = document.querySelector('.ins')
    const btn = document.querySelector('.hint')
    let width = 10
    let squares = []
    let flagRemain = 20
    flagsLeft.innerHTML = flagRemain
    let flag = 0
    let bombsAmount = 20
    let isGameOver = false

    //Create Board
    function createBoard(){
        //Get shuffled game array with random bombs
        const bombsArray = Array(bombsAmount).fill('bomb')
        const emptyArray = Array(width*width - bombsAmount).fill('valid')
        const gameArray = emptyArray.concat(bombsArray)
        const shuffledArray = gameArray.sort(() => Math.random() -0.5 )

        for (let i = 0; i < width*width; i++) {
            const square = document.createElement('div')
            square.setAttribute('id', i)
            square.classList.add(shuffledArray[i])
            grid.appendChild(square)
            squares.push(square)

            //Normal click
            square.addEventListener('click', function(e){
                click(square)
            })

            //Ctrl and left click
            square.oncontextmenu = function(e){
                e.preventDefault()
                addFlag(square)
            }
        }

        for (let i = 0; i < squares.length; i++) {
            let total = 0
            const isLeftEdge = (i % width === 0)
            const isRightEdge = (i % width === width -1)
            if(squares[i].classList.contains('valid')){
                if (i > 0 && !isLeftEdge && squares[i-1].classList.contains('bomb')) total++
                if (i > 9 && !isRightEdge && squares[i+1-width].classList.contains('bomb')) total++
                if(i>10 && squares[i-width].classList.contains('bomb')) total++
                if (i>11 && !isLeftEdge && squares[i-1-width].classList.contains('bomb')) total++
                if (i<99 && !isRightEdge && squares[i+1].classList.contains('bomb')) total++
                if (i<90 && !isLeftEdge && squares[i-1+width].classList.contains('bomb')) total++
                if (i<89 && !isRightEdge && squares[i+1+width].classList.contains('bomb')) total++
                if (i<90 && squares[i+width].classList.contains('bomb')) total++
                squares[i].setAttribute('data', total)
            }
        }
    }
    createBoard()

    //Add flags with right click
    function addFlag(square){
        if(isGameOver){
            alert("Game Session ended.\n Refresh the page for a new challenge")
            return
        } 
        if(!square.classList.contains('checked') && (flag < bombsAmount)){
            if (!square.classList.contains('flag')) {
                square.classList.add('flag')
                square.innerHTML = '🚩'
                flag++
                flagRemain -= 1
                flagsLeft.innerHTML = flagRemain
                checkForWin()
            }else{
                flagRemain += 1
                square.classList.remove('flag')
                square.innerHTML = ''
                flag--
                flagsLeft.innerHTML = flagRemain
            }
        }
    }

    //Click on square actions
    function click(square){
        let currentId = square.id
        if(isGameOver){
            alert("Game Session ended.\n Refresh the page for a new challenge")
            return
        } 
        if(square.classList.contains('checked')) return
        if(square.classList.contains('bomb')){
            gameOver(square)
        }else{
            let total = square.getAttribute('data')
            if(total != 0){
                square.classList.add('checked')
                square.innerHTML = total
                return
            }
            checkSquare(square, currentId)
        }
        square.classList.add('checked')
    }

    //Check neighboring squares once square is clicked
    function checkSquare(square, currentId){
        const isLeftEdge = (currentId % width === 0)
        const isRightEdge = (currentId % width === width -1)

        setTimeout(() => {
            if (currentId > 0 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) -1].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId > 9 && !isRightEdge) {
                const newId = squares[parseInt(currentId) +1-width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId > 10) {
                const newId = squares[parseInt(currentId) -width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId > 11 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) -1-width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 99 && !isRightEdge) {
                const newId = squares[parseInt(currentId) +1].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 90 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) -1+width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 89 && !isRightEdge) {
                const newId = squares[parseInt(currentId) +1+width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 90) {
                const newId = squares[parseInt(currentId) +width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
        }, 10)
    }

    //GameOver
    function gameOver(square){
        win.innerHTML = 'Game Over 😞💔'
        isGameOver = true

        //Show all the bombs
        squares.forEach(square => {
            if(square.classList.contains('bomb')){
                    square.innerHTML = '💣'
                setTimeout(()=>{
                    square.innerHTML = '💣💥'
                }, 500)
            }
        })
    }

    //Check for win 
    function checkForWin(){
        let matches = 0
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].classList.contains('bomb') && squares[i].classList.contains('flag')) {
                matches++
            }
            if (matches === bombsAmount) {
                win.innerHTML = 'Congratulations! You Won 🎉🎌🥳'
                isGameOver = true
            }
        }
    }

    //add eventlistener for gameplay
        btn.addEventListener('click', function open(){
            if(this.classList.contains('hint')){
                inse.style.height = 'auto'
                this.classList.remove('hint')
                this.classList.add('hintn')
                this.innerHTML = 'Gameplay 🔼'
            }else{
                inse.style.height = '0'
                this.classList.remove('hintn')
                this.classList.add('hint')
                this.innerHTML = 'Gameplay 🔽'
                }
        }) 
}