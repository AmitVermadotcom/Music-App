let track_img = document.querySelector('#song_image');
let play = document.querySelector("#play");
let songName = document.querySelector(".songname");
let artist = document.querySelector(".artist")
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
// let recent_volume = document.querySelector("#volumeUp");
let index = 0;
let playlist_song = false;
let timer=0;
let autoplay = false;
let track = document.createElement('audio');
let Allsongs = [
    {
        name : "first Song",
        path : "./songs/song1.mpeg",
        img : "./img/img1.jpg",
        singer : "First singer"

    },

    {
        name : "second Song",
        path : "./songs/song2.mpeg",
        img : "./img/img2.jpg",
        singer : "Second singer"

    },
    {
        name : "third Song",
        path : "./songs/song3.mpeg",
        img : "./img/img3.jpg",
        singer : "third singer"

    },
    {
        name : "fourth Song",
        path : "./songs/song4.mp4",
        img : "./img/img4.jpg",
        singer : "fourth singer"

    },
    {
        name : "fifth Song",
        path : "./songs/song5.mpeg",
        img : "./img/img5.jpg",
        singer : "fifth singer"

    },

]

function loadTrack(idx){
    reset_slider();
    clearInterval(timer);
    track.src="";
    track.src = Allsongs[idx].path;;
    songName.innerText=Allsongs[idx].name;
    artist.innerText=Allsongs[idx].singer;
    track_img.src = Allsongs[idx].img;
    track.load();
    timer = setInterval(range_slider ,1000);
}

loadTrack(index);

function justplay(){
    if(!playlist_song){
        playSong();
        
    }
    else{
        pauseSong();
    }
}

function playSong(){
    track.play();
    playlist_song=true;
    play.innerHTML=`<i class="fa fa-pause" aria-hidden="true">`;
}

function pauseSong(){
    track.pause();
    playlist_song=false;
    play.innerHTML=`<i class="fa fa-play" aria-hidden="true">`;
}

function nextSong(){
    if(index < Allsongs.length-1){
        index += 1;
    }
    else{
        index=0;
    }
    loadTrack(index);
    playSong();
}

function preSong(){
    if(index > 0){
        index -=1;
    }
    else{
        index=Allsongs.length-1;
    }
    loadTrack(index);
    playSong();
}

function change_duration(){
    slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;
}

function range_slider(){
    let position = 0;
    if(track.duration){
        position = track.currentTime * (100 / track.duration);
        slider.value = position;
    }
    if(slider.value == 100 && autoplay==false){

        nextSong();
    }
    else if(slider.value == 100 && autoplay==true){
        playSong();
    }
}

function reset_slider(){
    slider.value = 0;
}

let modalcond = false;

function optionmodal(){
    
    let optionstyle = document.querySelector("#options");
    if(!modalcond){
        // optionstyle.style.backgroundColor = "#ff614f";
        optionstyle.innerHTML = `<i class="fa fa-chevron-right" aria-hidden="true"></i>`
        let modal = document.createElement("div");
        modal.classList.add("modal");
        modal.innerHTML=`<div id="mute" onclick="muted()" ><img src="https://img.icons8.com/ios-filled/20/000000/mute--v1.png"/></div>
        <div id="autoplay" onclick="playinloop()"><i class="fa fa-circle-o-notch" aria-hidden="true"></i></div>`;
        document.querySelector(".playing").append(modal);
        modalcond = true;
    }
    else{
        // optionstyle.style.backgroundColor = "";
        optionstyle.innerHTML = `<i class="fa fa-chevron-left" aria-hidden="true"></i>`
        let modal = document.querySelector(".modal");
        modal.remove();
        modalcond = false;
    }
    
}

function playinloop(){
    let loopstyle = document.getElementById("autoplay");
    if(!autoplay){
        loopstyle.style.backgroundColor = "#ff614f";
        autoplay=true;
    }
    else{
        loopstyle.style.backgroundColor = "";
        autoplay=false;
    }
}

let isVolumeModal=false;
function volumeModal(){
    let sliders = document.querySelector(".sliders");
    if(!isVolumeModal){
        let inputVol = document.createElement("input");
        
        inputVol.min=0;
        inputVol.max=100;
        inputVol.setAttribute("type","range");
        inputVol.setAttribute("value","90");
        inputVol.setAttribute("id","volumeUp");
        inputVol.setAttribute("onchange","volume_change()");
        sliders.append(inputVol);
        isVolumeModal=true;
    }
    else{
        let volumeUp = document.querySelector("#volumeUp");
        volumeUp.remove();
        isVolumeModal=false;
    }
    
}

function volume_change(){
    track.volume = document.querySelector("#volumeUp").value / 100;
}

let mute = false;
function muted(){
    let mutestyle = document.getElementById("mute");
    if(mute) {
        mutestyle.style.backgroundColor = "";
        track.volume = 0.5;
        document.querySelector("#volumeUp").value=50;
        mute=false;
    }
    else{
        mutestyle.style.backgroundColor = "#ff614f";
        document.querySelector("#volumeUp").value=0;
        track.volume=0;
        mute=true;
    }
}