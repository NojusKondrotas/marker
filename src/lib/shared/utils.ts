import ColorHex from "@/models/ColorHex";

type RGB = { red: number, green: number, blue: number };

const toHex = (n: number) => n.toString(16).padStart(2, '0');

export function isValidColorHex(hex: string): boolean {
    if (hex.length != 6)
        return false;

    const r = hex.slice(0, 2).toUpperCase();
    const g = hex.slice(2, 4).toUpperCase();
    const b = hex.slice(4, 6).toUpperCase();

    if (((r[0] < '0' || r[0] > '9') && (r[0] < 'A' || r[0] > 'F'))
        || ((r[1] < '0' || r[1] > '9') && (r[1] < 'A' || r[1] > 'F')))
        return false;
    if (((g[0] < '0' || g[0] > '9') && (g[0] < 'A' || g[0] > 'F'))
        || ((g[1] < '0' || g[1] > '9') && (g[1] < 'A' || g[1] > 'F')))
        return false;
    if (((b[0] < '0' || b[0] > '9') && (b[0] < 'A' || b[0] > 'F'))
        || ((b[1] < '0' || b[1] > '9') && (b[1] < 'A' || b[1] > 'F')))
        return false;

    return true;
}

export function hexToHSV(hex: string): { hue: number, sat: number, val: number } {
    if (!isValidColorHex(hex))
        return { hue: -1, sat: -1, val : -1 };

    const int = parseInt(hex, 16);
    const r = ((int >> 16) & 255) / 255;
    const g = ((int >> 8) & 255) / 255;
    const b = (int & 255) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let hue = 0;
    if (delta !== 0) {
        if (max === r) hue = 60 * (((g - b) / delta) % 6);
        else if (max === g) hue = 60 * ((b - r) / delta + 2);
        else hue = 60 * ((r - g) / delta + 4);
    }
    if (hue < 0) hue += 360;

    return { hue, sat: max === 0 ? 0 : delta / max, val: max };
}

export function hsvToHex(hue: number, sat: number, val: number): ColorHex {
    if (hue < 0 || hue > 360
        || sat < 0 || sat > 1
        || val < 0 || val > 1
    ) {
        return new ColorHex('f25004');
    }

    const C = sat * val;
    const X = C * (1 - Math.abs((hue / 60) % 2 - 1));
    const m = val - C;

    let hex!: RGB;
    const sector = Math.floor(hue / 60) % 6;
    switch(sector) {
        case 0:
            hex = { red: C, green: X, blue: 0 };
            break;
        case 1:
            hex = { red: X, green: C, blue: 0 };
            break;
        case 2:
            hex = { red: 0, green: C, blue: X };
            break;
        case 3:
            hex = { red: 0, green: X, blue: C };
            break;
        case 4:
            hex = { red: X, green: 0, blue: C };
            break;
        case 5:
            hex = { red: C, green: 0, blue: X };
            break;
    }

    hex.red = Math.round((hex.red + m) * 255);
    hex.green = Math.round((hex.green + m) * 255);
    hex.blue = Math.round((hex.blue + m) * 255);

    return new ColorHex(toHex(hex.red) + toHex(hex.green) + toHex(hex.blue));
}