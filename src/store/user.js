// /store/user.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    //isSignedUp: false,
  }),

  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      this.user = user;
    },
    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      this.isSignedUp = true;
      if (error) throw error;
      if (user) this.user = user;
    },
    
    // Hacer sign in
    async signIn(email, password){
      const { user, session, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      })
      if (error) throw error;
      if (user) this.user = user;
    },

    // Hacer log out
    async signOut(){
      const { error } = await supabase.auth.signOut()
    },
    persist: {
      enabled: true,
      strategies: [
        {
          key: "user",
          storage: localStorage,
        },
      ],
    },
  },
});
