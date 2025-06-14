<template>
  <div class="h-fit p-4 bg-slate-800 rounded-lg shadow-md text-slate-50">
    <!-- Vídeo -->
    <div class="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg mb-4">
      <iframe
        class="w-full h-full"
        :src="currentEmbedUrl"
        title="Lofi Video"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>

    <!-- Select -->
    <div class="flex flex-col space-y-2">
      <label for="lofiSelect" class="text-sm font-medium">Escolha uma vibe:</label>
      <select
        id="lofiSelect"
        v-model="selectedId"
        class="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option
          v-for="video in lofiVideos"
          :key="video.id"
          :value="video.id"
          class="text-slate-950"
        >
          {{ video.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const lofiVideos = [
  { id: '5jaT_8hy3Vg?si=dBpoLSvtOsFrusPh', name: 'Lofi Game' },
  {id: 'xv3h5tBDOmY?si=eMuVJbOoUd6wb_HL', name: 'Lofi Brasil'}
]

const selectedId = ref(lofiVideos[0].id)

const currentEmbedUrl = computed(() =>
  `https://www.youtube.com/embed/${selectedId.value}`
)
</script>
