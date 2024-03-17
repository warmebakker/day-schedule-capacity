<script setup lang="ts">
import daySchedule, { ItemBase } from './components/DaySchedule.vue';
import { onBeforeMount } from 'vue';
import { createCapacityColors, getColorForCapacity } from './colorForCapacityNumbers';

const days: { [key: string]: ItemBase[] } = {
    'Ma': [
        { capacity: 10, dateTime: '2024-10-14T06:00:00.000+02:00' },
        { capacity: 0, dateTime: '2024-10-14T18:00:00.000+02:00' },
    ],
    'Di': [
        { capacity: 10, dateTime: '2024-10-15T08:00:00.000+02:00' },
        { capacity: 5, dateTime: '2024-10-15T12:00:00.000+02:00' },
        { capacity: 1, dateTime: '2024-10-15T12:15:00.000+02:00' },
        { capacity: 3, dateTime: '2024-10-15T12:45:00.000+02:00' },
        { capacity: 4, dateTime: '2024-10-15T13:00:00.000+02:00' },
        { capacity: 0, dateTime: '2024-10-15T17:30:00.000+02:00' },
    ],
    'Wo': [
        { capacity: 211, dateTime: '2024-10-16T04:30:00.000+02:00' },
        { capacity: 210, dateTime: '2024-10-16T08:00:00.000+02:00' },
        { capacity: 213, dateTime: '2024-10-16T12:00:00.000+02:00' },
        { capacity: 212, dateTime: '2024-10-16T13:00:00.000+02:00' },
        { capacity: 25, dateTime: '2024-10-16T17:30:00.000+02:00' },
        { capacity: 0, dateTime: '2024-10-16T22:30:00.000+02:00' },
    ],
    'Do': [
        { capacity: 26, dateTime: '2024-10-14T04:00:00.000+02:00' },
        { capacity: 0, dateTime: '2024-10-14T19:30:00.000+02:00' },
    ],
    'Vr': [
        { capacity: 100, dateTime: '2024-10-16T04:30:00.000+02:00' },
        { capacity: 10, dateTime: '2024-10-16T08:00:00.000+02:00' },
        { capacity: 5, dateTime: '2024-10-16T12:00:00.000+02:00' },
        { capacity: 12, dateTime: '2024-10-16T13:00:00.000+02:00' },
        { capacity: 5, dateTime: '2024-10-16T17:30:00.000+02:00' },
        { capacity: 0, dateTime: '2024-10-16T22:30:00.000+02:00' },
    ],
    'Za': [
        { capacity: 7, dateTime: '2024-10-14T06:00:00.000+02:00' },
        { capacity: 0, dateTime: '2024-10-14T18:00:00.000+02:00' },
    ],
    'Zo': [
        { capacity: 7, dateTime: '2024-10-14T06:00:00.000+02:00' },
        { capacity: 0, dateTime: '2024-10-14T18:00:00.000+02:00' },
    ],
};

onBeforeMount(() => {
    createCapacityColors(Object.values(days)
        .flatMap(day => day.map(item => item.capacity)));
});
</script>

<template>
    <div class="card">
        <daySchedule v-for="(value, key, index) in days" :key="key" class="w-20" :title="key as string" :schedule="value" :show-yaxis-times="index === 0 || index === 5"
            :get-capacity-colors="getColorForCapacity" />
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
</style>