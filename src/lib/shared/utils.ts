import ColorHex from "@/models/ColorHex";

type RGB = { red: number, green: number, blue: number };

const toHex = (n: number) => n.toString(16).padStart(2, '0');

export function convertHSV(hue: number, sat: number, val: number): ColorHex {
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