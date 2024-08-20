import { DM_Sans } from 'next/font/google'
import { Space_Mono } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'

export const metadata = {
  title: "RAG App",
  description: "RAG Customer Support App",
};

const fontHeading = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-heading',
})

const fontBody = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-body',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(
          'antialiased',
          fontHeading.variable,
          fontBody.variable
        )}
      >
        {children}
      </body>
    </html>
  )
}
// import { Inter } from "next/font/google";
// import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "RAG App",
//   description: "RAG Customer Support App",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>{children}</body>
//     </html>
//   );
// }
