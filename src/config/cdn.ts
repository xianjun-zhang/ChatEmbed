/**
 * Centralized CDN configuration for all assets
 * Using jsdelivr CDN without version for always-latest behavior
 */
export const CDN_ASSETS_BASE_URL = 'https://cdn.jsdelivr.net/gh/xianjun-zhang/ChatEmbed/dist/assets/';

/**
 * Helper function to get full CDN URL for an asset
 */
export const getCDNAssetUrl = (assetPath: string): string => {
  return `${CDN_ASSETS_BASE_URL}${assetPath}`;
};
