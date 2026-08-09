function isValidColorHex(hex: string): boolean {
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

export default class ColorHex {
    hex: string;
    
    constructor(hex: string) {
        this.hex = hex;

        if (!isValidColorHex(this.hex)) {
            this.hex = "ffffff";
        }
    }

    toString() {
        return '#' + this.hex;
    }
}