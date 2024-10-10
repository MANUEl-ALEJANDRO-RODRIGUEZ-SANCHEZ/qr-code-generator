/** @type {import('next').NextConfig} */
const nextConfig = {
    devServer: {
        host: '0.0.0.0',
        disableHostCheck: true,
        port: 10000,
    },
    images: {
        domains: ['api.qrserver.com'], // Reemplaza 'example.com' con el dominio de las imágenes externas
    },
};

export default nextConfig;
