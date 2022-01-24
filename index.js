const input = document.querySelector("input[type = text]");
const toDoListTag = document.querySelector(".list");
const buttons = document.querySelector(".buttons");
const lightButton = document.querySelector(".lightButton");
const darkButton = document.querySelector(".darkButton");
const countList = document.querySelector(".count");
const darkBackground = document.querySelector(".dark");
const body = document.querySelector("body");
const inputToDo = document.querySelector(".inputToDo");
const toDoUl = document.querySelector(".toDoUl");
const nav = document.querySelector(".nav");
const flex = document.querySelector(".flex");
const check = document.querySelectorAll(".status");
const all = document.querySelectorAll(".all");
let toDoList = [];
let state = 'all';

window.addEventListener("load", () => {
  if(localStorage.getItem("todolist")) {
    toDoList = localStorage.getItem("todolist");
  }
})

const checking = (checkbox) => {
  toDoList.map((toDo) =>
    toDo.id === checkbox ? (toDo.ischecked = true) : (toDo.ischecked = false)
  );
  renderingToDo(toDoList);
};

const deletingTodo = (id) => {
  let deletedTodo = toDoList.filter((todo) => todo.id != id);
  if (state == 'completed') {
    let completedDeletedTodo = toDoList.filter((todo) => todo.id != id && todo.ischecked);
    renderingToDo(completedDeletedTodo)
    let restToDo = toDoList.filter((todo) => todo.id == id);
    let checkingDeleting = toDoList.filter((todo) => todo.list != restToDo[0].list && todo.id != id);
    toDoList = checkingDeleting;
    return;
  }
  toDoList = deletedTodo;
  renderingToDo(toDoList);
};

const color = (element) => {
  const blueText = document.querySelector(".blueText");
  blueText.classList.remove("blueText");
  element.classList.add("blueText");
};



input.addEventListener("keypress", (e) => {
  if (e.key == "Enter" && input.value.trim() != "") {
    const checkingToDo = toDoList.filter((toDo) => toDo.list === input.value);
    if (checkingToDo.length == 1) return;
    if(state == 'completed') {
      const blueText = document.querySelector(".blueText");
      blueText.classList.remove("blueText");
      all.classList.add("blueText");
    }
    const toDoListObj = {
      id: new Date().getTime(),
      list: input.value,
      ischecked: false,
    };
    toDoList.unshift(toDoListObj);
    renderingToDo(toDoList);
    input.value = "";
  }
});

check.forEach((item) => {
  item.addEventListener("click", (e) => {
    color(e.target)
    if (e.target.textContent == "All") {
      renderingToDo(toDoList);
      state = 'all';
    } else if (e.target.textContent == "Completed") {
      const completed = toDoList.filter((toDoObj) => toDoObj.ischecked);
      renderingToDo(completed);
      state = 'completed';
    } else {
      const notCompleted = toDoList.filter((toDoObj) => !toDoObj.ischecked);
      renderingToDo(notCompleted);
      state = 'notCompleted';
    }
  });
});

const renderingToDo = (toDoArr) => {
  toDoListTag.innerHTML = "";
  toDoArr.forEach((toDoObj) => {
    const toDoTag = `<div class = "flex">
    <div class = "checkbox">
      <input type = "checkbox" class = "check" onclick = "checking(${
        toDoObj.id
      })" ${toDoObj.ischecked && "checked"}>
      <span class = "checkmark"></span>
    </div>
    <div class = "scroll">
    <span class = "todo ${toDoObj.ischecked ? "line-through" : ""}">${
      toDoObj.list
    }</span></div>
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" class = "cross" onclick = "deletingTodo(${
      toDoObj.id
    })"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
  </div>`;
    toDoListTag.innerHTML += toDoTag;
  });
  const stringifiedArr = JSON.stringify(toDoList)
  localStorage.setItem("todolist", stringifiedArr);
  if (toDoArr.length <= 1) {
    countList.textContent = `${toDoArr.length} item left`;
  } else if (toDoArr.length >= "1000") {
    countList.textContent = toDoArr.length / 1000 + "K items left";
  } else {
    countList.textContent = `${toDoArr.length} items left`;
  }
};

renderingToDo(toDoList);

lightButton.addEventListener("click", () => {
  animation(darkButton, lightButton);
  darkBackground.style.transform = "scaleX(100%)";
  darkBackground.style.transformOrigin = "left";
  colorChanging('hsl(235, 21%, 11%)','hsl(235, 24%, 19%)','hsl(236, 33%, 92%)');
  input.classList.add("toDoInput");
});

darkButton.addEventListener("click" , () => {
  animation(lightButton, darkButton);
  darkBackground.style.transform = "scaleX(0)";
  darkBackground.style.transformOrigin = "right";
  colorChanging('hsl(0, 0%, 98%)','hsl(0, 0%, 98%)','hsl(237, 14%, 26%)');
  input.classList.remove("toDoInput");

})

const colorChanging = (bodyColor, color, textColor) => {
  body.style.backgroundColor = bodyColor;
  toDoUl.style.backgroundColor = color;
  toDoUl.style.color = textColor
  nav.style.backgroundColor = color;
  inputToDo.style.backgroundColor = color;
  input.style.color = textColor;
  input.style.backgroundColor = color;
}
const animation = (element, sibiling) => {
  element.classList.add("slidein");
  sibiling.classList.add("slideout");
  setTimeout(() => {
    sibiling.style.opacity = "0";
    sibiling.style.zIndex = "0";
  }, 300);
  setTimeout(() => {
    element.style.opacity = "1";
    element.style.zIndex = "1";
  }, 500);
  setTimeout(() => {
    sibiling.classList.remove("slideout");
    element.classList.remove("slidein");
  }, 2000);
};
