import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const nextConfig: NextConfig = isGitHubPages
  ? {
      output: 'export',
      basePath: '/happy-birthdayMYL',
      assetPrefix: '/happy-birthdayMYL/',
      trailingSlash: true,
    }
  : {};

export default nextConfig;
