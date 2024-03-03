<script lang="ts">
import { ref, onBeforeMount } from 'vue';

interface Item {
    dateTime: string;
    capacity: number;
    content?: string;
    left?: string;
    width?: string;
}

export default {
    setup() {
        const items = ref<Item[]>([
            { capacity: 0, dateTime: '2020-10-15T00:00:00.000+02:00' },
            { capacity: 10, dateTime: '2020-10-15T08:00:00.000+02:00' },
            { capacity: 5, dateTime: '2020-10-15T12:00:00.000+02:00' },
            { capacity: 10, dateTime: '2020-10-15T13:00:00.000+02:00' },
            { capacity: 0, dateTime: '2020-10-15T17:30:00.000+02:00' },
        ]);

        onBeforeMount(() => {
            for (let i = 0; i < items.value.length; i++) {
                let item = items.value[i];
                const date = new Date(item.dateTime);
                item.content = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
                const minutesFromMidnight = (date.getHours() * 60 + date.getMinutes()) || 0;
                item.left = `${((minutesFromMidnight / 1440) * 100).toFixed(0)}%`;
            }

            for (let i = 0; i < items.value.length - 1; i++) {
                const currentLeft = parseInt(items.value[i].left!);
                const nextLeft = parseInt(items.value[i + 1].left || '100');
                items.value[i].width = `${nextLeft - currentLeft}%`;
            }

            const lastIndex = items.value.length - 1;
            items.value[lastIndex].width = `calc(100% - ${items.value[lastIndex].left})`;
        });

        return { items };
    },
};
</script>

<template>
    <div>
        <h3>Horizontal</h3>

        <ul style="padding-top: 25px; width: 100%; position: relative; display: flex; list-style-type: none;">
            <li v-for="(item, index) in items" :key="index"
                style="position: absolute; border: solid red; border-width: 0px 1px 1px 2px;"
                :style="{ left: item.left, width: item.width }">
                <div style="font-size: small; font-family: 'Courier New', Courier, monospace;"
                    :style="{ transform: index % 2 != 0 ? 'translateY(20px)' : 'translateY(-20px)' }">
                    {{ item.content }}
                </div>
            </li>
        </ul>
        <!-- <div style="text-align: center; font-style: italic;">{{ item.capacity }}</div> -->
    </div>
</template>
