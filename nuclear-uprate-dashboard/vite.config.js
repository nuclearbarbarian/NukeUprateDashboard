import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/NukeUprateDashboard/',
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric'})),
  },
})
