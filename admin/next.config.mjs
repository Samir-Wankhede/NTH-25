/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/superusers-admin',
    // async redirects() {
    //     return [
    //         {
    //             source: '/',
    //             destination: '/superusers-admin',
    //             permanent: true,
    //             basePath: false,
    //         },
    //         {
    //             source: '/dashboard',
    //             destination: '/superusers-admin/dashboard',
    //             permanent: true,
    //             basePath: false,
    //         },
    //         {
    //             source: '/nth-logo.png',
    //             destination: '/superusers-admin/nth-logo.png',
    //             permanent: true,
    //             basePath: false,
    //         },
    //     ];
    // }
};

export default nextConfig;
