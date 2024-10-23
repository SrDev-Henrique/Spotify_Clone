const wrapper = document.getElementById("music-info");
const musicImg = document.querySelector("#song-image img");
const musicName = document.getElementById("song-name");
const musicArtist = document.getElementById("song-artist");
const mainAudio = document.getElementById("main-audio");
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById("play-pause");
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress-bar');
const playerProgress = document.getElementById('progress-area');

let musicIndex = 0;
let isPlaying = false;

window.addEventListener("load", () => {
    loadMusic(musicIndex);
});

mainAudio.addEventListener('loadeddata', updateProgressBar);

function loadMusic(indexNumb) {
    musicName.innerText = allMusics[indexNumb].name;
    musicArtist.innerText = allMusics[indexNumb].artist;
    musicImg.src = `assets/${allMusics[indexNumb].img}.jpg`;
    mainAudio.src = `assets/${allMusics[indexNumb].src}.mp3`;
}

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
        allDisks.forEach(disk => disk.classList.remove('playing'));
    } else {
        playMusic();
        updatePlayingDisk();
    }
}

function playMusic() {
    isPlaying = true;
    playBtn.classList.replace('bx-play', 'bx-pause');
    mainAudio.play();
    updatePlayingDisk();
}

function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace('bx-pause', 'bx-play');
    mainAudio.pause();
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + allMusics.length) % allMusics.length;
    loadMusic(musicIndex);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = mainAudio;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.innerText = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    mainAudio.currentTime = (clickX / width) * mainAudio.duration;
}

const allDisks = document.querySelectorAll('.disk-container');

function clicked(currentDisk) {
    allDisks.forEach(disk => disk.classList.remove('playing'));

    currentDisk.classList.add('playing');
}

function updatePlayingDisk() {
    allDisks.forEach(disk => disk.classList.remove('playing'));
    
    const playingDisk = document.querySelector(`.disk-container[index="${musicIndex}"]`);
    if (playingDisk) {
        playingDisk.classList.add('playing');
    }
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + allMusics.length) % allMusics.length;

    loadMusic(musicIndex);
    updatePlayingDisk();
    playMusic();
}

allDisks.forEach((disk, index) => {
    disk.addEventListener('click', function() {
        musicIndex = index; 
        loadMusic(musicIndex);
        updatePlayingDisk();
        playMusic(); 
    });
});

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
mainAudio.addEventListener('ended', () => changeMusic(1));
mainAudio.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(musicIndex);
