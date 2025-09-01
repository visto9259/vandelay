import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {vitePluginVersionMark} from "vite-plugin-version-mark";

// https://vite.dev/config/
export default defineConfig(({mode}) => {
    return {
        plugins: [
            react(),
            vitePluginVersionMark({
                ifGlobal: true,
                command: mode === 'development' ? "git branch --show-current" : "git describe --tags --abbrev=0"
            })
        ],
        build: {
            manifest: true,
            rollupOptions: {
                input: [
                    'src/main.jsx',
                ],
            },
            outDir: '../public/dist',
        }
    }
})
