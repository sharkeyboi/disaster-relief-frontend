<template>
  <Page class="page">
    <ActionBar title="Register" class="action-bar" />
    <FlexboxLayout flexDirection="column" >
        <TextField v-model="email" hint="email" />
        <TextField v-model="password" hint="password" />
        <TextField v-model="deviceId" hint="device id" />
        <Button text="Sign Up" @tap='signup'/>
    </FlexboxLayout>
  </Page>
</template>

<script >
import axios from 'axios';
import App from './App';

  export default {
    data() {
      return {
        email: "",
        password: "",
        deviceId: "",
        checked: true
      }
    },
    mounted: function () {
    },
    methods: {
        signup() {
            console.log("Signing up!")
            axios.post("https://disaster-relief-backend.appspot.com/user",{
                email: this.email,
                password: this.password,
                deviceId: this.deviceId
            }).then(response => {
                console.log("UPDATING VALUES!")
                this.$navigateTo(App, {
                    transition: {
                        name:'fade',
                        duration: 200
                    }
                })
            }).catch((error) => {
                console.log('error 3 ' + error);
            });
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
