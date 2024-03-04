<script setup lang="ts">
import vertical, { ItemBase } from './components/verticalDayCapacity.vue';
import { ref } from "vue";

const dayCapacitySchemeMon = ref<ItemBase[]>([
    { capacity: 16, dateTime: '2024-10-14T07:00:00.000+02:00' },
    { capacity: 0, dateTime: '2024-10-14T18:00:00.000+02:00' },
]);

const dayCapacitySchemeTue = ref<ItemBase[]>([
    { capacity: 10, dateTime: '2024-10-15T08:00:00.000+02:00' },
    { capacity: 5, dateTime: '2024-10-15T12:00:00.000+02:00' },
    { capacity: 12, dateTime: '2024-10-15T13:00:00.000+02:00' },
    { capacity: 0, dateTime: '2024-10-15T17:30:00.000+02:00' },
]);


const dayCapacitySchemeWed = ref<ItemBase[]>([
    { capacity: 100, dateTime: '2024-10-16T04:30:00.000+02:00' },
    { capacity: 10, dateTime: '2024-10-16T08:00:00.000+02:00' },
    { capacity: 5, dateTime: '2024-10-16T12:00:00.000+02:00' },
    { capacity: 12, dateTime: '2024-10-16T13:00:00.000+02:00' },
    { capacity: 5, dateTime: '2024-10-16T17:30:00.000+02:00' },
    { capacity: 0, dateTime: '2024-10-16T22:30:00.000+02:00' },
]);
</script>

<template>
    <div class="card" style="display: flex; justify-content: center; height: 20rem;">
        <vertical class="vertical" :schedule="dayCapacitySchemeMon" />
        <vertical class="vertical" :schedule="dayCapacitySchemeTue" :show-yaxis=true />
        <vertical class="vertical" :schedule="dayCapacitySchemeWed" :show-yaxis-times=true />
    </div>
</template>

<style scoped>
.vertical {
    max-width: 10rem;
}
</style>