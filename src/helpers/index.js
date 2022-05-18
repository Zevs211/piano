
// <audio id="audio" controls src=""></audio>
// <input id="range" min="0" max="100" value="0" type="range">

let audio = document.getElementById('audio');
let range = document.getElementById('range');

range.onchange = function(){
  if (this.value == this.min){
    audio.volume = 0;
  } else if(this.value == this.max){
    audio.volume = 1;
  }
}
