const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let currentToDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(currentToDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  currentToDos = currentToDos.filter(
    (toDo) => toDo.id !== parseInt(li.querySelector("input").id)
  );
  saveToDos();
}

function onCheckboxChange(event) {
  if (event.target.checked === true) {
    currentToDos.find(
      (toDo) => toDo.id === parseInt(event.target.id)
    ).checked = true;
  } else {
    currentToDos.find(
      (toDo) => toDo.id === parseInt(event.target.id)
    ).checked = false;
  }
  saveToDos();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = newTodo.id;

  if (newTodo.checked === true) {
    checkbox.checked = true;
  }
  checkbox.addEventListener("change", onCheckboxChange);
  const label = document.createElement("label");
  label.htmlFor = checkbox.id;
  label.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerText = "×";
  button.addEventListener("click", deleteToDo);
  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function onToDoSubmit(event) {
  event.preventDefault();
  const newTodoObj = {
    checked: false,
    text: toDoInput.value,
    id: Date.now(),
  };
  toDoInput.value = "";

  currentToDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", onToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  currentToDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
