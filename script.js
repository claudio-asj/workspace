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
    // Cria um novo objeto de tarefa
    const newTodo = { 
      text: input.value.trim(), 
      completed: false 
    };
    
    // Adiciona a nova tarefa ao array de tarefas
    todos.push(newTodo);
    
    // Salva as tarefas no localStorage
    localStorage.setItem("todos", JSON.stringify(todos));
    
    input.value = "";  // Limpa o campo de entrada
    renderTodos();  // Atualiza a lista de tarefas
  }
}

function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  
  // Salva as tarefas atualizadas no localStorage
  localStorage.setItem("todos", JSON.stringify(todos));
  
  renderTodos();  // Atualiza a lista de tarefas

  // Exibe um toast de parabenização quando uma tarefa é concluída
  if (todos[index].completed) {
    showToast("Parabéns!", getRandomMessage(), getRandomImage());
  }

  // Exibe um toast quando todas as tarefas forem concluídas
  if (todos.every(todo => todo.completed)) {
    showToast("Você concluiu todas as tarefas!", getFinalMessage(), getFinalImage());
  }
}

function renderTodos() {
  const list = document.getElementById("todoList");
  list.innerHTML = "";  // Limpa a lista antes de renderizar novamente

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "flex justify-between p-2 border rounded mb-2";
    
    // Adiciona o HTML da tarefa com um checkbox
    li.innerHTML = `
      <div class="flex items-center">
        <input type="checkbox" ${todo.completed ? "checked" : ""} onclick="toggleTodo(${index})" class="mr-2">
        <span class="${todo.completed ? "line-through text-gray-500" : ""}">${todo.text}</span>
      </div>
      <button onclick="deleteTodo(${index})" class="text-xl font-bold text-red-600">X</button>
    `;
    
    list.appendChild(li);  // Adiciona a tarefa à lista
  });
}

// Função para deletar um item da to-do list
function deleteTodo(index) {
  todos.splice(index, 1);  // Remove o item do array
  localStorage.setItem("todos", JSON.stringify(todos));  // Atualiza o localStorage
  renderTodos();  // Atualiza a lista na interface
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
  
  // Remove o toast após 5 segundos
  setTimeout(() => toast.remove(), 5000);
}

// JSON de mensagens e imagens
function getRandomMessage() {
  return "Ótimo trabalho!";
}

function getFinalMessage() {
  return "Você terminou todas as tarefas!";
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

// Função para adicionar nota
function addNote() {
  const noteTitle = document.getElementById('noteTitle');
  const noteContent = document.getElementById('noteContent');
  const notesList = document.getElementById('notesList');
  const noteColor = document.getElementById('noteColor').value;  // Pega a cor escolhida no select

  if (noteTitle.value.trim() && noteContent.value.trim()) {
    const noteItem = document.createElement('div');
    noteItem.classList.add('p-4', 'rounded-md', 'shadow-sm', 'relative');  // Adicionando a classe 'relative' para posicionar o "X"

    // Define a cor de fundo da nota com a cor escolhida
    noteItem.style.backgroundColor = noteColor || '#ffffff';  // Usa a cor escolhida ou branco por padrão

    const noteHeader = document.createElement('h3');
    noteHeader.classList.add('font-bold', 'mb-2');
    noteHeader.textContent = noteTitle.value.trim();

    const noteBody = document.createElement('p');
    noteBody.textContent = noteContent.value.trim();

    const data = new Date();

    // Função para adicionar zero à esquerda em números menores que 10
    function formatarNumero(numero) {
      return numero < 10 ? '0' + numero : numero;
    }

    const noteFooter = document.createElement('h3');
    noteFooter.classList.add('font-thin', 'text-xs');
    noteFooter.textContent = `${formatarNumero(data.getDate())}/${formatarNumero(data.getMonth() + 1)}/${data.getFullYear()} ${formatarNumero(data.getHours())}:${formatarNumero(data.getMinutes())}:${formatarNumero(data.getSeconds())}`;

    // Adicionando o botão de delete (X)
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('absolute', 'top-2', 'right-2', 'text-xl', 'font-bold', 'text-red-600');
    deleteBtn.textContent = 'X';
    deleteBtn.onclick = function() {
      deleteNote(noteItem, noteTitle.value.trim(), noteContent.value.trim(), noteColor, noteFooter.textContent);
    };

    // Adicionando elementos à nota
    noteItem.appendChild(deleteBtn);
    noteItem.appendChild(noteHeader);
    noteItem.appendChild(noteBody);
    noteItem.appendChild(noteFooter);

    // Adiciona a nota à lista
    notesList.appendChild(noteItem);

    // Salva a nota no localStorage
    saveNoteToLocalStorage(noteTitle.value.trim(), noteContent.value.trim(), noteColor, noteFooter.textContent);

    // Limpa os campos
    noteTitle.value = ''; // Limpa o título
    noteContent.value = ''; // Limpa o conteúdo
    document.getElementById('noteColor').value = '#ffffff'; // Reseta a cor para branco após adicionar a nota
  }
}

// Função para salvar a nota no localStorage
function saveNoteToLocalStorage(title, content, color, date) {
  let notes = JSON.parse(localStorage.getItem('notes')) || [];

  const newNote = {
    title: title,
    content: content,
    color: color,
    date: date
  };

  notes.push(newNote);

  // Salva as notas no localStorage
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Função para carregar as notas salvas ao carregar a página
function loadNotesFromLocalStorage() {
  const notesList = document.getElementById('notesList');
  const notes = JSON.parse(localStorage.getItem('notes')) || [];

  notes.forEach(note => {
    const noteItem = document.createElement('div');
    noteItem.classList.add('p-4', 'rounded-md', 'shadow-sm', 'relative');
    noteItem.style.backgroundColor = note.color || '#ffffff';

    const noteHeader = document.createElement('h3');
    noteHeader.classList.add('font-bold', 'mb-2');
    noteHeader.textContent = note.title;

    const noteBody = document.createElement('p');
    noteBody.textContent = note.content;

    const noteFooter = document.createElement('h3');
    noteFooter.classList.add('font-thin', 'text-xs');
    noteFooter.textContent = note.date;

    // Adicionando o botão de delete (X)
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('absolute', 'top-2', 'right-2', 'text-xl', 'font-bold', 'text-red-600');
    deleteBtn.textContent = 'X';
    deleteBtn.onclick = function() {
      deleteNote(noteItem, note.title, note.content, note.color, note.date);
    };

    noteItem.appendChild(deleteBtn);
    noteItem.appendChild(noteHeader);
    noteItem.appendChild(noteBody);
    noteItem.appendChild(noteFooter);

    notesList.appendChild(noteItem);
  });
}

// Função para deletar uma nota
function deleteNote(noteItem, title, content, color, date) {
  // Remove a nota da interface
  noteItem.remove();

  // Remove a nota do localStorage
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes = notes.filter(note => note.title !== title || note.content !== content || note.date !== date);
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Carrega as notas ao carregar a página
function renderNotes() {
  loadNotesFromLocalStorage();
}

function CloseFooter(){
  const footer = document.querySelector("footer")
  footer.classList.add("hidden")
}