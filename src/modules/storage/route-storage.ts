import { getDB } from './db';
import type { Route } from '@/shared/types';

export const routeStorage = {
  // Сохранить новый маршрут или обновить существующий
  async save(route: Route): Promise<void> {
    const db = await getDB();

    await db.put('routes', route);
  },

  // Получить маршрут по UUID
  async getById(uuid: string): Promise<Route | undefined> {
    const db = await getDB();

    return db.get('routes', uuid);
  },

  // Получить все маршруты
  async getAll(): Promise<Route[]> {
    const db = await getDB();

    return db.getAll('routes');
  },

  // Удалить маршрут
  async delete(uuid: string): Promise<void> {
    const db = await getDB();

    await db.delete('routes', uuid);
  },
};
