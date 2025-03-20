import NextAuth from 'next-auth/next';
import userLogIn from '@/libs/userLogIn';
import { authOptions } from './authOptions';

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}

