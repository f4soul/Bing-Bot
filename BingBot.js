// ==UserScript==
// @name         Bing Bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Script for search
// @author       Filimonov Anton
// @match        https://www.bing.com/*
// @icon         https://w7.pngwing.com/pngs/517/530/png-transparent-bing-logo-icon.png
// @grant        none
// ==/UserScript==
let links = document.links;
let search_button = document.getElementsByName("search")[0];
let keywords = [
  "Оплата без комиссии",
  "Дешевле официальных тарифов",
  "Ответ отеля — за минуту",
];
let keyword = keywords[getRandom(0, keywords.length)];

if (search_button != undefined) {
  document.getElementsByName("q")[0].value = keyword;
  search_button.click();
} else {
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.includes("hotels.ru")) {
      let link = links[i];
      console.log("Нашел строку" + links[i]);
      link.click();
      break;
    }
  }
}
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
