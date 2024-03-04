<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';

export interface ItemBase {
    dateTime: string;
    capacity: number;
    content?: string;
};

interface VerticalItem extends ItemBase {
    top?: string;
    height?: string;
};

const props = withDefaults(defineProps<{
    schedule: ItemBase[],
    title?: string,
    showYaxis?: boolean,
    showYaxisTimes?: boolean,
}>(), {
    showYaxis: true,
    showYaxisTimes: true
});

const items = ref<VerticalItem[]>([]);

const dayScafold = ref<VerticalItem[]>([
    { height: '', content: '0:00', top: '0%', capacity: 0, dateTime: '' },
    { height: '', content: '', top: '12.5%', capacity: 0, dateTime: '' },
    { height: '', content: '6:00', top: '25%', capacity: 0, dateTime: '' },
    { height: '', content: '', top: '37.5%', capacity: 0, dateTime: '' },
    { height: '', content: '12:00', top: '50%', capacity: 0, dateTime: '' },
    { height: '', content: '', top: '62.5%', capacity: 0, dateTime: '' },
    { height: '', content: '18:00', top: '75%', capacity: 0, dateTime: '' },
    { height: '', content: '', top: '87.5%', capacity: 0, dateTime: '' },
    { height: '', content: '23:59', top: '99.7%', capacity: 0, dateTime: '' },
]);

const capacityColors: { [key: number]: string } = {
    0: 'repeating-linear-gradient(45deg,transparent,transparent 1px,#f0f0f099 1px,#f0f0f099 10px)'
};

onBeforeMount(() => {
    // if the first item fom props.schedule is not time 0:00, add a 0:00 item
    var firstItem = new Date(props.schedule[0].dateTime);
    if (firstItem.getHours() !== 0 || firstItem.getMinutes() !== 0) {
        firstItem.setHours(0);
        firstItem.setMinutes(0);
        props.schedule.unshift({ capacity: 0, dateTime: firstItem.toLocaleString() });
    }
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
        <p style="text-decoration: underline; text-align: center;">{{ title || new
            Date(items[0].dateTime).toDateString() }}</p>

        <div style="position: relative">
            <div v-if="props.showYaxis" class="grid-container">
                <div v-if="props.showYaxisTimes" style="grid-column: 1;">
                    <ul>
                        <li v-for="(item, index) in dayScafold" :key="index"
                            :style="{ top: item.top, height: item.height }">
                            <div
                                style="text-wrap: nowrap; white-space: nowrap; font-size: x-small; font-family: 'Courier New', Courier, monospace; transform: translateY(-5px); text-align: end;overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                                {{ item.content }}
                            </div>
                        </li>
                    </ul>
                </div>
                <div style="grid-column: 2 / span 2;">
                    <ul style="transform: translateX(-5px);">
                        <li v-for="(item, index) in dayScafold" :key="index"
                            :style="{ top: item.top, height: item.height }">
                            <div style="border: dashed black 1px; opacity: .3;"></div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="grid-container">
                <ul style="grid-column: 2;">
                    <li v-for="(item, index) in items" :key="index"
                        style="display: flex; justify-content: center; border: dashed transparent; border-width: 1px 1px 1px 1px;"
                        :style="{ top: item.top, height: item.height }"
                        v-tooltip="{ value: `Vanaf ${item.content} uur\nCapaciteit ${item.capacity}`, autoHide: false }">

                        <div id="inner" style="display: flex; justify-content: center; border-radius: 4px;"
                            :style="{ background: capacityColors[item.capacity] }">

                            <div id="cap" v-if="item.capacity > 0 && parseInt(item.height!.replace('%', '')) > 5"
                                style="color: white; font-size: large; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: flex; align-items: center; justify-content: center;">
                                {{ item.capacity }}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
div {
    height: 100%;
    width: 100%;
}

ul {
    position: relative;
    padding: 0;
    margin: 0;
    list-style-type: none;
    width: 100%;
    height: 100%;
}

li {
    position: absolute;
    width: 100%;
    transition: transform 0.1s ease-in;
}

li:hover {
    transform: scale(1.05);
}

.grid-container {
    position: absolute;
    display: grid;
    grid-template-columns: 1.4fr 4fr .1fr;
    gap: .5rem;
}
</style>
