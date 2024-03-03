<script setup lang="ts">
import { ItemBase } from './components/types';
import horizontal from './components/horizontalDayCapacity.vue';
import vertical from './components/verticalDayCapacity.vue';
import { ref } from "vue";

const dayCapacityScheme0 = ref<ItemBase[]>([
    { capacity: 16, dateTime: '2020-10-14T07:00:00.000+02:00' },
    { capacity: 0, dateTime: '2020-10-14T18:00:00.000+02:00' },
]);

const dayCapacityScheme = ref<ItemBase[]>([
    { capacity: 0, dateTime: '2020-10-15T00:00:00.000+02:00' },
    { capacity: 10, dateTime: '2020-10-15T08:00:00.000+02:00' },
    { capacity: 5, dateTime: '2020-10-15T12:00:00.000+02:00' },
    { capacity: 12, dateTime: '2020-10-15T13:00:00.000+02:00' },
    { capacity: 0, dateTime: '2020-10-15T17:30:00.000+02:00' },
]);


const dayCapacityScheme2 = ref<ItemBase[]>([
    { capacity: 0, dateTime: '2020-10-16T00:00:00.000+02:00' },
    { capacity: 100, dateTime: '2020-10-16T04:30:00.000+02:00' },
    { capacity: 10, dateTime: '2020-10-16T08:00:00.000+02:00' },
    { capacity: 5, dateTime: '2020-10-16T12:00:00.000+02:00' },
    { capacity: 12, dateTime: '2020-10-16T13:00:00.000+02:00' },
    { capacity: 5, dateTime: '2020-10-16T17:30:00.000+02:00' },
    { capacity: 0, dateTime: '2020-10-16T22:30:00.000+02:00' },
]);
</script>

<template>
    <div class="card" style="display: flex; justify-content: center;">
        <vertical :title="new Date(dayCapacityScheme0[0].dateTime).toDateString()" :schedule="dayCapacityScheme0"
            style="margin-top: 5rem; max-width: 10rem; height: 20rem;" />
        <vertical :title="new Date(dayCapacityScheme[0].dateTime).toDateString()" :schedule="dayCapacityScheme"
            style="margin-top: 5rem; max-width: 10rem; height: 20rem;" />
        <vertical :title="new Date(dayCapacityScheme2[0].dateTime).toDateString()" :schedule="dayCapacityScheme2"
            style="margin-top: 5rem; max-width: 10rem; height: 20rem;" />
    </div>
    <!-- 
    <div class="card">
        <horizontal style="margin-top: 5rem;" />
    </div> -->
</template>

<style scoped></style>