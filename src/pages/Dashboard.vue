<template>
  <section v-if="user">
    <header class="header">
      <div class="header-title">
        <h3>
        Welcome <span>{{ user.email.split("@")[0].toUpperCase() }}</span>
        </h3>
      </div>
      <div class="header-right">
        <div class="circle-user">
          <p>{{user.email.charAt(0).toUpperCase()}}</p>
        </div>
        <div class="log-out-btn">
          <button class="" @click="signOut">Log out</button>
        </div>
      </div>
    </header>
    <div class="tasks-content">
      <div class="new-task-content">
        <h3 class="title-section">Add new Tasks</h3>
        <CreateTask />
      </div>
      <h1 v-if=" !tasks">
        No tasks
      </h1>
      <div
        v-if="tasks"
        class="tasklist-main"
      >
        <div class="tasklist-all">
          <h3 class="title-section">To Do Tasks</h3>
          <TaskList
            v-for="task in tasks.filter(t => t.is_complete === false)"
            :id="`task-${task.id}`"
            :key="task.id"
          >
            <template #content>
              <div v-if="editingTask !== task.id">
                {{ task.title }}
              </div>
              <div v-if="editingTask === task.id">
                <input
                  :key="task.id"
                  v-model="editedTask"
                  class="edit-input"
                >
                <button
                  name="update"
                  @click="updateTask(task.id)"
                  class="fn-btn save-btn"
                >
                  Save
                </button>
              </div>
            </template>
            <template #buttons>
              <button
                name="edit"
                @click="editTask(task.title, task.id)"
                class="fn-btn edit-btn"
              >
                Edit
              </button>
              <button
                name="complete"
                @click="taskStore.changeStatus(task.id, true )"
                class="fn-btn complete-btn"
              >
                Complete
              </button>
              <button
                name="delete"
                @click="taskStore.deleteTask(task.id)"
                class="fn-btn delete-btn"
              >
                Delete
              </button>
            </template>
          </TaskList>
        </div>

        <div class="tasklist-complete">
          <h3 class="title-section">Completed Tasks</h3>
          <TaskList
            v-for="task in tasks.filter(t => t.is_complete === true)"
            :id="`task-${task.id}`"
            :key="task.id"
          >
            <template #content>
              <div v-if="editingTask !== task.id">
                {{ task.title }}
              </div>
              <div v-if="editingTask === task.id">
                <input
                  :key="task.id"
                  v-model="editedTask"
                  class="edit-input"
                >
                <button
                  name="update"
                  @click="updateTask(task.id)"
                  class="fn-btn save-btn"
                >
                  Save
                </button>
              </div>
            </template>
            <template #buttons>
              <button
                name="edit"
                @click="editTask(task.title, task.id)"
                class="fn-btn edit-btn"
              >
                Edit
              </button>
              <button
                name="to-do"
                @click="taskStore.changeStatus(task.id, false )"
                class="fn-btn todo-btn"
              >
                To Do
              </button>
              <button
                name="delete"
                @click="taskStore.deleteTask(task.id)"
                class="fn-btn delete-btn"
              >
                Delete
              </button>
            </template>
          </TaskList>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
  import { ref, onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  
  import TaskList from '../components/tasks/TaskList.vue';
  import CreateTask from '../components/tasks/CreateTask.vue';
  
  import { useUserStore } from '../store/user.js';
  import { useTaskStore } from '../store/task.js';
  
  const userStore = useUserStore();
  const taskStore = useTaskStore();
  const { tasks } = storeToRefs(taskStore);
  const { user } = storeToRefs(userStore);
  
  let editedTask = ref(null);
  let editingTask = ref(null);
  const errorMsg = ref(null);
  
  async function signOut() {
    try {
      router.push({ path: "/auth" });
      userStore.signOut();
    } catch (e) {
      alert(e);
    }
  }

  const updateTask = async(taskId) => {
    try {
      await taskStore.editTask(taskId, editedTask.value);
      editingTask.value = null;
    } catch (e) {
      errorMsg.value = e.message;
    }
  }
  
  const editTask = async (title, taskId) => {
    editedTask.value = title;
    editingTask.value = taskId;
  }
  
  onMounted(async () => {
    console.log('tasks', tasks.value);
    try {
      await taskStore.fetchTasks();
    } catch (e) {
      errorMsg.value = e.message;
    }
  
    if (!user.value.confirmed_at) {
      alert('confirm your account')
    }
    
  })
  </script>
  

  <style scoped>
    
    .title-section{
      font-size: 20px;
      margin-bottom: 5px;
      border-bottom: 2px solid black;
      font-weight: bold;
    }
  .header {
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    background-color: black;
    color: white;
    justify-content: space-between;
  }
  .header-title{
    display: flex;
    font-size: 25px;
    cursor: default;
  }
  .header-right{
    display: flex;
    align-items: center;
  }
  .circle-user {
    border: 1px solid #2ECC71;
    border-radius: 20px;
    width: 40px;
    height: 40px;
    background-color: #2ECC71;
  }
  .circle-user > p {
    margin-top: 7px;
    text-align: center;
    margin-bottom: 10px;
    font-weight: bold;
    cursor: pointer;
  }
  .log-out-btn{
    margin-left: 10px;
    background-color: red;
    padding: 10px;
    border-radius: 30%;
    cursor: pointer;
  }
  
  .tasks-content{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    min-height: 47rem;
    padding: 1rem;
    background-color: aquamarine;
  }
  .new-task-content{
    margin: 10px 0px;
  }

  .tasklist-main {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }

  .edit-input{
    max-width: 10rem;
  }

  .fn-btn{
    padding: 5px 10px;
    font-size: 12px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    outline: none;
    border: none;
    border-radius: 15px;
    box-shadow: 0 4px #999;
  }

  .edit-btn{
    color: #fff;
    background-color: #000000;
  }

  .edit-btn:hover {background-color: #373737}

  .edit-btn:active {
    background-color: #373737;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }

  .complete-btn{
    color: #fff;
    background-color: #0d9123;
  }

  .complete-btn:hover {background-color: #01c218}

  .complete-btn:active {
    background-color: #01c218;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }

  .todo-btn{
    color: #fff;
    background-color: #c1da06;
  }

  .todo-btn:hover {
    background-color: #ffff02;
    color: #000000;
  }

  .todo-btn:active {
    background-color: #ffff02;
    color: #000000;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }

  .delete-btn{
    color: #fff;
    background-color: #da0606;
  }

  .delete-btn:hover {
    background-color: #ff0202;
  }

  .delete-btn:active {
    background-color: #ff0202;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }

  .save-btn{
    margin-top: 5px;
    color: #fff;
    background-color: #0a0a59;
  }

  .save-btn:hover {
    background-color: #2033c8;
  }

  .save-btn:active {
    background-color: #2033c8;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }
  </style>
  