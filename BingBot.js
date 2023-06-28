// ==UserScript==
// @name         Bing Bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Script for search
// @author       Filimonov Anton
// @match        https://www.bing.com/*
// @match        https://www.citilink.ru/*
// @icon         https://w7.pngwing.com/pngs/517/530/png-transparent-bing-logo-icon.png
// @grant        none
// ==/UserScript==

let links = document.links;
let search_button = document.getElementsByName("search")[0];
let keywords = [
  "Техника и электроника", 
  "Купить телефон", 
  "Квадрокоптеры и аксессуары", 
  "Электровелосипеды", 
  "Смартфоны и планшеты Apple"
];
let keyword = keywords[getRandom(0, keywords.length)];
let bingInput = document.getElementsByName("q")[0];

// Работаем на главной странице поисковика
if (search_button != undefined) {
  let i = 0;
  let timerId = setInterval(() => {
    bingInput.value += keyword[i];
    i++;
    if (i == keyword.length) {
      clearInterval(timerId);
      search_button.click(); // Кликаем и идем в выдачу
    }
  }, 400);

  // Работаем на целевом сайте
} else if (location.hostname == "www.citilink.ru") {
  console.log("Мы на целевом сайте!");

  setInterval(() => {
    let index = getRandom(0, links.length);

    if (getRandom(0, 101) >= 30) {
      location.href = "https://www.bing.com/";
    }
    if (links.length == 0) {
      location.href = "https://www.citilink.ru/";
    } 
    else if (links[index].href.indexOf("www.citilink.ru") != -1) {
      window.location.href = links[index].href;
    }
  }, getRandom(3500, 5500));

  // Работаем на страницах поисковой выдачи Bing
} else {
  let nextBingPage = true;
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.includes("www.citilink.ru")) {
      let link = links[i];
      nextBingPage = false;
      console.log("Нашел строку " + link);
      setTimeout(() => {
        window.location.href = link.href;
      }, getRandom(3500, 5500));
      break;
    }
  }
  let elementExist = setInterval(() => {
    let element = document.getElementsByClassName("sb_pagS")[0];

    if (element != null) {
      if (element.innerText == "5") {
        nextBingPage = false;
        location.href = "https://www.bing.com/";
      }
      clearInterval(elementExist);
    }
  }, 150);

  if (document.getElementsByClassName("sb_pagS")[0].innerText == "5") {
    nextBingPage = false;
    location.href = "https://www.bing.com/";
  }

  if (nextBingPage) {
    setTimeout(() => {
      document.getElementsByClassName("sb_pagN sb_pagN_bp b_widePag sb_bp")[0].click();
    }, getRandom(5000, 7000));
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
