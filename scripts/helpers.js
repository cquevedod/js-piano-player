const keys = Array.from(document.querySelectorAll('.key'));
const keycodes = keys.map((key) => key.dataset.key);

/* Save the musical notes in array "notes" */ 
const notes = keys.map((key) => key.id); 

const colors = ['aqua', 'chartreuse', 'blue',
  'red', 'orange', 'yellow', 'orangered', 
  'dodgerblue', 'deepskyblue', 'deeppink',
  'greenyellow', 'spreengreen', 'aquamarine',
  'coral', 'darkgrey', 'tomato', 'sporinggreen',
  'palegreen', '#ff0084', '#bce0ee', '#ff920a',
  '1f3b08', 'ff4805', '#207ce5'];
          
/* Receives the event of Listener and attribute (string) */ 
const getValueOf = (atrr, event) => {
  return event.target.getAttribute(atrr);
};

/* Select the object of the DOM element (tag) that was clicked, keydowned 
   or touched.The returned object contains all the attributes of the key 
   that was pressed (includes classes, ids, etc)  */
const getObjectOf = (tag, atrr, event) => {
  const value = getValueOf(atrr, event);
  const objectSelector = document.querySelector(`${tag}[${atrr}="${value}"]`);
  if (!objectSelector) {
    return; 
  } else {
    return objectSelector;
  }
};
 
const playSound = (keycode) => {
  const audio = document.querySelector(`audio[data-key="${keycode}"]`);
  audio.currentTime = 0; // prevent overlapping in sounds
  audio.volume = 1;
  audio.play();
};   

const fadeVolume = (sound) => {
  let volume = 100;
  const decreaseVol = setInterval(() => {
    volume -= 10;
    sound.volume = volume / 100;
    console.log(volume);
    if (volume === 0) clearInterval(decreaseVol);        
  }, 20);
};

const showMusicalNotes = (event) => {
  if (!event.keyCode) {
    const note = event.target.getAttribute('id');
    if (notes.includes(note)) {
      showText(); 
      document.getElementById('musicalnote').innerHTML = `${note}`;
      const indexNote = notes.indexOf(note);
      document.getElementById('musicalnote').style.color = colors[indexNote];
    } else {
      return; 
    }
  } else {
    let evento = event;
    evento = event || window.event;
    const key = evento.which || evento.keyCode;
    const keystring = key.toString();
    if (keycodes.includes(keystring)) {
      showText();
      const indexNote =  keycodes.indexOf(keystring);
      console.log(indexNote);
      const musicalnote = notes[indexNote]; 
      document.getElementById('musicalnote').innerHTML = `${musicalnote}`;
      document.getElementById('musicalnote').style.color = colors[indexNote];
    } else {
      return; 
    }
  }
};

/* -------------playSound on mousedown------- */
const playOnMouseDown = (event) => { 
  keyCode = getValueOf('data-key', event);
  const pianoKey = getObjectOf('.key', 'data-key', event);
  pianoKey.classList.add('pressed');
  playSound(keyCode);
};

/* ---------fadeVolume on MouseUp---------- */
const fadeOnMouseUp = (event) => { 
  keyCode = event.target.getAttribute('data-key');
  const pianoKey = document.querySelector(`.key[data-key="${keyCode}"]`);
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  if (!pianoKey) return;
  pianoKey.classList.remove('pressed');
  const checkBox = document.getElementById('slideThree');
  checkBox.checked ? audio.play() : fadeVolume(audio); 
};

/* -------------playSound on touchstart---- */
const playOnTouchStart = (event) => {
  event.preventDefault();
  const { repeat } = event;
  if (repeat) return; 
  keyCode = event.target.getAttribute('data-key');
  const pianoKey = document.querySelector(`.key[data-key="${keyCode}"]`);
  if (!pianoKey) return;
  pianoKey.classList.add('pressed');
  playSound(keyCode);
};

/* ----------fadeVolume on touchend------- */
const fadeOnTouchEnd = (event) => {
  event.preventDefault(); 
  keyCode = event.target.getAttribute('data-key');
  const pianoKey = document.querySelector(`.key[data-key="${keyCode}"]`);
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  if (!pianoKey) return;
  pianoKey.classList.remove('pressed');
  const checkBox = document.getElementById('slideThree');
  checkBox.checked ? audio.play() : fadeVolume(audio); 
};

/* ------------playSound on keydown------ */
const playOnKeyDown = (event) => {
  // avoid repeating keystroke.
  const { repeat } = event;
  if (repeat) return; 
  let evento = event;
  evento = event || window.event;
  const key = evento.which || evento.keyCode;
  const keystring = key.toString();              
  console.log(keycodes.includes(keystring));
  if (keycodes.includes(keystring)) {
    const pianoKey = document.querySelector(`.key[data-key="${key}"]`);
    if (!pianoKey) return;
    pianoKey.classList.add('pressed');
    playSound(key);
  } else {
    return; // Avoid error when off key is pressed
  }
};

/* ---------fade sound on keyup--------- */
const FadeOnKeyUp = (event) => {
  const key = event.which || event.keyCode;
  const keystring = key.toString(); 
  if (keycodes.includes(keystring)) {
    const pianoKey = document.querySelector(`.key[data-key="${key}"]`);
    const audio = document.querySelector(`audio[data-key="${key}"]`);
    if (!pianoKey) return;
    pianoKey.classList.remove('pressed');
    const checkBox = document.getElementById('slideThree');
    checkBox.checked ? audio.play() : fadeVolume(audio); 
  }
};

/* ---show an indication text about musical notes--- */
const showText = () => {
  document.getElementById('message').innerHTML = 'See below the notes pressed';
};