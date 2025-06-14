<template>
  <div class="h-fit p-4 bg-slate-800 rounded-lg shadow-md text-slate-50">
    <!-- Gráfico -->
    <div class="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg mb-4 bg-slate-900 p-4">
      <canvas ref="canvasRef"></canvas>
    </div>

    <!-- Status -->
    <div class="text-sm text-slate-300">
      <p>Monitorando a estabilidade da sua internet em tempo real (ping para o Google a cada segundo).</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Filler
} from 'chart.js'

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Filler)

const canvasRef = ref(null)
let chart

const labels = []
const data = {
  labels,
  datasets: [
    {
      label: 'Ping (ms)',
      data: [],
      borderColor: 'cyan',
      backgroundColor: 'rgba(0, 255, 255, 0.1)',
      tension: 0.3,
      fill: true,
      pointRadius: 2
    }
  ]
}

// Ignorar primeiros 10 segundos
let startedAt = null

function getPing() {
  const start = performance.now()
  fetch('https://www.google.com/favicon.ico', {
    mode: 'no-cors',
    cache: 'no-store'
  })
    .catch(() => {}) // ignora erro
    .finally(() => {
      const ms = Math.round(performance.now() - start)
      const now = new Date().toLocaleTimeString()

      const elapsed = (Date.now() - startedAt) / 1000

      if (elapsed < 10) return // Ignora se não passou 10s

      if (labels.length > 60) {
        labels.shift()
        data.datasets[0].data.shift()
      }

      labels.push(now)
      data.datasets[0].data.push(ms)
      chart.update()
    })
}

onMounted(() => {
  startedAt = Date.now()

  chart = new Chart(canvasRef.value, {
    type: 'line',
    data,
    options: {
      responsive: true,
      animation: false,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: { color: '#ccc' }
        },
        y: {
          beginAtZero: true,
          ticks: { color: '#ccc' }
        }
      },
      plugins: {
        legend: {
          labels: { color: '#fff' }
        }
      }
    }
  })

  setInterval(getPing, 1000)
})
</script>
