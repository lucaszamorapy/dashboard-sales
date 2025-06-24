/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'export',         // ativa o modo de exportação estática
  distDir: 'out',           // opcional: garante que o build vá para a pasta 'out'
  // trailingSlash, skipTrailingSlashRedirect etc. são opcionais
};

module.exports = nextConfig;