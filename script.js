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

// Relógio
function updateClock() {
  const now = new Date();
  const dateElement = document.getElementById('date');
  const clockElement = document.getElementById('clock');

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const date = now.toLocaleDateString('pt-BR', options);
  const time = now.toLocaleTimeString('pt-BR');

  dateElement.textContent = date;
  clockElement.textContent = time;
}

setInterval(updateClock, 1000);  // Atualiza o relógio a cada segundo

// Timer
let timerInterval;
let timerTime = 0;  // tempo em segundos
let isTimerRunning = false;

function formatTime(seconds) {
  const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${secs}`;
}

function startTimer() {
  if (isTimerRunning) return;
  isTimerRunning = true;

  timerInterval = setInterval(() => {
    timerTime++;
    document.getElementById('timer').textContent = formatTime(timerTime);
  }, 1000);
}

function pauseTimer() {
  if (!isTimerRunning) return;
  isTimerRunning = false;
  clearInterval(timerInterval);
}

function resetTimer() {
  isTimerRunning = false;
  clearInterval(timerInterval);
  timerTime = 0;
  document.getElementById('timer').textContent = formatTime(timerTime);
}

// Função para adicionar tarefa no Todo List
function addTodo() {
  const todoInput = document.getElementById('todoInput');
  const todoList = document.getElementById('todoList');

  if (todoInput.value.trim()) {
    const todoItem = document.createElement('li');
    todoItem.classList.add('bg-gray-100', 'p-2', 'rounded-md', 'shadow-sm');
    todoItem.textContent = todoInput.value.trim();
    todoList.appendChild(todoItem);
    todoInput.value = ''; // Limpa o input
  }
}

// Função para adicionar nota
// Função para adicionar nota com cor selecionada
function addNote() {
  const noteTitle = document.getElementById('noteTitle');
  const noteContent = document.getElementById('noteContent');
  const notesList = document.getElementById('notesList');
  const noteColor = document.getElementById('noteColor').value;  // Pega a cor escolhida no select

  if (noteTitle.value.trim() && noteContent.value.trim()) {
    const noteItem = document.createElement('div');
    noteItem.classList.add('p-4', 'rounded-md', 'shadow-sm');

    // Define a cor de fundo da nota com a cor escolhida
    noteItem.style.backgroundColor = noteColor || '#ffffff';  // Usa a cor escolhida ou branco por padrão

    const noteHeader = document.createElement('h3');
    noteHeader.classList.add('font-bold', 'mb-2');
    noteHeader.textContent = noteTitle.value.trim();

    const noteBody = document.createElement('p');
    noteBody.textContent = noteContent.value.trim();

    noteItem.appendChild(noteHeader);
    noteItem.appendChild(noteBody);
    notesList.appendChild(noteItem);

    noteTitle.value = ''; // Limpa o título
    noteContent.value = ''; // Limpa o conteúdo
    document.getElementById('noteColor').value = '#ffffff'; // Reseta a cor para branco após adicionar a nota
  }
}


// Exibir o diálogo de nome
window.onload = () => {
  const userName = localStorage.getItem('userName');
  if (!userName) {
    document.getElementById('nameDialog').classList.remove('hidden');
  } else {
    document.getElementById('userNameDisplay').textContent = `Bem-vindo, ${userName}`;
  }
};

// Função para salvar o nome do usuário
function saveUserName() {
  const userNameInput = document.getElementById('userNameInput').value;
  if (userNameInput.trim()) {
    localStorage.setItem('userName', userNameInput.trim());
    document.getElementById('userNameDisplay').textContent = `Bem-vindo, ${userNameInput.trim()}`;
    document.getElementById('nameDialog').classList.add('hidden');
  }
}
