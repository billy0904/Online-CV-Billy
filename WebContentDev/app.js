
// 기술스택창
const $text = document.querySelector(".mySkills");
const skills = ["Photoshop","Illustrator", "Figma","Procreate","HTML","CSS", "JavaScript","Python","Java","C#","Unity", "Firebase"];
const speed = 200;
let i = 0;

const type = async () => {  
const skill = skills[i].split("");

while (skill.length) {
    await wait(speed);
    $text.innerHTML += skill.shift(); 
}
await wait(800);
remove();
}

//remove
const remove = async () => {
const skill = skills[i].split("");

while (skill.length) {
    await wait(speed);
    
    skill.pop();
    $text.innerHTML = skill.join(""); 
}

i = !skills[i+1]?0:i+1;
type();
}

function wait(ms) {
return new Promise(res => setTimeout(res, ms))
}
setTimeout(type, 1500);



//ToDoList

//오늘 날짜

(function() { 		
	let today = new Date();   
	document.getElementById('date').innerText = today.toLocaleDateString();
}());

//todolist

const todoForm = document.querySelector("#todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector("#todo-list");

let todoArr = [];
const TODOS_KEY = "todos";


// 입력 시간
function getClock(date) {
    const month = String(date.getMonth()+1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    return `${month}/${day}   ${hour}:${minute}`;
}

// 추가
function handleTodoSubmit(event) {
    event.preventDefault();
    const date = new Date();
    const newTodo = todoInput.value;
    todoInput.value = "";

    const newTodoObj = {
        text: newTodo,
        id: Date.now(), 
        time: getClock(date),
    }
    todoArr.push(newTodoObj);
    paintTodo(newTodoObj);
    saveTodoArr();
    console.log(getClock(date));
}

// 출력
function paintTodo(newTodoObj) {
    const li = document.createElement("li");
    li.id = newTodoObj.id;

    const span = document.createElement("span");
    const time = document.createElement("span");
    const btn = document.createElement("button");
    span.innerText = newTodoObj.text;
    span.className = "elem";
    time.innerText = newTodoObj.time;
    time.className = "time";
    btn.innerText = "x";
    span.addEventListener("click", doneTodo);
    btn.addEventListener("click", deleteTodo);

    if (newTodoObj.done) {
        li.classList.add("strikeout");
    }

    li.appendChild(span);
    li.appendChild(time);
    li.appendChild(btn);
    todoList.appendChild(li);
}

// 투두 삭제
function deleteTodo(event) {
    const li = event.target.parentElement;
    li.remove();
    
    todoArr = todoArr.filter((todo) => todo.id != parseInt(li.id));
    saveTodoArr();
}

// 취소선
function doneTodo(event){
    const li = event.target.parentElement;
    li.classList.toggle("strikeout");
    const todoId = parseInt(li.id);
    const todo = todoArr.find((todo)=>todo.id === todoId);
    if(todo) {
        todo.done=li.classList.contains("strikeout");
        saveTodoArr();
    }
}

todoForm.addEventListener("submit", handleTodoSubmit);

// 로컬저장소에 저장
function saveTodoArr() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todoArr));
}

function loadTodoArr() {
    const saved = localStorage.getItem(TODOS_KEY);
    if (saved) {
        todoArr = JSON.parse(saved);
        todoArr.forEach((todo) => {
            paintTodo(todo);
            const li = document.getElementById(todo.id);
            if (li.classList.contains("strikeout")) {
                li.classList.add("strikdeout");
            }
        });
    }
}

loadTodoArr();
