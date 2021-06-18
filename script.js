const musicContainer = document.querySelector('.music-container')
const index = document.querySelector('#indexNumber')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')
const spk = document.querySelector('.speaker')
const old = document.querySelector('.classic')
const news = document.querySelector('.uyScuti')
const txt = document.querySelector('.text')

// Song titles
let songs = ['Bounce', 'CashApp', 'Feeling', 'InTheEnd', 'Rock', 'Forever', 'ThisYourBody', 'pastLives', 'Kina', 'CloudyDay']

let uy = ['CupOfTea', 'Jailer', 'Julie', 'NeedForSpeed', 'Rock', 'PonPon', 'RoughUp', 'Somebody', 'SoMuchMore', 'Want']

// Keep track of songs
let songIndex = 0

// Initially load song into DOM
let defau = songs
loadSong(defau[songIndex])

// Update song details

function loadSong(song) {
    index.innerText = `${songIndex + 1} of ${songs.length}`
    title.innerText = song
    audio.src = `./music/${song}.mp3`
    cover.src = `./images/${song}.jpg`
}

function port2() {
    defau = []

    for (let k = 0; k < uy.length; k++) {
        defau.push(uy[k])
    }

    news.classList.add('pop')
    old.classList.remove('pop')

    loadSong(defau[songIndex])
    playSong()
}

function port() {
    news.classList.remove('pop')
    old.classList.add('pop')

    loadSong(songs[songIndex])
    playSong()
}

function playSong() {
    spk.classList.add('st', 'play')
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
}

function pauseSong() {
    spk.classList.remove('play')
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')

    audio.pause()
}

function prevSong() {
    songIndex--

    if(songIndex < 0) {
        songIndex = songs.length - 1
    }

    loadSong(songs[songIndex])

    playSong()
}

function nextSong() {
    songIndex++

    if(songIndex > songs.length - 1) {
        songIndex = 0
    }

    loadSong(songs[songIndex])

    playSong()
}

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

// Change song events
old.addEventListener('click', port)
news.addEventListener('click', port2)

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)
