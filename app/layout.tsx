import './globals.css';
import { Providers } from './providers';
import { Nav } from './nav';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <div className="container mx-auto">
          <Providers>
            <Nav />
            {children}
          </Providers>
        </div>
      </body>
    </html>
  )
}
