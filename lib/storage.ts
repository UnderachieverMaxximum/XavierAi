// lib/storage.ts

/**
 * IndexedDB Wrapper for Offline Storage and Caching
 */

class IndexedDBWrapper {
    private dbName: string;
    private storeName: string;
    private db: IDBDatabase | null = null;

    constructor(dbName: string, storeName: string) {
        this.dbName = dbName;
        this.storeName = storeName;
        this.init();
    }

    private async init() {
        return new Promise<void>((resolve, reject) => {
            const request = indexedDB.open(this.dbName);

            request.onsuccess = (event) => {
                this.db = (event.target as IDBOpenDBRequest).result;
                resolve();
            };
            request.onerror = (event) => {
                reject((event.target as IDBOpenDBRequest).error);
            };
            request.onupgradeneeded = (event) => {
                this.db = (event.target as IDBOpenDBRequest).result;
                if (!this.db.objectStoreNames.contains(this.storeName)) {
                    this.db.createObjectStore(this.storeName);
                }
            };
        });
    }

    public async setItem(key: string, value: any): Promise<void> {
        if (!this.db) await this.init();
        const transaction = this.db!.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);
        store.put(value, key);
    }

    public async getItem(key: string): Promise<any> {
        if (!this.db) await this.init();
        const transaction = this.db!.transaction([this.storeName], 'readonly');
        const store = transaction.objectStore(this.storeName);
        const request = store.get(key);
        return new Promise((resolve, reject) => {
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    public async removeItem(key: string): Promise<void> {
        if (!this.db) await this.init();
        const transaction = this.db!.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);
        store.delete(key);
    }

    public async clear(): Promise<void> {
        if (!this.db) await this.init();
        const transaction = this.db!.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);
        store.clear();
    }
}

export default IndexedDBWrapper;
