<template>
    <p v-if="statusMsg"> {{ statusMsg }}</p>
    <p v-if="errorMsg"> {{ errorMsg }}</p>
       <div class="flex mt-4">
                    
                    <input 
                    v-model="taskname"
                    class="shadow appearance-none border rounded input input-bordered input-accent w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add new task">
                    <button @click="callAddTask" class="btn btn-info">Add</button>
                </div>
    </template>
    
    <script>
    //import router from "../router";
    import { useTaskStore } from "../store/task";
    import { useUserStore } from "../store/user";
    export default {
         setup() {
        const userStore = useUserStore();
        const taskStore = useTaskStore();
        return {userStore, taskStore}
      },
        data() {
            return {
               
                taskname: "",
                is_complete: false,
                statusMsg: "",
                errorMsg: "",
                
            
            }
        },
    methods: {
        callAddTask() {
             if (this.taskname == null || this.taskname.length === 0) {
                this.errorMsg = "Please enter a task"; 
                setTimeout(() => {this.errorMsg = null}, 1000);
                
              } 
              else if (this.taskname.length > 50) {
                this.errorMsg = "the maximum number of characters is 50";
                setTimeout(() => {this.errorMsg = ""}, 3000);
              }         
              else {
                this.addTask(this.taskname, this.userStore.user.id);
                console.log(this.taskname)
              }
        },
        async addTask() {
           
            
            try {
                
              await this.taskStore.addTask(this.taskname, this.userStore.user.id);
              this.taskname = null;
              
              
            }
            catch(error) {
                this.errorMsg = `Error: ${error}`
                console.log(this.errorMsg);
                } 
        }
    }
    }
    </script>
    
    <style>
    </style>