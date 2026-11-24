import { defineConfig } from 'astro/config';
import app from './src/app.mjs';
export default defineConfig({ site: app.url, trailingSlash: 'always', build: { format: 'directory' } });
