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

export const getMenu = (layer: MenuLayers) => openMenus.get(layer);
export const isMenuRegistered = (layer: MenuLayers) => openMenus.has(layer);

export function unregisterMenu(layer: MenuLayers) {
    openMenus.delete(layer);
}

export function unregisterAllMenus() {
    openMenus.clear();
}