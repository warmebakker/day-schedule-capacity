<script lang="ts">
const getCapacityColorFallback = (capacity: number) => {
    if (capacity === 0) return 'repeating-linear-gradient(45deg,transparent,transparent 1px,#f0f0f099 1px,#f0f0f099 10px)'
    return capacity % 2 === 0 ? 'gray' : 'lightgray';
}
export default {}
</script>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';

export interface ItemBase {
    dateTime: string;
    capacity: number;
    content?: string;
};

interface BlockItem extends ItemBase {
    height?: string;
};

const props = withDefaults(defineProps<{
    schedule: ItemBase[],
    title?: string,
    showYaxis?: boolean,
    showYaxisTimes?: boolean,
    getCapacityColor?: (capacity: number) => string
}>(), {
    showYaxis: true,
    showYaxisTimes: true,
    getCapacityColor: (capacity: number) => getCapacityColorFallback(capacity)
});

const items = ref<BlockItem[]>([]);

const dayScafold = ref<BlockItem[]>([
    { content: '0:00', capacity: 0, dateTime: '' },
    { content: ' ', capacity: 0, dateTime: '' },
    { content: '6:00', capacity: 0, dateTime: '' },
    { content: ' ', capacity: 0, dateTime: '' },
    { content: '12:00', capacity: 0, dateTime: '' },
    { content: ' ', capacity: 0, dateTime: '' },
    { content: '18:00', capacity: 0, dateTime: '' },
    { content: ' ', capacity: 0, dateTime: '' },
]);

onBeforeMount(() => {
    // if the first item fom props.schedule is not time 0:00, add it
    var firstItem = new Date(props.schedule[0].dateTime);
    if (firstItem.getHours() + firstItem.getMinutes() !== 0) {
        firstItem.setHours(0);
        firstItem.setMinutes(0);
        props.schedule.unshift({ capacity: 0, dateTime: firstItem.toLocaleString() });
    }

    // check if props.schedule ends at 23:59, if not add it temporarily for calculation
    var lastItem = new Date(props.schedule[props.schedule.length - 1].dateTime);
    if (lastItem.getHours() + lastItem.getMinutes() !== 1439) {
        lastItem.setHours(23);
        lastItem.setMinutes(59);
        props.schedule.push({ capacity: 0, dateTime: lastItem.toLocaleString() });
    }

    items.value = calculateItemsHeight(props.schedule);

    // remove last item which is temporarily
    items.value.pop();
});

const calculateItemsHeight = (schedule: ItemBase[]): BlockItem[] => {
    const items = schedule as BlockItem[];
    const scheduleStartsAtMinutes: { [key: number]: number } = {};

    // format content to time and set minutes marker
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const date = new Date(item.dateTime);
        item.content = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
        scheduleStartsAtMinutes[i] = (date.getHours() * 60 + date.getMinutes()) | 0;
    }

    // height is the percentage of the day
    for (let i = 0; i < items.length - 1; i++) {
        items[i].height = `${((scheduleStartsAtMinutes[i + 1] - scheduleStartsAtMinutes[i]) / 1440 * 100).toFixed(2)}%`;
    }

    return items;
}

const handleTouchStart = (event: any) => {
    const target = event.currentTarget;
    target.classList.add('touchhover');
    setTimeout(() => { target.classList.remove('touchhover') }, 1500);
};
</script>

<template>
    <div class="container">
        <p style="text-align: center;">
            {{ title || `${new Date(items[0].dateTime).getDay()}-${new Date(items[0].dateTime).getMonth()}` }}
        </p>
        <div class="vertical-container">
            <div v-if="props.showYaxisTimes" class="y-axis">
                <div class="time" v-for="( item, index ) in dayScafold " :key="index">
                    {{ item.content }}
                </div>
            </div>
            <div class="relative-w-6">
                <div v-if="showYaxis" class="y-axis absolute-full-w">
                    <div class="axis-line" v-for="( _ ) in dayScafold"></div>
                </div>
                <div class="stacked-blocks absolute-full-w">
                    <div v-for="( item, index ) in  items " :key="index" :style="{ height: item.height }"
                        v-tooltip="{ value: `Vanaf ${item.content} uur\nCapaciteit ${item.capacity}`, autoHide: false, showDelay: 300 }">
                        <div class="block" :style="{ background: getCapacityColor(item.capacity) }" @touchstart="handleTouchStart">
                            <div class="capacitynumber" v-if="item.capacity > 0 && parseInt(item.height!.replace('%', '')) > 5">
                                {{ item.capacity }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
div {
    height: 100%;
    width: 100%;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.vertical-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: nowrap;
}

.y-axis {
    width: auto;
    min-width: 3.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.axis-line {
    border-top: solid #ccc 1px;
    transform: scaleX(1.2);
}

.time {
    opacity: 0.5;
    width: auto;
    padding-right: 1rem;
    display: flex;
    justify-content: end;
    transform: translateY(-5px);
    overflow: hidden;
    font-size: x-small;
    font-family: 'Courier New', Courier, monospace;
    text-wrap: nowrap;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.relative-w-6 {
    position: relative;
    width: 6rem;
}

.absolute-full-w {
    position: absolute;
    width: 100%;
}

.stacked-blocks {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
}

.block {
    border-radius: .4rem;
    transition: transform 0.1s ease-in, box-shadow 0.1s ease-in;
}

.block:hover {
    transform: scale(1.1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.block.touchhover {
    transform: scale(1.1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.capacitynumber {
    color: white;
    font-size: smaller;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
}
</style>
