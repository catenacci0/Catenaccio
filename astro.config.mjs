// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import { readFileSync, existsSync } from 'fs';

// Determine deployment configuration
// Check for custom domain in CNAME file or environment variables
let siteUrl = 'https://catenaccio.net';
let baseUrl = '';

// Check if CNAME file exists (for custom domain)
if (existsSync('./public/CNAME')) {
	try {
		const customDomain = readFileSync('./public/CNAME', 'utf-8').trim();
		if (customDomain) {
			siteUrl = `https://${customDomain}`;
			baseUrl = '';
			console.log(`Using custom domain from CNAME: ${customDomain}`);
		}
	} catch (error) {
		console.warn('Could not read CNAME file:', error);
	}
}

// Override with environment variables if provided (from GitHub Actions)
if (process.env.SITE) {
	siteUrl = process.env.SITE;
	console.log(`Using SITE from environment: ${siteUrl}`);
}

if (process.env.BASE_URL) {
	baseUrl = process.env.BASE_URL;
	console.log(`Using BASE_URL from environment: ${baseUrl}`);
}

// Fallback to GitHub Pages only if no custom domain is detected
if (!existsSync('./public/CNAME') && !process.env.SITE && process.env.CI) {
	siteUrl = 'https://keyserdsoze.github.io';
	baseUrl = '/y';
	console.log('Fallback to GitHub Pages configuration');
}

console.log(`Final configuration - Site: ${siteUrl}, Base: ${baseUrl}`);

// https://astro.build/config
export default defineConfig({
	site: siteUrl,
	base: baseUrl,
	integrations: [mdx(), sitemap(), tailwind()],
	build: {
		assets: '_astro'
	}
});
