<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { VerticalItem, ItemBase } from './types';

const props = defineProps<{
    schedule: ItemBase[],
    title: string
}>()

const items = ref<VerticalItem[]>([]);

const dayLayout = ref<VerticalItem[]>([
    { height: '', content: '0:00', top: '0%', capacity: 0, dateTime: '' },
    { height: '', content: '', top: '12.5%', capacity: 0, dateTime: '' },
    { height: '', content: '6:00', top: '25%', capacity: 0, dateTime: '' },
    { height: '', content: '', top: '37.5%', capacity: 0, dateTime: '' },
    { height: '', content: '12:00', top: '50%', capacity: 0, dateTime: '' },
    { height: '', content: '', top: '62.5%', capacity: 0, dateTime: '' },
    { height: '', content: '18:00', top: '75%', capacity: 0, dateTime: '' },
    { height: '', content: '', top: '87.5%', capacity: 0, dateTime: '' },
    { height: '', content: '', top: '99.7%', capacity: 0, dateTime: '' },
]);

const capacityColors: { [key: number]: string } = {
    0: 'repeating-linear-gradient(45deg,transparent,transparent 1px,#f0f0f099 1px,#f0f0f099 10px)'
};

onBeforeMount(() => {
    items.value = calculateItemsHeight(props.schedule);
    createCapacityColors(props.schedule);
});

function createCapacityColors(schedule: ItemBase[]): void {
    // Get unique capacities
    const capacities = Array.from(new Set(schedule.map(item => item.capacity)));
    // Create a color for each capacity
    capacities.forEach((capacity, index) => {
        if (!capacityColors[capacity]) {
            const color = `hsl(${index * 15}, 70%, 65%)`;
            capacityColors[capacity] = color;
        }
    });
}

function calculateItemsHeight(schedule: ItemBase[]): VerticalItem[] {
    const items = schedule as VerticalItem[];

    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        const date = new Date(item.dateTime);
        item.content = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
        const minutesFromMidnight = (date.getHours() * 60 + date.getMinutes()) | 0;
        item.top = `${((minutesFromMidnight / 1440) * 100).toFixed(0)}%`;
    }

    for (let i = 0; i < items.length - 1; i++) {
        const currentTop = parseInt(items[i].top!);
        const nextTop = parseInt(items[i + 1].top || '100');
        items[i].height = `${nextTop - currentTop}%`;
    }

    const lastIndex = props.schedule.length - 1;
    items[lastIndex].height = `calc(100% - ${items[lastIndex].top})`;

    return items;
}
</script>

<template>
    <div>
        <h3 style="margin-top: 3rem;">{{ title }}</h3>

        <div style="display: grid; grid-template-columns: .3fr 1fr; height: 100%;">

            <ul style="width: 100%; height: 100%; position: relative; list-style-type: none;">
                <li v-for="(item, index) in dayLayout" :key="index" style="position: absolute; width: 100%;"
                    :style="{ top: item.top, height: item.height }">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; height: 100%;">
                        <div
                            style="font-size: x-small; font-family: 'Courier New', Courier, monospace; transform: translateY(-5px); text-align: end; padding-right: .1rem;">
                            {{ item.content }}
                        </div>
                        <div style="border: dashed gray; border-width: 1px 0 0 0;">
                        </div>
                    </div>
                </li>
            </ul>
            <ul style="width: 100%; height: 100%; position: relative; list-style-type: none;">
                <li v-for="(item, index) in items" :key="index"
                    style="display: flex; justify-content: center; position: absolute; width: 100%; border: solid white; border-width: 1px 1px 1px 1px; border-radius: 4px; background-color: black;"
                    :style="{ background: capacityColors[item.capacity], top: item.top, height: item.height }">

                    <div id="cap" v-if="parseInt(item.height!.replace('%', '')) > 5"
                        style="color: aliceblue; font-size: small; font-family: 'Courier New', Courier, monospace; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: flex; align-items: center; justify-content: center;">
                        {{ item.capacity }}
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
#striped {
    background: repeating-linear-gradient(45deg,
            white,
            white 1px,
            #f0f0f0 1px,
            #f0f0f0 10px);
}
</style>
