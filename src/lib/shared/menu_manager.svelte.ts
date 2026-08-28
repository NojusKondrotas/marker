import { SvelteMap } from "svelte/reactivity";

export enum MenuLayers {
    NoteMenu,
}

const openMenus: SvelteMap<MenuLayers, string> = new SvelteMap();

export function registerMenu(layer: MenuLayers, menu: string): void {
    if (openMenus.has(layer))
        return;

    openMenus.set(layer, menu);
}

export const isMenuRegistered = (layer: MenuLayers, id: string) => openMenus.get(layer) === id;

export function unregisterMenu(layer: MenuLayers) {
    openMenus.delete(layer);
}

export function unregisterAllMenus() {
    openMenus.clear();
}