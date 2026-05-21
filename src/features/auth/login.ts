import { NativeStorageService } from '../../core/services/native-storage.service';

const storage = new NativeStorageService();

async function checkUserSession(): Promise<void> {
  const token = await storage.get('auth_token');

  if (token) {
    console.log('✅ Usuario autenticado, redirigiendo al inicio...');
  } else {
    console.log('🔐 Sesión limpia. Mostrar pantalla de Login.');
  }
}

async function loginUser(email: string, password: string): Promise<void> {
  console.log(`\n--- Intentando login con: ${email} ---`);

  const fakeToken = `token_${Date.now()}`;

  await storage.set('auth_token', fakeToken);
  console.log('💾 Token guardado en almacenamiento nativo.');

  await checkUserSession();
}

async function logoutUser(): Promise<void> {
  console.log('\n--- Cerrando sesión ---');
  await storage.remove('auth_token');
  console.log('🗑️  Token eliminado del almacenamiento nativo.');
  await checkUserSession();
}

(async () => {
  console.log('=== PRÁCTICA: ARQUITECTURA DE APPS HÍBRIDAS ===\n');

  console.log('1. Verificando sesión inicial (sin token)...');
  await checkUserSession();

  console.log('\n2. Simulando inicio de sesión...');
  await loginUser('estudiante@yavirac.edu.ec', '12345');

  console.log('\n3. Simulando cierre de sesión...');
  await logoutUser();
})();