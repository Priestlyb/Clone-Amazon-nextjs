/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["links.papareact.com", "fakestoreapi.com", "pinterest.com", "pngimg.com", "i.pinimg.com"],
    },
    reactStrictMode: false,
    env: {
        stripe_public_key: process.env.STRIPE_PUBLIC_KEY
    }
};

export default nextConfig;
