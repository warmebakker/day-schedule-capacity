<script setup lang="ts">
import { ItemBase } from './components/types';
import vertical from './components/verticalDayCapacity.vue';
import { ref } from "vue";

const dayCapacityScheme0 = ref<ItemBase[]>([
    { capacity: 16, dateTime: '2020-10-14T07:00:00.000+02:00' },
    { capacity: 0, dateTime: '2020-10-14T18:00:00.000+02:00' },
]);

const dayCapacityScheme = ref<ItemBase[]>([
    { capacity: 10, dateTime: '2020-10-15T08:00:00.000+02:00' },
    { capacity: 5, dateTime: '2020-10-15T12:00:00.000+02:00' },
    { capacity: 12, dateTime: '2020-10-15T13:00:00.000+02:00' },
    { capacity: 0, dateTime: '2020-10-15T17:30:00.000+02:00' },
]);


const dayCapacityScheme2 = ref<ItemBase[]>([
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
        <vertical class="vertical" :schedule="dayCapacityScheme0" />
        <vertical class="vertical" :schedule="dayCapacityScheme" />
        <vertical class="vertical" :schedule="dayCapacityScheme2" />
    </div>
</template>

<style scoped>
.vertical {
    max-width: 10rem;
    height: 20rem;
}
</style>