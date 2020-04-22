<template>
  <Page @loaded='getSensorData' class="page">
    <ActionBar :title="sensorName" class="action-bar" />
    <FlexboxLayout flexDirection="column" >
        <Label v-if='sensorData[0]' :text='new Date(sensorData[0].timestamp).toDateString()'/>
        <Label v-if='sensorData[0]' :text='new Date(sensorData[0].timestamp).toLocaleTimeString()'/>
        <Label v-if='sensorData[0]' :text='sensorData[0].value + sensorSuffixes[sensorName]'/>
        <Label v-else text="No data"/>
        <RadCartesianChart v-if='sensorData' height="50%">
            <DateTimeContinuousAxis v-if='sensorName != "Water"' v-tkCartesianHorizontalAxis plotMode='OnTicks' labelFitMode='Rotate' majorStep="1"/>
            <DateTimeContinuousAxis v-else v-tkCartesianHorizontalAxis plotMode='OnTicks' labelFitMode='Rotate'/>
            <LinearAxis v-if=' sensorName=="Water"' v-tkCartesianVerticalAxis majorStep="1" maximum="1"/>
            <LinearAxis v-else v-tkCartesianVerticalAxis />
            <BarSeries v-if='sensorName=="Water"' v-tkCartesianSeries :items="sensorData" categoryProperty="timestamp" valueProperty="value" />
            <LineSeries v-else v-tkCartesianSeries :items="sensorData" categoryProperty="timestamp" valueProperty="value" />
        </RadCartesianChart>
    </FlexboxLayout>
  </Page>
</template>

<script >
import axios from 'axios';
import { mapState } from 'vuex'
import { ObservableArray } from "tns-core-modules/data/observable-array"
  export default {
    props: ['sensorName'],
    data() {
      return {
          sensorData: [],
          sensorSuffixes: {
              "Temperature": " °F",
              "Microphone": " units",
              "Water" : " water present"
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
        getSensorData() {
        
            const AuthStr = 'Bearer '.concat(this.token);
            axios.post('https://disaster-relief-backend.appspot.com/getsensor', {
                    sensor_name: this.sensorName
                },{ headers: { Authorization: AuthStr } }).then(response => {
                    // If request is good...
                    let sData = response.data;
                    sData.events.map(function(x) {
                        x.timestamp = new Date(x.timestamp)
                        
                    })
                    sData.events = sData.events.sort((a,b) => b.timestamp - a.timestamp)
                    this.sensorData = sData.events;
                })
                .catch((error) => {
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
