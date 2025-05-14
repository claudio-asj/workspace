<template>
  <div
    class="h-fit p-4 bg-slate-800 rounded-lg shadow-md text-slate-50 space-y-6"
  >
    <h1 class="text-2xl font-bold text-center">📝 To-Do List Personalizada</h1>

    <!-- Formulário -->
    <form @submit.prevent="addTask" class="space-y-4">
      <input
        v-model="newTask.title"
        type="text"
        placeholder="Título"
        class="w-full p-2 border rounded"
        required
      />
      <textarea
        v-model="newTask.description"
        placeholder="Descrição"
        class="w-full p-2 border rounded"
      ></textarea>
      <select v-model="newTask.color" class="w-full p-2 border rounded">
        <option disabled value="">Escolha uma cor</option>
        <option value="bg-red-200">Vermelho</option>
        <option value="bg-green-200">Verde</option>
        <option value="bg-blue-200">Azul</option>
        <option value="bg-yellow-200">Amarelo</option>
        <option value="bg-purple-200">Roxo</option>
        <option value="bg-gray-200">Cinza</option>
      </select>
      <button
        type="submit"
        class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Adicionar Tarefa
      </button>
    </form>

    <!-- Lista de tarefas -->
    <div v-if="tasks.length" class="space-y-4">
      <div
        v-for="(task, index) in tasks"
        :key="index"
        :class="[
          task.color,
          'p-4 rounded shadow flex flex-col text-slate-950',
          task.isFinished ? 'opacity-60 line-through' : '',
        ]"
      >
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">{{ task.title }}</h2>
          <input
            type="checkbox"
            v-model="task.isFinished"
            @change="saveTasks"
            class="w-5 h-5"
          />
        </div>
        <p class="mt-1 text-sm text-gray-700">{{ task.description }}</p>
      </div>
    </div>

    <div v-else class="text-center text-gray-500">Nenhuma tarefa ainda.</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

// Estrutura da nova tarefa
const newTask = ref({
  title: "",
  description: "",
  color: "",
  isFinished: false,
});

// Lista de tarefas
const tasks = ref([]);

// Adiciona nova tarefa
function addTask() {
  tasks.value.push({ ...newTask.value });
  saveTasks();
  resetForm();
}

// Limpa o formulário
function resetForm() {
  newTask.value = {
    title: "",
    description: "",
    color: "",
    isFinished: false,
  };
}

// Salva no localStorage
function saveTasks() {
  localStorage.setItem("todo-tasks", JSON.stringify(tasks.value));
}

// Carrega do localStorage na inicialização
onMounted(() => {
  const saved = localStorage.getItem("todo-tasks");
  if (saved) {
    tasks.value = JSON.parse(saved);
  }
});

// Sempre que tarefas mudam, salva
watch(tasks, saveTasks, { deep: true });
</script>
