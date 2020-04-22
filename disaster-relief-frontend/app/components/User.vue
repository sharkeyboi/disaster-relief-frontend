<template>
  <Page @loaded='getDeviceData' class="page">
    <ActionBar :title="email" class="action-bar" />
    <FlexboxLayout flexDirection="column" >
        <Label text="Device Id"/>
        <Label :text="deviceData.device_info.device_id"/>
        <Label text="Access Point SSID"/>
        <Label :text="deviceData.device_info.ssid"/>
        <Label text="Access Point Password"/>
        <Label :text="deviceData.device_info.ap_password"/>
        <Label text="Sensor Data"/>
        <Button v-for="sensor in deviceData.sensors" v-bind:key="sensor.type" :text="sensor.type" @tap='viewSensor'/>
    </FlexboxLayout>
  </Page>
</template>

<script >
import axios from 'axios';
import { mapState } from 'vuex'
import Sensor from './Sensor'
  export default {
    data() {
      return {
          deviceData: {
              device_info: {
                  "device_id" : "",
                  "ap_password" : "",
                  "ssid" : ""
              },
              sensors: []
          }
      }
    },
    computed: {
        ...mapState({
            email: state => state.email,
            token: state => state.token
        })
    },
    methods: {
        getDeviceData() {
            const AuthStr = 'Bearer '.concat(this.token);
            axios.get('https://disaster-relief-backend.appspot.com/device', { headers: { Authorization: AuthStr } }).then(response => {
                    // If request is good...
                    this.deviceData = response.data;
                })
                .catch((error) => {
                    console.log('error 3 ' + error);
                });
        },
        viewSensor(args) {
            this.$navigateTo(Sensor,{
                transition: {
                    name:'fade',
                    duration: 200
                },
                props: {
                    sensorName: args.object.text
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
    Label {
        text-align: center;
        font-size: 20;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
</style>
