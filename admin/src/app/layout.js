import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "NTH Admin Panel",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <meta
        name="format-detection"
        content="telephone=no, date=no, email=no, address=no"
      />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      > 
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
