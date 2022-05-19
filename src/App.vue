<template>
  <div class="flex justify-center items-center w-full h-screen">
    <div class="relative flex flex-col w-fit h-72 bg-neutral-600 rounded-2xl px-8">
      <!-- Turn off the piano -->
      <div v-if="pianoSwitcher === false" class="absolute w-full h-full z-20 -ml-8"></div>

      <div class="w-full h-1/5"></div>
      <div class="flex items-end w-full h-1/5 pb-6">
        <!-- turn off button -->
        <div class="flex flex-col justify-center items-center ml-36">
          <div class="w-2 h-2 text-white mb-3"><VTurnOff/></div>
          <div class="z-30 flex items-center w-1 h-6 shadow shadow-black bg-slate-800 cursor-pointer"
            @click="turnOff">
            <div v-if="pianoSwitcher" class="z-10 w-full h-full bg-[url('./assets/img/pushedButton.png')]"></div>
            <div v-if="pianoSwitcher === false" class="w-full h-5 bg-slate-500"></div>
          </div>
        </div>
        <!-- Volume level -->
        <div class="flex flex-col ml-5">
          <div class="flex justify-between mb-3">
            <div class="circle mx-px" :class="{'bg-black' : gain === 0 && pianoSwitcher}, {'bg-slate-50' : gain >= 0.2 && pianoSwitcher}"></div>
            <div class="circle mx-px" :class="{'bg-slate-50' : gain === 0.4 && pianoSwitcher}, {'bg-slate-50' : gain > 0.4 && pianoSwitcher}"></div>
            <div class="circle mx-px" :class="{'bg-slate-50' : gain === 0.6 && pianoSwitcher}, {'bg-slate-50' : gain > 0.6 && pianoSwitcher}"></div>
            <div class="circle mx-px" :class="{'bg-slate-50' : gain === 0.8 && pianoSwitcher}, {'bg-slate-50' : gain > 0.8 && pianoSwitcher}"></div>
            <div class="circle mx-px" :class="{'bg-slate-50' : gain === 1 && pianoSwitcher}"></div>
          </div>
          <div class="flex justify-center">
            <div 
              class="down flex items-center w-1 h-6 shadow shadow-black bg-slate-800 cursor-pointer"
              @click="volumeDown"
            >
              <div class="inside-down w-full h-5 bg-slate-500"></div>
            </div>

            <div 
              class="up flex items-center w-1 h-6 shadow shadow-black bg-slate-800 cursor-pointer ml-4"
              @click="volumeUp"
            >
              <div class="inside-up w-full h-5 bg-slate-500"></div>
            </div>
          </div>
        </div>
        <!-- Selected tone -->
        <div class="flex flex-col justify-center items-center w-40">
          <div class="flex">
            <div v-for="tone in tones" :key="tone" class="flex">
              <span class="tone text-white mx-1">{{tone}}</span>
            </div>
          </div>
          <div class="flex">
            <div v-for="tone in tones" :key="tone" :id="`${tone}`" 
              class="flex items-center w-1 h-6 shadow shadow-black bg-slate-800 cursor-pointer mx-2 mt-2"
              @click="selectTone(tone)"
            >
              <div :id="`inside-${tone}`" class="w-full h-5 bg-slate-500"></div>
            </div>
          </div>
        </div>
        <!-- Select octave interval -->
        <div class="flex flex-col justify-center items-center h-fit w-fit -mb-3 mr-3">
          <div class="arrow-left flex items-center w-1 h-6 shadow shadow-black bg-slate-800 cursor-pointer"
            @click="selectOctaveDown(--currentOctave)"
            >
            <div class="inside-arrow-left w-full h-5 bg-slate-500"></div>
          </div>
          <VArrowLeft class="w-3 h-3 text-slate-50 pt-1"/>
        </div>

        <div class="flex flex-col justify-center items-center h-fit w-fit -mb-3">
          <div class="arrow-right flex items-center w-1 h-6 shadow shadow-black bg-slate-800 cursor-pointer"
            @click="selectOctaveUp(++currentOctave)"
            >
            <div class="inside-arrow-right w-full h-5 bg-slate-500"></div>
          </div>
          <VArrowRight class="w-3 h-3 text-slate-50 pt-1"/>
        </div>
      </div>
        
      <div class="flex w-fit h-3/5 bg-neutral-800 px-1 pt-1 pb-5">
        <div v-for="(pianoButton, index) in pianoButtons" :key="index" :id="`piano-white-${index}`"
          class="flex justify-end items-start w-6 h-full cursor-pointer bg-slate-50 rounded-b-sm mb-10 mr-px"
          :class="{'z-10 flex justify-center items-end w-3 h-4/6 select-none -translate-x-1/2 cursor-pointer text-white bg-slate-900 pb-3 -mr-3' : pianoButton.name.split('').find((el) => el ==='#' ) ==='#'}"
          @click="play(pianoButton, index, gain)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import VTurnOff from './assets/icons/VTurnOff.vue'
import { pianoButtons } from './helpers/notes'
import { ref, watch } from 'vue'
import VArrowLeft from './assets/icons/VArrowLeft.vue'
import VArrowRight from './assets/icons/VArrowRight.vue'

const pianoSwitcher = ref(false)
const gain = ref(0.4)
const tones = ['square', 'sawtooth', 'triangle']
const currentTone = ref('square')
const currentOctave = ref(4)
const currentOctaveIndex = ref([39, 50])

watch(pianoSwitcher, (newValue, oldValue) => {
  if (newValue === false) {
    const outside = document.querySelector(`#${currentTone.value}`)
    const insideTone = document.querySelector(`#inside-${currentTone.value}`)
    outside.classList.remove("z-20","bg-[url('./assets/img/pushedButton.png')]")
    insideTone.classList.add("bg-slate-500")
  } else if(newValue){
    const outside = document.querySelector(`#${currentTone.value}`)
    const insideTone = document.querySelector(`#inside-${currentTone.value}`)
    outside.classList.add("z-20","bg-[url('./assets/img/pushedButton.png')]")
    insideTone.classList.remove("bg-slate-500")
  }
})

watch(currentTone, (newValue, oldValue) => {
    const outside = document.querySelector(`#${newValue}`)
    const insideTone = document.querySelector(`#inside-${newValue}`)
    outside.classList.add("z-20","bg-[url('./assets/img/pushedButton.png')]")
    insideTone.classList.remove("bg-slate-500")
  if(oldValue !== newValue){
    const outside = document.querySelector(`#${oldValue}`)
    const insideTone = document.querySelector(`#inside-${oldValue}`)
    outside.classList.remove("z-20","bg-[url('./assets/img/pushedButton.png')]")
    insideTone.classList.add("bg-slate-500")
  }
})

function play(pianoButton, index, gain) {
  console.log(index);
  if (index >= currentOctaveIndex.value[0] && index <= currentOctaveIndex.value[1]) {
    const context = window.AudioContext ? new AudioContext() : new webkitAudioContext();
  
    const volume = context.createGain();
    volume.connect(context.destination);
  
    // Volume level
    volume.gain.value = gain;
  
    const osc = context.createOscillator();
    //Selected tone
    osc.type = currentTone.value;
    osc.frequency.value = pianoButton.frequency;
    osc.connect(volume);
    
    osc.start();
    setTimeout(() => {
	      osc.stop(0);
	  }, 500);
  
    painter(pianoButton, index)
  } if(index === 87) {
    const context = window.AudioContext ? new AudioContext() : new webkitAudioContext();
  
    const volume = context.createGain();
    volume.connect(context.destination);
  
    // Volume level
    volume.gain.value = gain;
  
    const osc = context.createOscillator();
    //Selected tone
    osc.type = currentTone.value;
    osc.frequency.value = pianoButton.frequency;
    osc.connect(volume);
    
    osc.start();
    setTimeout(() => {
	      osc.stop(0);
	  }, 500);
  
    painter(pianoButton, index)
  }
  else {return}
  
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

function volumeDown() {
  gain.value = +gain.value.toFixed(2)
  const down = document.querySelector('.down')
  const insideDown = document.querySelector('.inside-down')
  down.classList.add("z-20","bg-[url('./assets/img/pushedButton.png')]")
  insideDown.classList.remove("bg-slate-500")
  setTimeout(() => {
    down.classList.remove("z-20","bg-[url('./assets/img/pushedButton.png')]")
    insideDown.classList.add("bg-slate-500")
  }, 100)
  if(gain.value === 0){
    return gain.value = 0
  } gain.value = +(gain.value - 0.2).toFixed(2)
}

function volumeUp() {
  gain.value = +gain.value.toFixed(2)
  const up = document.querySelector('.up')
  const insideUp = document.querySelector('.inside-up')
  up.classList.add("z-20","bg-[url('./assets/img/pushedButton.png')]")
  insideUp.classList.remove("bg-slate-500")
  setTimeout(() => {
    up.classList.remove("z-20","bg-[url('./assets/img/pushedButton.png')]")
    insideUp.classList.add("bg-slate-500")
  }, 100)
  if(gain.value === 1){
    return gain.value = 1
  } gain.value = +(gain.value + 0.2).toFixed(2)
}
function reset() {
  if(pianoSwitcher.value === false){
    gain.value = 0.4
    
  }
}

function turnOff() {
  pianoSwitcher.value = !pianoSwitcher.value;
  reset()
}

function selectTone(tone) {
  currentTone.value = tone
}
function selectOctaveDown(octave) {
  const arrayLeft = document.querySelector('.arrow-left')
  const insideArrowLeft = document.querySelector('.inside-arrow-left')
  arrayLeft.classList.add("z-20","bg-[url('./assets/img/pushedButton.png')]")
  insideArrowLeft.classList.remove("bg-slate-500")
  setTimeout(() => {
    arrayLeft.classList.remove("z-20","bg-[url('./assets/img/pushedButton.png')]")
    insideArrowLeft.classList.add("bg-slate-500")
  }, 100)
  let range = []
  if(octave < 0) {
    currentOctave.value = 0;
  } else if(octave > 8) {
    currentOctave.value = 8;
  }
  const octaves = [
    ['A0', 'B0'],
    ['C1', 'B1'],
    ['C2', 'B2'],
    ['C3', 'B3'],
    ['C4', 'B4'],
    ['C5', 'B5'],
    ['C6', 'B6'],
    ['C7', 'B7'],
    ['C8'],
  ]
  for (let i = 0; i < octaves[currentOctave.value].length; i++) {
      range.push(pianoButtons.findIndex(el => el.name === octaves[currentOctave.value][i])  )
  }
  currentOctaveIndex.value = range
}
function selectOctaveUp(octave) {
  const arrayRight = document.querySelector('.arrow-right')
  const insideArrowRight = document.querySelector('.inside-arrow-right')
  arrayRight.classList.add("z-20","bg-[url('./assets/img/pushedButton.png')]")
  insideArrowRight.classList.remove("bg-slate-500")
  setTimeout(() => {
    arrayRight.classList.remove("z-20","bg-[url('./assets/img/pushedButton.png')]")
    insideArrowRight.classList.add("bg-slate-500")
  }, 100)
  let range = []
  if(octave < 0) {
    currentOctave.value = 0;
  } else if(octave > 8) {
    currentOctave.value = 8;
  }
  const octaves = [
    ['A0', 'B0'],
    ['C1', 'B1'],
    ['C2', 'B2'],
    ['C3', 'B3'],
    ['C4', 'B4'],
    ['C5', 'B5'],
    ['C6', 'B6'],
    ['C7', 'B7'],
    ['C8'],
  ]
  for (let i = 0; i < octaves[currentOctave.value].length; i++) {
      range.push(pianoButtons.findIndex(el => el.name === octaves[currentOctave.value][i])  )
  }
  currentOctaveIndex.value = range
}
</script>

<style scoped>
.dies {
  font-size: 5px;
}
.circle {
  width: 5px;
  height: 5px;
  border-radius: 100%;
  border: 1px solid;
  color: #fff;
}
.tone {
  font-size: x-small;
}
</style>
