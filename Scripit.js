const songname = document.getElementById("nome");
const bandname = document.getElementById("banda");
const song = document.getElementById("audio");
const cover = document.getElementById("capa1")
const play = document.getElementById("play");
const next = document.getElementById("next");
const skip = document.getElementById("skip");
const laike = document.getElementById("laike");
const correntprogress = document.getElementById("corrent-progress");
const progresscontainer = document.getElementById("progress-container");
const shufflebutton = document.getElementById("shuffle");
const repeatbutton = document.getElementById("repeat");
const songtime = document.getElementById('song-time');
const songtotal = document.getElementById('total-time')

const ChineseNewYear = {
    songname: 'Chinese New Yea',
    artista: 'Sales' ,
    file: 'Chinese',
    liked: false,
};


const Search = {
    songname: 'Search' ,
    artista: 'NF' ,
    file: 'Search',
    liked: false,
};

const Power = {
    songname: 'Power' ,
    artista: 'Kanye West' ,
    file: 'Power',
    liked: false,
};

let isPlaying = false;
let isShuffled = false;
let repeatOn = false;
const playlist = JSON.parse(localStorage.getItem('playlist'));
let sortedplaylist = [...playlist]
let index = 0;


function playsong(){
    play.querySelector(".bi").classList.remove("bi-play-circle-fill");
    play.querySelector(".bi").classList.add("bi-pause-circle-fill");
    song.play();
    isPlaying = true;
}

function pausesong(){
    play.querySelector(".bi").classList.add("bi-play-circle-fill");
    play.querySelector(".bi").classList.remove("bi-pause-circle-fill");
    song.pause();
    isPlaying = false;
}

function playPauseDecider(){
    if(isPlaying === true){
        pausesong();
     }
    else{
        playsong();
    }
}

function initializesong(){
    cover.src = `imagens/${sortedplaylist [index].file}.jpg`;
    song.src = `musicas/${sortedplaylist [index].file}.mp3`; 
    songname.innerText = sortedplaylist[index].songname;
    bandname.innerText = sortedplaylist[index].artista;
    likeButtonRender();
}

function skipsong(){
    if(index = sortedplaylist.length - 1){
        index = 0;    
    }
    else{
        index += 1;
    }
    initializesong();
    playsong();
};

function nextsong(){
    if(index === 0){
        index = sortedplaylist.length - 1;
    }
    else{
        index -= 1;
    }
    initializesong();
    playsong();
};

function updatesongprogress(){
    const barWidth = (song.currentTime/song.duration)*100;
    correntprogress.style.setProperty('--progress',`${barWidth}%`);
    songtime.innerText = toHHMMSS(song.currentTime);
}

function jumpTo(event) {
    const width = document.getElementById('progress-container').clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition / width) * song.duration;
    song.currentTime = jumpToTime; 
}

function shuffleArray(preshuffleArray) {
    const size = preshuffleArray.length;
    let currentIndex = size - 1;

    while (currentIndex >= 0) {
        let randomIndex = Math.floor(Math.random() * size);
        let aux = preshuffleArray[currentIndex];
        preshuffleArray[currentIndex] = preshuffleArray[randomIndex];
        preshuffleArray[randomIndex] = aux; 
        currentIndex -= 1;
    }
}

function shufflebuttonclicked() {
    if (isShuffled === false) {
        isShuffled = true;
        shuffleArray(sortedplaylist); 
        shufflebutton.classList.add('button-active');
    } else {
        isShuffled = false;
        shuffleArray(sortedplaylist);
        shufflebutton.classList.remove('button-active');
        
    }
}

function repeatbuttonclicked(){
    if(repeatOn === false){
        repeatOn =  true;
        repeatbutton.classList.add('button-active');
    }
    else{
        repeatOn = false;
        repeatbutton .classList.remove('button-active');
    }
}

function nextOrRepeat(){
    if (repeatOn === false){
        nextsong();
    }
    else{
        playsong();
    }
}

function toHHMMSS(originalnumber) {
    let hours = Math.floor(originalnumber / 3600);
    let min = Math.floor((originalnumber - hours * 3600) / 60);
    let secs = Math.floor(originalnumber - hours * 3600 - min * 60);
    return `${hours.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updatesongtotal(){
    songtotal.innerText = toHHMMSS(song.duration);

}

function likeButtonRender(){
   if( sortedplaylist[index].liked === true){
    laike.querySelector('.bi').classList.remove('bi-hearts');
    laike.querySelector('.bi').classList.add('bi-heart-fill');
    laike.classList.add('button-active');
    }
    else{
        laike.querySelector('.bi').classList.add('bi-hearts');
        laike.querySelector('.bi').classList.remove('bi-heart-fill');
        laike.classList.remove('button-active');
    }
}

function likebuttonclicked(){
    if(sortedplaylist[index].liked === false){
        sortedplaylist[index].liked = true;
    }
    else{
        sortedplaylist[index].liked = false;
    }
    likeButtonRender();
    localStorage.setItem('playlist'
    ,JSON.stringify(playlist));
}

initializesong();

play.addEventListener('click', playPauseDecider);
skip.addEventListener('click', skipsong );
next.addEventListener('click', nextsong);
song.addEventListener('timeupdate', updatesongprogress);
song.addEventListener('ended',nextOrRepeat)
song.addEventListener('loadedmetadata', updatesongtotal)
progresscontainer.addEventListener('click', jumpTo);
shufflebutton.addEventListener('click', shufflebuttonclicked);
repeatbutton.addEventListener('click', repeatbuttonclicked);
laike.addEventListener('click', likebuttonclicked);
