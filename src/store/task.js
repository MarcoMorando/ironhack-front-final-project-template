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
    async addTask(title, is_complete, user_id) {
      const { data, error } = await supabase.from("tasks").insert([
        {
          title: title,
          is_complete: is_complete,
          user_id: user_id,
        },
      ]);
      if (error) throw error;
    },
    // Hacer el PUT (edit)
    async editTask(title, is_complete, taskId) {
      const { data, error } = await supabase
      .from('tasks')
      .update({ title: title, is_complete: is_complete })
      .match({id: taskId})
    },
    // Hacer el delete
    async deleteTask(taskId) {
      const { data, error } = await supabase
      .from('tasks')
      .delete()
      .match({id: taskId})
    },
    // Hacer el PUT (cambiar entre completada y pendiente)
    async changeTask (taskId, complete) {
      await supabase
        .from('tasks')
        .update({ is_complete: complete })
        .match({ id: taskId });
      this.fetchTasks();
    },
  },
});
