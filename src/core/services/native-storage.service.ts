import { Preferences } from '@capacitor/preferences';
import { IStorageService } from './storage.interface';

export class NativeStorageService implements IStorageService {
  
  // Guarda un dato en el almacenamiento nativo del teléfono
  async set(key: string, value: string): Promise<void> {
    try {
      await Preferences.set({ key, value });
      console.log(`[BRIDGE → Nativo] Guardado: ${key} = ${value}`);
    } catch (error) {
      console.error('Error en el puente nativo al guardar:', error);
      throw error;
    }
  }

  // Recupera un dato del almacenamiento nativo
  async get(key: string): Promise<string | null> {
    try {
      const { value } = await Preferences.get({ key });
      console.log(`[BRIDGE ← Nativo] Leído: ${key} = ${value}`);
      return value || null;
    } catch (error) {
      console.error('Error en el puente nativo al leer:', error);
      return null;
    }
  }

  // Elimina un dato del almacenamiento nativo
  async remove(key: string): Promise<void> {
    try {
      await Preferences.remove({ key });
      console.log(`[BRIDGE → Nativo] Eliminado: ${key}`);
    } catch (error) {
      console.error('Error al eliminar del almacenamiento nativo:', error);
      throw error;
    }
  }
}