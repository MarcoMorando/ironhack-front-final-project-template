<template>
    <div  class="">
                <p v-if="errorMsg"> {{ errorMsg }}</p>
                <div class="w-full">
                    <p v-if="!isEditing" @click="editTask" class="" > {{  title}} </p>
                    <input v-else v-model="title" maxlength="50" type="text" class=""/>
                </div>
               <div class="">

                <!-- save changes -->
                <div class="" data-tip="save">
                    <button @click="saveTask" class=""> </button>
                </div>
                
                <!-- task completed -->
                <div class="" data-tip="done!">
                    <button @click="isComplete" class="" id="my_done_icon" color="#3c9e28"> </button>
                </div>
                
                <!-- delete task -->
                <div class="tooltip tooltip-error" data-tip="delete">
                    <button  @click="deleteTask" class="" id="my_delete_icon" color="#7a0417"></button>
                </div>
                
               </div>
                
    </div>
</template>

<script> 
import { useUserStore } from "../store/user";
import { useTaskStore } from "../store/task";
export default {
    setup() {
    const userStore = useUserStore();
    const taskStore = useTaskStore();
    return {userStore, taskStore}
  },
  data() {
    return {
        isEditing: false,
        isDone: false,
        isActive: false,
        statusMsg: null,
        errorMsg: null,
        //maxLength: 40
    }
  },
 
    props: {
        title: String,
        taskId: Number,
        
    },
    methods: {
        async deleteTask() {
            await this.taskStore.deleteTask(this.taskId) 
            
        },
        async saveTask() {
          
            try {
                await this.taskStore.saveTask(this.title, this.taskId);
                this.isEditing = !this.isEditing;
            }
            catch(error) {
                console.log(error);
            }
        },
        editTask() {
            this.isEditing = !this.isEditing;
        },
        async isComplete() {
            try {
               
                this.isDone = !this.isDone; //cambia el is_complete a true
                
                await this.taskStore.changeTask(this.isDone, this.taskId);
                
                
            }
            catch(error) {
                console.log(error);
            }
        },
       
    }
}
</script>

<style>
</style>