
import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import type { Route } from "@/shared/types";

interface NavigatorDB extends DBSchema {
  routes: {
    key: string;
    value: Route;
    indexes: {
      "by-updated-at": string;
    };
  };
}

let dbPromise: Promise<IDBPDatabase<NavigatorDB>> | null = null;

export const getDB = () => {
  if (!dbPromise) {
    dbPromise = openDB<NavigatorDB>("navigator-db", 1, {
      upgrade(db) {
        const store = db.createObjectStore("routes", {
          keyPath: "uuid",
        });

        store.createIndex("by-updated-at", "updatedAt");
      },
    });
  }

  return dbPromise;
};
