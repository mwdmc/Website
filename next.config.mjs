import createMDX from 'fumadocs-mdx/config';
import webpack from 'webpack';
import { remarkImage } from 'fumadocs-core/mdx-plugins';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  remarkPlugins: [remarkImage],
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "i.imgur.com",
        port: '',
        pathname: "/**"
      }, 
      {
        protocol: 'https',
        hostname: "wallpapercave.com",
        port: '',
        pathname: "/**"
      }, 
      {
        protocol: 'https',
        hostname: "cdn.discordapp.com",
        port: '',
        pathname: "/**"
      }
    ]
  },
  webpack: (config, options) => {
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, "");
      })
    );
    return config;
  },
};

export default withMDX(config);
