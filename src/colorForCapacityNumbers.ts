// A dictionary of colors for each capacity number
export const capacityColors: { [key: number]: string } = {
    0: 'repeating-linear-gradient(45deg,transparent,transparent 1px,#f0f0f099 1px,#f0f0f099 10px)'
};

export const createCapacityColors = (schedule: number[]): void => {
    // Get unique capacities and sort them
    const capacities = Array.from(new Set(schedule.map(item => item)))
        .sort((a, b) => a - b);

    // Create a color for each capacity
    capacities.forEach((capacity, index) => {
        if (!capacityColors[capacity]) {
            const color = `hsl(${index * 9}, 60%, 55%)`;
            capacityColors[capacity] = color;
        }
    });
}