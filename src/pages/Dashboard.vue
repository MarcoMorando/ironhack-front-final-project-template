<template>
  <div>
    <button class="" @click="signOut">Log out</button>
  </div>
  <!--<div class="">
    <aside class="">
      <SideBar @create-task="createTask" @delete-all-tasks="deleteAllTasks" />
    </aside>
    <main
      class=""
    >
      <div>
        <h2 class="text-center">Pending Tasks</h2>
        <TaskList
          :tasks="[...tasks.filter((t) => !t.isCompleted)]"
          @deleteTask="deleteTask"
          @toggleTaskCompleted="toggleTaskCompleted"
          @editTask="editTask"
        />
      </div>

      <div>
        <h2 class="text-center">Completed Tasks </h2>
        <TaskList
          :tasks="[...tasks.filter((t) => t.isCompleted)]"
          @deleteTask="deleteTask"
          @toggleTaskCompleted="toggleTaskCompleted"
          @editTask="editTask"
        />
      </div>
    </main>
    <ModalVerticalVue
      v-if="showModal"
      :header="modalHeader"
      :body="modalBody"
      :buttonMessage="modalButtonMessage"
      @close="showModal = !showModal"
    />
  </div>-->
</template>

<script>
import router from "../router";
import { useUserStore } from "../store/user";
//import { useTaskStore } from "../store/task";
//import TaskList from "../components/task/TaskList.vue";
export default {
    setup() {
        const userStore = useUserStore();
        return {userStore}
    },
    methods: {
      async signOut() {
        try {
            await this.userStore.signOut();
            router.push({ path: '/auth' }); 
            }
        
        catch(error) {
            console.log(`Error: ${error}`);
            }  
      },
    }
}
</script>

<style>

</style>