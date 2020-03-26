import * as util from './component/util.js';

let UIButtonNext = document.getElementById('UIButtonNext');
let UIButtonPrevious = document.getElementById('UIButtonPrevious');
let UIInputTextRegex = document.getElementById('UIInputTextRegex');
let UIInputTextFlags = document.getElementById('UIInputTextFlags');
let UIDivNumberOfResults = document.getElementById('UIDivNumberOfResults');
let UIButtonClose = document.getElementById('UIButtonClose');
let UIButtonHelp = document.getElementById('UIButtonHelp');

let searchOptions = { regex: "", flags: "" }

async function sendMessage(message) {
  let tabs = await browser.tabs.query({ 'active': true, 'currentWindow': true });
  await browser.tabs.sendMessage(tabs[0].id, message);
}

async function selectNext() {
  await sendMessage({ 'id': 'SELECT_NEXT' });
}

async function selectPrevious() {
  await sendMessage({ 'id': 'SELECT_PREVIOUS' });
}

async function search() {
  searchOptions.regex = UIInputTextRegex.value;
  searchOptions.flags = UIInputTextFlags.value;

  if (searchOptions.regex === "") {
    UIDivNumberOfResults.textContent = "";
    sendMessage({ id: 'RESET' });
    return;
  }

  if (!util.isValidRegex(searchOptions.regex)) {
    return;
  }

  sendMessage({ id: 'SEARCH', options: searchOptions });
}

async function populateResultsLabel(selectedIndex, nResults) {
  UIDivNumberOfResults.textContent = selectedIndex + '/' + nResults;
}

async function onMessage(message) {
  console.log(message);
  switch (message.id) {
    case 'RESULTS_INFO':
      populateResultsLabel(message.data.selectedIndex + 1, message.data.nResults);
      break;
    default:
      console.error(message);
      break;
  }
}

async function help() {
  browser.runtime.openOptionsPage();
}

async function unload() {
  sendMessage({ id: 'RESET' });
  window.close();
}

function onKeyPress(e) {
  e = e || window.event;
  if (e.keyCode === 13)
    selectNext();

  if (e.keyCode === 27)
    unload()
};

async function init() {
  UIButtonNext.addEventListener('click', selectNext);
  UIButtonPrevious.addEventListener('click', selectPrevious);
  UIInputTextRegex.addEventListener('input', search);
  UIInputTextFlags.addEventListener('input', search);
  UIButtonHelp.addEventListener('click', help);
  browser.runtime.onMessage.addListener(onMessage);
  UIButtonClose.addEventListener('click', unload);
  document.addEventListener("keypress", onKeyPress);
  UIInputTextRegex.focus();

}

init();