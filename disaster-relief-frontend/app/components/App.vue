<template>
  <Page class="page">
    <ActionBar title="Disaster Home Monitoring System" class="action-bar" />
    <FlexboxLayout flexDirection="column" >
        <TextField v-model="email" hint="email" />
        <TextField v-model="password" hint="password" />
        <FlexboxLayout justifyContent='space-around' flexDirection="row">
          <Button text="Login" @tap='login'/>
          <Button text="Signup" @tap='signup'/>
        </FlexboxLayout>
        
    </FlexboxLayout>
  </Page>
</template>

<script >
import axios from 'axios';
import User from './User'
import Register from './Register'

  export default {
    data() {
      return {
        email: "",
        password: "",
        checked: true
      }
    },
    mounted: function () {
    },
    methods: {
        login() {
            axios.post("https://disaster-relief-backend.appspot.com/login",{
                email: this.email,
                password: this.password
            }).then(response => {
                console.log("UPDATING VALUES!")
                this.$store.commit("updateToken",response.data.token)
                this.$store.commit("updateEmail",response.data.email)
                this.$navigateTo(User, {
                    transition: {
                        name:'fade',
                        duration: 200
                    }
                })
            }).catch((error) => {
                console.log('error 3 ' + error);
            });
        },
        signup() {
          this.$navigateTo(Register, {
              transition: {
                name:'fade',
                duration: 200
              }
          })
        }
    }
  }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
</style>
