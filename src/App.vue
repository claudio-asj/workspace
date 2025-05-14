<template>
  <div class="min-h-screen p-4 bg-[url('/bg.jpg')] bg-cover bg-center flex gap-8">
    <div class="flex flex-col gap-8">
      <lofi-card/>
      <timer-card/>
    </div>
    <todo-list-card/>
  </div>
</template>

<script>
import LofiCard from './components/LofiCard.vue'
import TodoListCard from './components/TodoListCard.vue'
import TimerCard from './components/TimerCard.vue'

export default {
  name: 'App',
  components: {
    LofiCard,
    TodoListCard,
    TimerCard
  }
}
</script>