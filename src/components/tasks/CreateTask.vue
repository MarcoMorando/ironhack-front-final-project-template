<template>
  <form
    id="new-task"
    @submit.prevent="createNewTask"
  >
    <input
      v-model="title"
      type="text"
      name="new-task"
      class="text ml-10"
      minlength="8"
      placeholder="New Task"
    >
    <button class="submit">
      Create
    </button>
  </form>
</template>

<script setup>
  import { ref } from 'vue'
  import { useUserStore } from '../../store/user.js'
  import { useTaskStore } from '../../store/task.js'
  
  const userStore = useUserStore()
  const taskStore = useTaskStore()
  const title = ref(null)
  
  const clearInput = () => {
    title.value = ""
  }
  
  async function createNewTask() {
    try {
      console.log(title.value)
      await taskStore.createTask(title.value, userStore.user.id)
      clearInput()
    } catch (e) {
      alert('could not add task')
    }
  }
  </script>
  
  <style scoped>
  .submit{
    margin-left: 1rem;
    padding: 10px 20px;
    font-size: 18px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    outline: none;
    color: #fff;
    background-color: #2033c8;
    border: none;
    border-radius: 15px;
    box-shadow: 0 4px #999;
  }

  .submit:hover {background-color: #0a0a59}

  .submit:active {
    background-color: #0a0a59;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }

  .ml-10{
    margin-left: 10px;
  }
  </style>

  