import { isEmptyObject } from "./util.js";

/* 
    Default settings when using the extension for the first time
*/
export const defaults = {
    ignoredTags : "^(?:HIGHLIGHT|SCRIPT|STYLE|INPUT|SELECT|TEXTAREA|IMG|SVG|CANVAS)$"
}

/* 
    Set settings object
*/
export async function set(obj) {
    await browser.storage.sync.set({
        "settings": obj
    });
}

/* 
    Reset settings
*/
export async function reset() {
    await set(defaults);
}

/*
    Get settings object. Return default settings if no settings where found. 
*/
export async function get() {
    let obj = await browser.storage.sync.get(["settings"]);
    if (isEmptyObject(obj) === true) {
        await set(defaults);
        return defaults;
    }
    return obj.settings;
}