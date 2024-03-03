interface VerticalItem extends ItemBase {
    top?: string;
    height?: string;
};

interface HorizontalItem extends ItemBase {
    left?: string;
    width?: string;
};

interface ItemBase {
    dateTime: string;
    capacity: number;
    content?: string;
};

export type { VerticalItem, HorizontalItem, ItemBase };
