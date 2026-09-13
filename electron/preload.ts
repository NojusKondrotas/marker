import { contextBridge } from 'electron';

const api = {
};

contextBridge.exposeInMainWorld('api', api);

export type ElectronApi = typeof api;