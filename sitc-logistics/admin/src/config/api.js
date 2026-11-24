/**
 * SRTC Central Admin - Production API Base URL Resolver
 * Supports both local Vite proxy and live Vercel deployments.
 */
export const API_BASE_URL = 
  import.meta.env.VITE_API_BASE_URL || 
  import.meta.env.VITE_API_URL || 
  '';

/**
 * Resolves an API endpoint cleanly against the configured backend base URL.
 * @param {string} path - e.g. '/api/homepage'
 * @returns {string} - e.g. 'https://api.srtcsupplychain.in/api/homepage' or '/api/homepage'
 */
export function apiUrl(path) {
  if (!path) return API_BASE_URL;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
}
