<template>
    <div class="formbg-inner padding-horizontal--48">
        <span class="padding-bottom--15">Register a new account</span>
        <form class="stripe-login" @submit.prevent="isValid()">
            <div class="field padding-bottom--24">
                <label for="email" name="email" class="">Email</label>
                <input required v-model="email" type="email" id="email" placeholder="Your@email.com" class="">
            </div>
            <div class="field padding-bottom--24">
                <label for="password" class="text-lg">Password</label>
                <input required v-model="password" name="password" type="password" id="password" placeholder="Password" class="">
            </div>
            <div class="field padding-bottom--24">
                <label for="repPassword" class="text-lg">Confirm password</label>
                <input required v-model="repeatPassword" name="repeatPassword" type="password" id="repPassword" placeholder="Confirm password" class="">
            </div>
            <p class="text-error">
                    {{ errorMsg }}
            </p>
            <div class="field padding-bottom--24">
                <input type="submit" value="Sign Up" class="">
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
            password: null,
            repeatPassword: null,
            errorMsg: null
        }
    },
    computed: {
        ...mapStores(useUserStore)
    },
    methods: {
        
        async signUp(email, password) {
            this.email = email;
            this.password = password;
            try {
            await this.userStore.signUp(this.email, this.password);
            console.log(this.email, this.password);
            router.push({ path: '/auth'});
            this.$router.go();
            }
         
            catch(error) {
            console.log("error");
            } 
        },
        //comprobaciones entrada datos usuario:
        isValid() {
            if (this.checkEmail(this.email) && this.checkPassword(this.password, this.repeatPassword)) {
                
                this.signUp(this.email, this.password);
            } else {
                console.log(this.errorMsg)
            }
        },
        checkEmail(email) {
            this.email = email;
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                     return true;
                }
                    else {
                        this.errorMsg ="Please enter a valid email";
            }
        },
        checkPassword(password, repeatPassword) {
            this.password = password;
            this.repeatPassword = repeatPassword;
            if (password.length<6) {
                this.errorMsg = "The password needs 4 characters";
            } else if (password !== repeatPassword) {
                this.errorMsg = "The password does not match";
            } else {
                return true;
            }
        }
        
    }
    }
</script>

<style>

</style>