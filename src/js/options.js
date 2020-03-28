import * as settings from './component/settings.js';

let UIInputignoredTags = document.getElementById("UIInputignoredTags");
let UIButtonReset = document.getElementById('UIButtonReset'); 
let _settings;

async function onReset(){
    await settings.reset(); 
    init(); 
}

async function onOptionsChanged(){
    if (UIInputignoredTags.value.length === 0) {
        return; 
    }

    try {
        var re = new RegExp(UIInputignoredTags.value, 'i');
        _settings.ignoredTags = UIInputignoredTags.value; 
        settings.set(_settings); 
    } catch (error) {
        console.error(`Invalid regex: "${UIInputignoredTags.value}"`);
    }
}

async function init(){
    _settings = await settings.get(); 
    UIInputignoredTags.value = _settings.ignoredTags; 
    UIInputignoredTags.addEventListener('input', onOptionsChanged); 
    UIButtonReset.addEventListener('click', onReset);
}

init();