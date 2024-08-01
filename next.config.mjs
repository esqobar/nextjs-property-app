/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**.googleusercontent.com",
                pathname: "**"
                ///a/ACg8ocLCC3F05PGTrcxxOWzvCHa02dBBiORmgDHbmTTx2vumDIr84A=s96-c
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                pathname: "**"
            }
        ]
    }
};

export default nextConfig;
