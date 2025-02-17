import "@/src/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Todo List',
  description: 'Sample todo list app for assignment 4'
};

export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return(
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  ) 
}
