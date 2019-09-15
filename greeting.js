const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";
//문자열  ""없애고 사용하기 위함

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
    input.value = "";
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleSubmit);
}

function delGreeting(){
    const delGBtn = event.target;
    greeting.removeChild(delGBtn);
    localStorage.removeItem(USER_LS);
    loadName();
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
    const delGBtn = document.createElement("i");
    delGBtn.classList.add("fas","fa-reply")
    delGBtn.addEventListener("click", delGreeting);
    greeting.appendChild(delGBtn);

}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
    } else{
        paintGreeting(currentUser);
    }
}


function init(){
    loadName();
}

init();