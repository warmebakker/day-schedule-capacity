<script setup lang="ts">
import daySchedule, { ItemBase } from './components/DaySchedule.vue';
import { ref } from "vue";

const dayCapacitySchemeMon = ref<ItemBase[]>([
    { capacity: 16, dateTime: '2024-10-14T06:00:00.000+02:00' },
    { capacity: 0, dateTime: '2024-10-14T18:00:00.000+02:00' },
]);

const dayCapacitySchemeTue = ref<ItemBase[]>([
    { capacity: 10, dateTime: '2024-10-15T08:00:00.000+02:00' },
    { capacity: 5, dateTime: '2024-10-15T12:00:00.000+02:00' },
    { capacity: 4, dateTime: '2024-10-15T12:15:00.000+02:00' },
    { capacity: 5, dateTime: '2024-10-15T12:45:00.000+02:00' },
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
    <div class="card">
        <daySchedule class="w-20" title="Ma" :schedule="dayCapacitySchemeMon" />
        <daySchedule class="w-20" title="Di" :schedule="dayCapacitySchemeTue" :show-yaxis-times=false />
        <daySchedule class="w-20" title="Wo" :schedule="dayCapacitySchemeWed" :show-yaxis-times=false />
        <daySchedule class="w-20" title="Do" :schedule="dayCapacitySchemeTue" :show-yaxis-times=false />
        <daySchedule class="w-20" title="Vr" :schedule="dayCapacitySchemeWed" :show-yaxis-times=false />
        <daySchedule class="w-20" title="Za" :schedule="dayCapacitySchemeTue" :show-yaxis-times=true />
        <daySchedule class="w-20" title="Zo" :schedule="dayCapacitySchemeMon" :show-yaxis-times=false />
    </div>
</template>

<style scoped>
.card {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    align-items: baseline;
    justify-content: center;
    gap: 1.5rem;
}

.w-20 {
    width: auto;
    height: 20rem;
}
</style>./components/DaySchedule.vue