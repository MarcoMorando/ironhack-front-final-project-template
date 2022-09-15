<template>
    <div class="">
        <p class="">Sign in to your account</p>
        <form class="" @submit.prevent="signIn(email, password)">
            <div class="">
                <label for="email" name="email" class="">Email</label>
                <input required v-model="email" type="email" id="email" placeholder="your@email.com" class="">
            </div>
            <div class="">
                <label for="password" class="">Password</label>
                <input required v-model="password" name="password" type="password" id="password" placeholder="Password" class="">
            </div>
            <input type="submit" value="Sign In" class="">
        </form>
    </div>
</template>

<script>
import router from "../../router";
import { useUserStore } from "../../store/user";
import { mapStores } from 'pinia';
export default {
    data() {
            return {
                email: null,
                password: null
            }
        },
        computed: {
            ...mapStores(useUserStore)
        },
        methods: {
            async signIn(email, password) {
                this.email = email;
                this.password = password;
                try {
                await this.userStore.signIn(this.email, this.password); 
                router.push({ path: '/' }); 
                }
            catch(error) {
                console.log("error");
                }  
            }
        }
    }
</script>

<style>


</style>