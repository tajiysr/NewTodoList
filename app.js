const taskInput = document.querySelector("#task");
const filterInput = document.querySelector("#filter");
const clearTasks = document.querySelector(".clear-tasks");
const tasks = document.querySelector(".collection");
const form = document.querySelector("#task-form");

loadEventListeners();

function loadEventListeners() {
  form.addEventListener("submit", addTask);
  filterInput.addEventListener("keyup", filterTasks);
  clearTasks.addEventListener("click", removeAllTasks);
  tasks.addEventListener("click", removeTask);
  document.addEventListener("DOMContentLoaded", loadAllTasksToUI);
}
function loadAllTasksToUI() {
  let tasks = getTasksFromStorgae();
  tasks.forEach(function(tasks) {
    addTasksToUI(tasks);
  });
}
function addTask(e) {
  const newTask = taskInput.value.trim();
  if (newTask === "") {
    alert("Please write something");
  } else {
    addTasksToUI(newTask);
    addTasksToStorage(newTask);
  }
  e.preventDefault();
}
function getTasksFromStorgae() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  return tasks;
}

function addTasksToStorage(newTask) {
  let tasks = getTasksFromStorgae();
  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTasksToUI(newTask) {
  const li = document.createElement("li");
  li.className = "collection-item";
  li.appendChild(document.createTextNode(newTask));
  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  link.innerHTML = `<i class="fa fa-remove"></i>`;
  li.appendChild(link);
  tasks.appendChild(li);
  taskInput.value = "";
}
function filterTasks(e) {
  const filterValue = e.target.value.toLowerCase();
  const listItem = document.querySelectorAll(".collection-item");

  listItem.forEach(function(listItem) {
    const text = listItem.textContent.toLowerCase();
    if (text.indexOf(filterValue) === -1) {
      listItem.setAttribute("style", "display : none !important");
    } else {
      listItem.setAttribute("style", "display : block");
    }
  });
}
function removeTaskFromStorage(removeStorage) {
  let tasks = getTasksFromStorgae();
  tasks.forEach(function(task, index) {
    if (task === removeStorage) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function removeTask(e) {
  if (e.target.className === "fa fa-remove") {
    removeTaskFromStorage(e.target.parentElement.parentElement.textContent);
    e.target.parentElement.parentElement.remove();
  }
}

function removeAllTasks(e) {
  if (confirm("Tümünü Silmek istediğinizden eminmisiniz ?")) {
    // tasks.innerHTML = "";
    while (tasks.firstElementChild != null) {
      tasks.removeChild(tasks.firstElementChild);
    }
    localStorage.removeItem("tasks");
  }
}
