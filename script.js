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
        name : "freak the freak out",
        path : "./songs/song1.mpeg",
        img : "./img/img1.jpg",
        singer : "First singer",
        bgcolor : "#ffe1df"
    },

    {
        name : "CHAIYA CHAIYA REMIX",
        path : "./songs/song2.mpeg",
        img : "./img/img2.jpg",
        singer : "Shaktimaan",
        bgcolor : "#f5eaea"
    },
    {
        name : "Ilahi",
        path : "./songs/song3.mpeg",
        img : "./img/img3.jpg",
        singer : "junior jii",
        bgcolor : "#ffb8cd"
    },
    {
        name : "fourth Song",
        path : "./songs/song4.mp4",
        img : "./img/img4.jpg",
        singer : "fourth singer",
        bgcolor : "#dadada"
    },
    {
        name : "fifth Song",
        path : "./songs/song5.mpeg",
        img : "./img/img5.jpg",
        singer : "fifth singer",
        bgcolor : "#e1f8fc"
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
    document.querySelector("body").style.backgroundColor=Allsongs[idx].bgcolor;
    timer = setInterval(range_slider ,1500);
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
        <div id="autoplay" onclick="playinloop()"><i class="fa fa-circle-o-notch" aria-hidden="true"></i></div>
        <div onclick="showPlaylist()" id="playlist"><img src="https://img.icons8.com/android/24/000000/menu.png"/></div>`;
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
        let vol = track.volume * 100;
        console.log(vol);
        let inputVol = document.createElement("input");
        
        inputVol.min=0;
        inputVol.max=100;
        inputVol.setAttribute("type","range");
        inputVol.setAttribute("value",`${vol}`);
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


// playlist Addition
let show=false;
// showPlaylist();
function showPlaylist(){
  if(!show){
    for(let i=0;i<Allsongs.length;i++){
        let songlist = document.querySelector(".songs_list");
        // let col = document.getElementById("playlist");
        // col.style.backgroundColor = "#ffbfb7";
        document.querySelector(".list_heading").innerHTML = `<img onclick="showPlaylist()" src="https://img.icons8.com/ios-glyphs/40/000000/music-transcript.png"/><div class="text" >My Playlist</div>`

        songlist.style.height = "70vh";
        songlist.style.width = "30vw";
        let song1 = document.createElement("div");
        song1.classList.add("song1");
        song1.innerHTML=`<div class="songDetails">
                        <div class="songName">${Allsongs[i].name}</div>
                        <div class="artistName">${Allsongs[i].singer}</div>
                        </div>
                        <div id="listplay" onclick="lalal(${i})"><i  class="fa fa-play" aria-hidden="true"></i></div>`;
    
                        songlist.append(song1);
    
        // document.querySelector(".songName").innerText = Allsongs[i].name;
        // document.querySelector(".artistName").innerText = Allsongs[i].singer;
        // setTimeout(function(){
    
        // },2000);
    
    }
    
    
  }
  else{
    // let col = document.getElementById("playlist");
    // col.style.backgroundColor = "";
    let songlist = document.querySelector(".songs_list");
    songlist.style.height = "8vh";
    songlist.style.width = "4vw";
    document.querySelector(".list_heading").innerHTML = `<img onclick="showPlaylist()" src="https://img.icons8.com/ios-glyphs/40/000000/music-transcript.png"/>`
    // songlist.style.borderRadius = "50%"
    for(let m=0;m<Allsongs.length;m++){
        document.querySelector(".song1").remove();
    }
  }
  show=!show;
}

let crossCheck=-1;
function lalal(i){
    let toCheck=i;
    // console.log(i);
    if(toCheck != crossCheck){
        loadTrack(i);
        playSong();
        crossCheck=toCheck;
    }
    else{
        pauseSong();
        crossCheck=-1;
    }
}