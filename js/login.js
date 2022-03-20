const loginForm = document.querySelector("#login-form");
const loginInput = loginForm.querySelector("input");
const greeting = document.querySelector("#greeting");
const changeName = document.querySelector("#change-name");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event) {
  event.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  localStorage.setItem(USERNAME_KEY, loginInput.value);
  savedUsername = localStorage.getItem(USERNAME_KEY);
  setInterval(paintGreetings(savedUsername), 60000);
}

function paintGreetings(username) {
  const nowHour = new Date().getHours();
  let greetingByTime = "";
  if (nowHour >= 18) {
    greetingByTime = "Good Evening";
  } else if (nowHour >= 12) {
    greetingByTime = "Good AfterNoon";
  } else if (nowHour >= 6) {
    greetingByTime = "Good Morning";
  } else {
    greetingByTime = "Good Night";
  }

  greeting.innerText = `${greetingByTime}, ${username}`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
  changeName.classList.remove(HIDDEN_CLASSNAME);
}

let savedUsername = localStorage.getItem(USERNAME_KEY);

changeName.addEventListener("click", () => {
  localStorage.removeItem(USERNAME_KEY);
  location.reload();
});

if (savedUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  setInterval(paintGreetings(savedUsername), 60000);
}
