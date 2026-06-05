import { defineConfig } from 'vite';
import react from '@vitejs/js-plugin-react'; // o el plugin que use tu app

export default defineConfig({
  base: '/luxpalette/', // <-- ¡ESTA LÍNEA ES EL ESCUDO QUE CURA LA PANTALLA BLANCA!
  plugins: [react()],
});
