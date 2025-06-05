const http = new coreHTTP();
let tasks = [];

const result = document.querySelector(".result");
const input = document.querySelector("#listitem");
const addButton = document.querySelector(".add-btn");

addButton.addEventListener("click", addTask);

async function fetchTasks() {
  const data = await http.processRequest("GET", "/tm/tasks");
  if (data.error) {
    result.innerHTML = `Error: ${data.error}`;
  } else {
    tasks = data;
    displayTasks();
  }
}

function displayTasks() {
  let output = "<ul>";
  tasks.forEach(task => {
    output += `<li>${task.name} ${task.completed ? "(done)" : ""}</li>`;
  });
  output += "</ul>";
  result.innerHTML = output;
}

async function addTask(e) {
  e.preventDefault();
  const taskName = input.value.trim();
  if (!taskName) return;

  const newTask = { name: taskName, completed: false };
  const response = await http.processRequest("POST", "/tm/tasks", JSON.stringify(newTask));
  if (response.error) {
    result.innerHTML = `Error: ${response.error}`;
  } else {
    input.value = "";
    await fetchTasks();
  }
}

// Load tasks on page load
fetchTasks();
