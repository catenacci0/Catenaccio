// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

// Determine if we're building for GitHub Pages or custom domain
const isGitHubPages = process.env.GITHUB_PAGES === 'true' || process.env.CI;
const baseUrl = isGitHubPages ? '/y' : '';

// https://astro.build/config
export default defineConfig({
	site: isGitHubPages ? 'https://keyserdsoze.github.io' : 'https://catenaccio.net',
	base: baseUrl,
	integrations: [mdx(), sitemap(), tailwind()],
	build: {
		assets: '_astro'
	}
});
