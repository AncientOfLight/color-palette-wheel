import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev
export default defineConfig({
  base: '/luxpalette/', // <-- ¡ESTO LE DICE A GITHUB DÓNDE ESTÁ TU DISEÑO OSCURO!
  plugins: [react()],
});
