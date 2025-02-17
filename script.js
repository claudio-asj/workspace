document.addEventListener("DOMContentLoaded", () => {
  checkUserName();
  renderTodos();
  renderNotes();
  updateClock();
  setInterval(updateClock, 1000);
});

// Verificação do nome do usuário
function checkUserName() {
  const userName = localStorage.getItem("userName");
  if (!userName) {
      document.getElementById("nameDialog").classList.remove("hidden");
  } else {
      document.getElementById("userNameDisplay").textContent = `Bem-vindo, ${userName}!`;
  }
}

function saveUserName() {
  const name = document.getElementById("userNameInput").value.trim();
  if (name) {
      localStorage.setItem("userName", name);
      document.getElementById("nameDialog").classList.add("hidden");
      document.getElementById("userNameDisplay").textContent = `Bem-vindo, ${name}!`;
  }
}

// Todo List
let todos = JSON.parse(localStorage.getItem("todos")) || [];

function addTodo() {
  const input = document.getElementById("todoInput");
  if (input.value.trim()) {
      todos.push({ text: input.value, completed: false });
      localStorage.setItem("todos", JSON.stringify(todos));
      input.value = "";
      renderTodos();
  }
}

function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();

  if (todos[index].completed) {
      showToast("Parabéns!", getRandomMessage(), getRandomImage());
  }

  if (todos.every(todo => todo.completed)) {
      showToast("Você concluiu todas as tarefas!", getFinalMessage(), getFinalImage());
  }
}

function renderTodos() {
  const list = document.getElementById("todoList");
  list.innerHTML = "";
  todos.forEach((todo, index) => {
      const li = document.createElement("li");
      li.className = "flex justify-between p-2 border rounded";
      li.innerHTML = `
          <div class="flex items-center">
              <input type="checkbox" ${todo.completed ? "checked" : ""} onclick="toggleTodo(${index})" class="mr-2">
              <span class="${todo.completed ? "line-through" : ""}">${todo.text}</span>
          </div>
      `;
      list.appendChild(li);
  });
}

// Toast
function showToast(title, message, image) {
  const toast = document.createElement("div");
  toast.className = "bg-white p-4 rounded-lg shadow-lg flex items-center space-x-2";
  toast.innerHTML = `
      <img src="${image}" class="w-12 h-12 rounded-full">
      <div>
          <p class="font-bold">${title}</p>
          <p>${message}</p>
      </div>
  `;
  document.getElementById("toastContainer").appendChild(toast);
  setTimeout(() => toast.remove(), 5000);
}

// JSON de mensagens e imagens
function getRandomMessage() {
  return "Ótimo trabalho!";
}
function getFinalMessage() {
  return "Você terminou tudo!";
}
function getRandomImage() {
  return "https://imgs.search.brave.com/I2z4dFYDomErjln2DDZ0GY1AsyqZrS85VACkQTtFdp8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zNS5z/dGF0aWMuYnJhc2ls/ZXNjb2xhLnVvbC5j/b20uYnIvYmUvMjAy/Mi8xMC8xLW1lbWUt/am9pbmhhLmpwZw";
}
function getFinalImage() {
  return "https://imgs.search.brave.com/J6_02b-_jm6Hy4dEp9OzYxjRiR1b5U95BgezXF44KeY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YTIuZ2lwaHkuY29t/L21lZGlhLzF4TkRW/WDREVjZCNXZvNnVu/dy9naXBoeS5naWY_/Y2lkPTc5MGI3NjEx/emMyZWxybmlua2Iz/NHFwcXV3aTV0MW5q/bXMyNjM0cm9zZzlh/d3ZkNSZlcD12MV9n/aWZzX3NlYXJjaCZy/aWQ9Z2lwaHkuZ2lm/JmN0PWc.gif";
}
