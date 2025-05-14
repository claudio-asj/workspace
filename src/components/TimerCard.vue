<template>
  <div class="h-fit p-4 bg-slate-800 rounded-lg shadow-md text-slate-50 space-y-6">
    <h1 class="text-2xl font-bold">⏱️ Timer de Foco</h1>

    <!-- Botões de tempo -->
    <div class="flex flex-wrap justify-center gap-3">
      <button
        v-for="opt in timeOptions"
        :key="opt.label"
        @click="setTime(opt.minutes)"
        class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
      >
        {{ opt.label }}
      </button>
    </div>

    <!-- Exibição do tempo -->
    <div class="text-5xl font-mono">
      {{ formattedTime }}
    </div>

    <!-- Botão de play/pause -->
    <button
      @click="toggleTimer"
      class="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
    >
      {{ isRunning ? '⏸️ Pausar' : '▶️ Iniciar' }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

// Tempo total em segundos
const remaining = ref(0)
const isRunning = ref(false)
let interval = null

const timeOptions = [
  { label: '🧘 40 min', minutes: 40 },
  { label: '📚 25 min', minutes: 25 },
  { label: '☕ 10 min', minutes: 10 },
  { label: '💨 5 min', minutes: 5 }
]

// Formatador
const formattedTime = computed(() => {
  const min = Math.floor(remaining.value / 60)
  const sec = remaining.value % 60
  return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
})

// Configura o tempo
function setTime(minutes) {
  stopTimer()
  remaining.value = minutes * 60
}

// Inicia ou pausa
function toggleTimer() {
  if (isRunning.value) {
    stopTimer()
  } else {
    startTimer()
  }
}

function startTimer() {
  if (remaining.value <= 0) return
  isRunning.value = true
  interval = setInterval(() => {
    if (remaining.value > 0) {
      remaining.value--
    } else {
      stopTimer()
      notify()
    }
  }, 1000)
}

function stopTimer() {
  isRunning.value = false
  clearInterval(interval)
}

// Notificação
function notify() {
  if (Notification.permission === 'granted') {
    new Notification('⏰ Tempo esgotado!', {
      body: 'Seu timer terminou. Faça uma pausa ou volte ao foco!',
      icon: 'https://cdn-icons-png.flaticon.com/512/992/992700.png' // opcional
    })
  }
}

// Pede permissão na montagem
onMounted(() => {
  if ('Notification' in window && Notification.permission !== 'granted') {
    Notification.requestPermission()
  }
})

onBeforeUnmount(() => {
  stopTimer()
})
</script>
