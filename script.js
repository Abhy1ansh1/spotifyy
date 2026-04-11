console.log("spotify");

let songIndex = 0;
let audioelement = new Audio('1.mp3');
let masterplay = document.getElementById('masterplay');
let myprogressbar = document.getElementById("myProgressbar");
let songitem = Array.from(document.getElementsByClassName('songitem'));
let gif = document.getElementById('gif');
let songnameDisplay = document.getElementById('songname');
let durationDisplay = document.getElementById('duration');
let nextBtn = document.getElementById('next');
let prevBtn = document.getElementById('previous');

let songs = [
  {
    songName: "salam-e-ishq",
    filepath: "1.mp3",
    coverpath: "1.jpg",
  },
  {
    songName: "badam e- alam-e-ishq",
    filepath: "2.mp3",
    coverpath: "2.jpg",
  },
  {
    songName: "can i do",
    filepath: "3.mp3",
    coverpath: "3.jpg",
  },
  {
    songName: "let me telll",
    filepath: "4.mp3",
    coverpath: "4.jpg",
  },
  {
    songName: "khus khus",
    filepath: "5.mp3",
    coverpath: "5.jpg",
  },
  {
    songName: "salamhq",
    filepath: "6.mp3",
    coverpath: "6.jpg",
  },
];

songitem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songName;
});

// Update progress bar
audioelement.addEventListener('timeupdate', () => {
    progress = parseInt((audioelement.currentTime / audioelement.duration) * 100);
    myprogressbar.value = progress;
});

// Allow seeking
myprogressbar.addEventListener('change', () => {
    audioelement.currentTime = (myprogressbar.value / 100) * audioelement.duration;
});



// Master play button
masterplay.addEventListener('click', () => {
    if (audioelement.paused || audioelement.currentTime <= 0) {
        audioelement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioelement.pause();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Individual song item clicks
songitem.forEach((element, index) => {
    element.addEventListener('click', () => {
        songIndex = index;
        playSong(index);
    });
});

// Next button
nextBtn.addEventListener('click', () => {
    songIndex = (songIndex + 1);
    
    playSong(songIndex);
});

// Previous button
prevBtn.addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong(songIndex);
});

// Auto play next song when current ends
audioelement.addEventListener('ended', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
});

function playSong(index) {
    audioelement.src = songs[index].filepath;
    songnameDisplay.innerText = songs[index].songName;
    audioelement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
}

