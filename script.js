
//------- часы и дата -------
const time = document.querySelector('.time');

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;

  const dateShow = document.querySelector('.date');
  const options = {year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'}; //Воскресенье, 16 мая" / "Sunday, May 16" / "Нядзеля, 16 траўня"
  const currentDate = date.toLocaleDateString('ru-RU', options); //en-US
  const numbDayWeek = date.getDay();
  let dayOfWeek;
  switch (numbDayWeek) {
    case 0:
      dayOfWeek = 'Воскресенье';
      break;
    case 1:
      dayOfWeek = 'Понедельник';
      break;
    case 2:
      dayOfWeek = 'Вторник';
      break;
    case 3:
      dayOfWeek = 'Среда';
      break;
    case 4:
      dayOfWeek = 'Четверг';
      break;
    case 5:
      dayOfWeek = 'Пятница';
      break;
    case 6:
      dayOfWeek = 'Суббота';
      break;
  }
  dateShow.textContent = `${dayOfWeek}, ${currentDate}`;

  setTimeout(showTime, 1000);
}
showTime();

//------- приветствие -------

const greetingContaine = document.querySelector('.greeting-container');
const greetingText = document.querySelector('.greeting');
const greetingName = document.querySelector('.name');
const date = new Date();

const hours = date.getHours();
console.log(hours);
let timeOfDay;
function whatPart () {
  if (hours < 6) {
    timeOfDay = 'night';
    greetingText.textContent = 'Доброй ночи,'; //'Good night'
  } else if (hours < 12) {
    timeOfDay = 'morning';
    greetingText.textContent = 'Доброе утро,'; //'Good morning'
  } else if (hours < 18) {
    timeOfDay = 'afternoon';
    greetingText.textContent = 'Добрый день,'; // 'Good afternoon'
  } else if (hours < 24) {
    timeOfDay = 'evening';
    greetingText.textContent = 'Добрый вечер,'; //'Good evening'
  }
  setTimeout(whatPart, 1000);
};
whatPart();

// ----- Имя пользователя ----- 

function setLocalStorage() {
  localStorage.setItem('name', greetingName.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    greetingName.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorage);

// ----- Слайдер ----- 

const body = document.querySelector('.body');
let bgNum = (Math.floor(Math.random() * (21 - 1)) + 1).toString().padStart(2, '0');
body.style.backgroundImage = `url('https://raw.githubusercontent.com/bulgakovatodays/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`

function setBgImg() {
  const img = new Image();
  console.log(timeOfDay);
  //console.log(bgNum);
  img.onload = () => {
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/bulgakovatodays/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
  }
}
setBgImg();

const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');

function getSlidePrev() {
  const img = new Image();
  bgNum = (Number(bgNum) + 1).toString().padStart(2, '0');
  //console.log(bgNum);
  if (bgNum > 20) {
    bgNum = '01';
    //console.log(bgNum);
  }
  img.src = 'https://raw.githubusercontent.com/bulgakovatodays/stage1-tasks/assets/images/' + timeOfDay + '/' + bgNum + '.jpg';
  img.onload = () => {
  body.style.backgroundImage =  `url("${img.src}")`;
  }
}
function getSlideNext() {
  const img = new Image();
  bgNum = (Number(bgNum) - 1).toString().padStart(2, '0');
  //console.log(bgNum);
  if (bgNum < 1) {
    bgNum = 20;
    //console.log(bgNum);
  }
  img.src = 'https://raw.githubusercontent.com/bulgakovatodays/stage1-tasks/assets/images/' + timeOfDay + '/' + bgNum + '.jpg';
  img.onload = () => {
    body.style.backgroundImage =  `url("${img.src}")`;
    }
  }
slidePrev.addEventListener('click', getSlidePrev);
slideNext.addEventListener('click', getSlideNext);

// ----- Погода ----- 

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');

const cityForWeather = document.querySelector('.city');
cityForWeather.value = 'Minsk';

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityForWeather.value}&lang=ru&appid=143d7a1720b250a681b4d93ee1633eb3&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
}
getWeather();

function setLocalCity() {
  localStorage.setItem('city', cityForWeather.value);
  getWeather();
}
window.addEventListener('change', setLocalCity);

function getLocalCity() {
  if(localStorage.getItem('city')) {
    cityForWeather.value = localStorage.getItem('city');
    getWeather();
  }
}
window.addEventListener('load', getLocalCity);
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');

// ------- цитата дня ------- 

async function getQuotes() {
    let url = './assets/data.json';
    const quotes = await fetch(url);
    let commits = await quotes.json();

    //console.log(commits.length);
    let num = Math.round(Math.random() * (commits.length));
    //console.log(num);
    quote.textContent = commits[num].text;
    author.textContent = commits[num].author;
  }
  getQuotes();

  const changeQuote = document.querySelector(".change-quote");
  changeQuote.addEventListener('click', getQuotes);

// ----------- плеер ---------------- 

const playPrev = document.querySelector(".play-prev");
const play = document.querySelector(".play");
const playNext = document.querySelector(".play-next");

const audio = new Audio();
let isPlay = false;
let numPlay = '0';

import playList from './playlist.js';

function startPlay() {
  audio.src = playList[numPlay].src;
  audio.currentTime = 0;
  audio.play();
  //console.log(audio.src);
}
function playAudio() {
  if (isPlay === false) {
    isPlay = true;
    startPlay();
    play.classList.toggle('pause');
  } else {
    audio.pause();
    isPlay = false;
    play.classList.toggle('pause');
  }
}
play.addEventListener('click', playAudio);

playPrev.addEventListener('click', () => { 
  numPlay = Number(numPlay) - 1;
  if (numPlay === -1) {
    numPlay = '3';
  }
  console.log(numPlay);
  startPlay();
  if (isPlay === false) {
    isPlay = true;
    play.classList.toggle('pause');
  }
});
playNext.addEventListener('click', () => { 
  numPlay = Number(numPlay) + 1;
  if (numPlay === 4) {
    numPlay = '0';
  }
  console.log(numPlay);
  startPlay();
  if (isPlay === false) {
    isPlay = true;
    play.classList.toggle('pause');
  }
});

// ----------- создаём список в HTML ---------------- 
for(let i = 0; i < playList.length; i++) {
  const li = document.createElement('li');
  console.log( i + 'create li!')
  li.classList.add('play-item');
  li.textContent = playList[i].title;
  const playListContainer = document.querySelector('.play-list');
  playListContainer.append(li);
  }

  