// Utility to handle base path for different deployment environments

/**
 * Get the base path for the current environment
 * Returns '/y' for GitHub Pages, '' for custom domain
 */
export function getBasePath(): string {
  // Check if we're in the browser or server
  if (typeof window !== 'undefined') {
    // Browser environment - check the current hostname
    const hostname = window.location.hostname;
    // If we're on the custom domain, don't use base path
    if (hostname === 'catenaccio.net' || hostname === 'www.catenaccio.net') {
      return '';
    }
    // If we're on GitHub Pages, use base path
    if (hostname.includes('github.io')) {
      return '/y';
    }
    // Default to no base path
    return '';
  } else {
    // Server environment - check for custom domain first
    if (process.env.SITE?.includes('catenaccio.net')) {
      return '';
    }
    // Check if BASE_URL is explicitly set by GitHub Actions
    if (process.env.BASE_URL !== undefined) {
      return process.env.BASE_URL;
    }
    // Check for CNAME file (custom domain)
    try {
      const fs = require('fs');
      if (fs.existsSync('./public/CNAME')) {
        return '';
      }
    } catch (error) {
      // Ignore file system errors
    }
    // Only use /y if explicitly on GitHub Pages without custom domain
    const isGitHubPages = process.env.GITHUB_PAGES === 'true' && !process.env.SITE?.includes('catenaccio.net');
    return isGitHubPages ? '/y' : '';
  }
}

/**
 * Create a URL with the appropriate base path
 * @param path - The path to append (should start with /)
 * @returns The full path with base if needed
 */
export function createUrl(path: string): string {
  const basePath = getBasePath();
  // Ensure path starts with /
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}

/**
 * Create asset URL with base path
 * @param assetPath - Path to the asset
 * @returns Full asset URL
 */
export function createAssetUrl(assetPath: string): string {
  const basePath = getBasePath();
  const cleanPath = assetPath.startsWith('/') ? assetPath : `/${assetPath}`;
  return `${basePath}${cleanPath}`;
}

/**
 * Create language-specific URL
 * @param lang - Language code
 * @param path - Optional path (defaults to empty)
 * @returns Language URL with base path
 */
export function createLangUrl(lang: string, path: string = ''): string {
  const basePath = getBasePath();
  const cleanPath = path.startsWith('/') ? path : (path ? `/${path}` : '');
  return `${basePath}/${lang}${cleanPath}`;
}
