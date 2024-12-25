import { UserWithPassword } from '@/types';
import axios from 'axios';
import { openDB, IDBPDatabase } from 'idb';

let db: IDBPDatabase | null = null;
  async function openDatabase() {
    if (db) return db; // singelton connect
    db = await openDB('image_storage', 1, {
        upgrade(db) {
            db.createObjectStore('images', { keyPath: 'id', autoIncrement: true });
        },
    });
    return db;
}

export default async function saveLocalImage(image: FileList | string | undefined){
    try {
        await openDatabase();
        if (!db) { throw new Error('Failed to open database');}

        let imageId: IDBValidKey | undefined = undefined;

        if (image){
            if (image instanceof FileList && image.length > 0) {
                const imageFile = image[0];
                const reader = new FileReader();
    
                const base64Image = await new Promise<string>((resolve, reject) => {
                    reader.onload = (event) => {
                        if (event.target && typeof event.target.result === 'string') {
                            resolve(event.target.result);
                        } else {
                            reject(new Error("Failed to read image"));
                        }
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(imageFile);
                });
    
                const tx = db.transaction('images', 'readwrite');
                const store = tx.objectStore('images');
                imageId = await store.add({ data: base64Image });
                await tx.done;
            } else if (typeof image === "string") {
                try {
                    const response = await axios.get(image, { responseType: 'blob' });
                    const blob = response.data;
                    const reader = new FileReader();
    
                    const base64Image = await new Promise<string>((resolve, reject) => {
                        reader.onload = (event) => {
                            if (event.target && typeof event.target.result === 'string') {
                                resolve(event.target.result);
                            } else {
                                reject(new Error("Failed to read image"));
                            }
                        };
                        reader.onerror = reject;
                        reader.readAsDataURL(blob);
                    });
    
                    const tx = db.transaction('images', 'readwrite');
                    const store = tx.objectStore('images');
                    imageId = await store.add({ data: base64Image });
                    await tx.done;
                } catch (error) {
                    console.error("Error downloading and saving image:", error);
                    throw error;
                }
            }
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}