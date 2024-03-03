<script setup lang="ts">
import { ItemBase } from './components/types';
import horizontal from './components/horizontalDayCapacity.vue';
import vertical from './components/verticalDayCapacity.vue';
import { ref } from "vue";

const dayCapacityScheme = ref<ItemBase[]>([
    { capacity: 0, dateTime: '2020-10-15T00:00:00.000+02:00' },
    { capacity: 10, dateTime: '2020-10-15T08:00:00.000+02:00' },
    { capacity: 0, dateTime: '2020-10-15T12:00:00.000+02:00' },
    { capacity: 12, dateTime: '2020-10-15T13:00:00.000+02:00' },
    { capacity: 0, dateTime: '2020-10-15T17:30:00.000+02:00' },
]);
</script>

<template>
    <div class="card">
        <vertical title="Vertical" :schedule="dayCapacityScheme"
            style="margin-top: 5rem; max-width: 10rem; height: 20rem;" />
    </div>

    <div class="card">
        <horizontal style="margin-top: 5rem;" />
    </div>
</template>

<style scoped></style>