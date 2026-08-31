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