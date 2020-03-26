let highlighter;

let UIInputExpression = document.getElementById("UIInputExpression");
let UIInputFlags = document.getElementById("UIInputFlags");
let UIButtonNext = document.getElementById("UIButtonNext");
let UIButtonPrev = document.getElementById("UIButtonPrev");

UIInputExpression.addEventListener("input", onTextChange); 
UIInputFlags.addEventListener("input", onTextChange); 
UIButtonNext.addEventListener("click", onNext); 
UIButtonPrev.addEventListener("click", onPrev); 


function onNext(){
    highlighter.selectNext();
}

function onPrev(){
    highlighter.selectPrevious();
}

function onTextChange(){
    let regex;
    let expression = UIInputExpression.value;
    let flags = UIInputFlags.value;
    highlighter.remove();

    if (expression.length === 0)
        return;

    try {
        regex = new RegExp(expression, flags);
        UIInputExpression.style.color = "black";
        highlighter.apply(regex);
        highlighter.selectIndex(0);
        
    } catch (error) {
        console.error(error);
        UIInputExpression.style.color = "red";
    }
}

function init() {
    let startNode = document.getElementsByTagName('body');
    highlighter = new Highlighter();
    highlighter.setStartNode(startNode[0]);
}

init();