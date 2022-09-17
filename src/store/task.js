// /store/task.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
      if (error) throw error;
    },
    // Hacer POST
    async createTask (title, user_id) {
      await supabase
        .from('tasks')
        .insert([{ title: title, is_complete: false, user_id: user_id }]);
      this.fetchTasks();
    },
    // Hacer el PUT (edit)
    async editTask (taskId, editedTask) {
      await supabase
        .from('tasks')
        .update({ title: editedTask })
        .match({ id: taskId });
      this.fetchTasks();
    },
    // Hacer el delete
    async deleteTask (taskId) {
      await supabase
        .from('tasks')
        .delete()
        .match({ id: taskId });
      this.fetchTasks();
    },
    // Hacer el PUT (cambiar entre completada y pendiente)
    async changeStatus (taskId, status) {
      await supabase
        .from('tasks')
        .update({ is_complete: status })
        .match({ id: taskId });
      this.fetchTasks();
    },
  },
});
