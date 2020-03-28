import * as settings from './component/settings.js';

let UIInputignoredTags = document.getElementById("UIInputignoredTags");
let UIButtonReset = document.getElementById('UIButtonReset'); 
let _settings;

async function onReset(){
    await settings.reset(); 
    init(); 
}

async function onOptionsChanged(){
    const regex = /\^\(\?:HIGHLIGHT\|[A-Z|]+\)\$$/;

    if (regex.test(UIInputignoredTags.value) !== true) {
        UIInputignoredTags.classList.add("invalid"); 
        return; 
    }

    try {
        var re = new RegExp(UIInputignoredTags.value, 'i');
        UIInputignoredTags.classList.remove("invalid"); 
        _settings.ignoredTags = UIInputignoredTags.value; 
        settings.set(_settings); 
    } catch (error) {
        console.error(`Invalid regex: "${UIInputignoredTags.value}"`);
        UIInputignoredTags.classList.add("invalid");
    }
}

async function init(){
    _settings = await settings.get(); 
    UIInputignoredTags.value = _settings.ignoredTags; 
    UIInputignoredTags.addEventListener('input', onOptionsChanged); 
    UIButtonReset.addEventListener('click', onReset);
    UIInputignoredTags.classList.remove("invalid"); 
}

init();