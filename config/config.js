const dev = process.env.NODE_ENV !== 'production';

export const apiRoute = dev ? 'http://localhost:3000' : 'https://next-carikerja.vercel.app'
