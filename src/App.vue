<template>
<!-- 
<audio id="audio" controls src=""></audio>
<input id="range" min="0" max="100" value="0" type="range"> -->

  <div class="flex justify-center items-center w-full h-screen">
    <div class="relative flex flex-col w-fit h-72 bg-neutral-600 rounded-2xl px-8">
      <!-- Turn off the piano -->
      <div v-if="pianoSwitcher === false" class="absolute w-full h-full z-20 -ml-8"></div>

      <div class="w-full h-1/5"></div>
      <div class="flex items-end w-full h-1/5 pb-6">
        <!-- turn off button -->
        <div class="flex flex-col justify-center items-center ml-36">
          <div class="w-2 h-2 text-white mb-2"><VTurnOff/></div>
          <div class="z-30 flex items-center w-1 h-6 shadow shadow-black bg-slate-800 cursor-pointer"
            @click="turnOff">
            <div v-if="pianoSwitcher" class="z-10 w-full h-full bg-[url('./assets/img/pushedButton.png')]"></div>
            <div v-if="pianoSwitcher === false" class="w-full h-5 bg-slate-500"></div>
          </div>
        </div>
        <!-- Volume level -->
        <div class="flex items-center w-1 h-6 shadow shadow-black bg-slate-800 ml-5">
          <div class="w-full h-5 bg-slate-500"></div>
        </div>
        <div class="flex items-center w-1 h-6 shadow shadow-black bg-slate-800 ml-4">
          <div class="w-full h-5 bg-slate-500"></div>
        </div>
        <!-- Selected type -->
        <div class="flex items-center w-1 h-6 shadow shadow-black bg-slate-800 ml-5">
          <div class="w-full h-5 bg-slate-500"></div>
        </div>
        <div class="flex items-center w-1 h-6 shadow shadow-black bg-slate-800 ml-4">
          <div class="w-full h-5 bg-slate-500"></div>
        </div>
        <div class="flex items-center w-1 h-6 shadow shadow-black bg-slate-800 ml-4">
          <div class="w-full h-5 bg-slate-500"></div>
        </div>
        <!-- Select octave interval -->
        <div class="flex items-center w-1 h-6 shadow shadow-black bg-slate-800 ml-5">
          <div class="w-full h-5 bg-slate-500"></div>
        </div>
        <div class="flex items-center w-1 h-6 shadow shadow-black bg-slate-800 ml-4">
          <div class="w-full h-5 bg-slate-500"></div>
        </div>
      </div>
        
      <div class="flex w-fit h-3/5 bg-neutral-800 px-1 pt-1 pb-5">
        <!-- <div v-for="(pianoButton, index) in pianoButtons" :key="index" :id="`piano-white-${index}`"
          class="flex justify-end items-start w-6 h-full cursor-pointer bg-slate-50 rounded-b-sm mb-10 mr-px"
          :class="{'z-10 flex justify-center items-end w-3 h-4/6 select-none -translate-x-1/2 cursor-pointer text-white bg-slate-900 pb-3 -mr-3' : pianoButton.split('').find((el) => el ==='#' ) ==='#'}"
          @click="play(pianoButton, index)"
        ></div> -->

        <div v-for="(pianoButton, index) in pianoButtons" :key="index" :id="`piano-white-${index}`"
          class="flex justify-end items-start w-6 h-full cursor-pointer bg-slate-50 rounded-b-sm mb-10 mr-px"
          :class="{'z-10 flex justify-center items-end w-3 h-4/6 select-none -translate-x-1/2 cursor-pointer text-white bg-slate-900 pb-3 -mr-3' : pianoButton.name.split('').find((el) => el ==='#' ) ==='#'}"
          @click="play(pianoButton, index)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import VTurnOff from './assets/icons/VTurnOff.vue'
import { pianoButtons } from './helpers/notes'
import { ref } from 'vue'

const pianoSwitcher = ref(false);

// const pianoButtons = [
//   'A0', 'A0#', 'B0', 
//   'C1', 'C1#', 'D1', 'D1#', 'E1', 'F1', 'F1#', 'G1', 'G1#', 'A1', 'A1#', 'B1', 
//   'C2', 'C2#', 'D2', 'D2#', 'E2', 'F2', 'F2#', 'G2', 'G2#', 'A2', 'A2#', 'B2',
//   'C3', 'C3#', 'D3', 'D3#', 'E3', 'F3', 'F3#', 'G3', 'G3#', 'A3', 'A3#', 'B3',
//   'C4', 'C4#', 'D4', 'D4#', 'E4', 'F4', 'F4#', 'G4', 'G4#', 'A4', 'A4#', 'B4',
//   'C5', 'C5#', 'D5', 'D5#', 'E5', 'F5', 'F5#', 'G5', 'G5#', 'A5', 'A5#', 'B5',
//   'C6', 'C6#', 'D6', 'D6#', 'E6', 'F6', 'F6#', 'G6', 'G6#', 'A6', 'A6#', 'B6',
//   'C7', 'C7#', 'D7', 'D7#', 'E7', 'F7', 'F7#', 'G7', 'G7#', 'A7', 'A7#', 'B7',
//   'C8'
// ];
function play(pianoButton, index) {
  const context = window.AudioContext ? new AudioContext() : new webkitAudioContext();
  const osc = context.createOscillator();

  // Volume level

  // const gainNode = context.createGain();
  // gainNode.gain.value = 0.1;
  // gainNode.connect(context.destination);

  // const source = context.createBufferSource();
  // source.buffer = osc
  // source.connect(gainNode)
  // source.start()
  
  // Frequency transfer to oscillator
  osc.frequency.value = pianoButton.frequency;
  osc.type = "square";
	osc.connect(context.destination);
	osc.start(0);
  setTimeout(() => {
	    osc.stop(0);
	    osc.disconnect(context.destination);
	}, 1000 / 2);
  painter(pianoButton, index)
};

function painter(pianoButton, index) {
  const whiteKey = document.querySelector(`#piano-white-${index}`)
  if(pianoButton.name.split('')[2]) {
    whiteKey.classList.add("bg-[url('./assets/img/pushedBlack.png')]", "bg-no-repeat", "bg-cover")
    whiteKey.classList.remove("bg-slate-900")
    setTimeout (() => {
      whiteKey.classList.add("bg-slate-900")
      whiteKey.classList.remove("bg-[url('./assets/img/pushedBlack.png')]", "bg-no-repeat", "bg-cover")
    }, 1000/2)
  } else whiteKey.classList.add("bg-[url('./assets/img/pushedWhite.png')]", "bg-no-repeat", "bg-cover")
  setTimeout (() => {
      whiteKey.classList.add("bg-slate-50")
      whiteKey.classList.remove("bg-[url('./assets/img/pushedWhite.png')]", "bg-no-repeat", "bg-cover")
    }, 1000/2)
}

function turnOff() {
  pianoSwitcher.value = !pianoSwitcher.value;
}
</script>

<style scoped>
.dies {
  font-size: 5px;
}
</style>
