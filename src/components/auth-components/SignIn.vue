<template>
    <div class="formbg-inner padding-horizontal--48">
        <span class="padding-bottom--15">Sign in to your account</span>
        <form class="stripe-login" @submit.prevent="signIn(email, password)">
            <div class="field padding-bottom--24">
                <label for="email" name="email" class="">Email</label>
                <input required v-model="email" type="email" id="email" placeholder="your@email.com" class="">
            </div>
            <div class="field padding-bottom--24">
                <label for="password" class="">Password</label>
                <input required v-model="password" name="password" type="password" id="password" placeholder="Password" class="">
            </div>
            <div class="field padding-bottom--24">
                <input type="submit" value="Sign In" class="">
            </div>
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