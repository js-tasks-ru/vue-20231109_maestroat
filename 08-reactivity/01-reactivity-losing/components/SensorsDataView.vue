<template>
  <div v-if="!sensors">Loading...</div>
  <template v-else>
    <SensorsDataRow v-for="sensor in sensors" :key="sensor.id" :sensor="sensor" />
  </template>
</template>

<script>
import { SensorsDataController } from '../services/SensorsDataController';
import { SensorsDataStreamingService } from '../services/SensorsDataStreamingService';
import SensorsDataRow from './SensorsDataRow';
import { ref, reactive } from 'vue';

export default {
  name: 'SensorsDataView',

  components: { SensorsDataRow },

  data() {
    return {
      sensors: null,
    };
  },

  mounted() {
    this.sensorsDataController = new SensorsDataController(new SensorsDataStreamingService());
    this.sensorsDataController.addDataCallback(this.callback);

    // Раз в секунду запрашиваем и выводим новые данные сенсоров
    setInterval(() => {
      this.sensorsDataController.getData();
      // console.log(this.sensorsDataController.getData())
    }, 1000);
  },
  beforeUnmount() {
    this.sensorsDataController.removeDataCallback(this.callback);
    this.sensorsDataController.close();
  },

  methods: {
    callback(data) {
      this.setData(data);
    },

    setData(sensors) {
      let sensors2 = {};
      for (let sensor in sensors) {
        sensors2[sensor] = {'id': sensors[sensor].id, 'label': sensors[sensor].label, 'value': sensors[sensor].value, 'unit': sensors[sensor].unit };
      }
      this.sensors = sensors2
    },
  },
};
</script>

<style scoped></style>
