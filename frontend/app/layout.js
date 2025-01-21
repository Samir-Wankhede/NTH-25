import "./globals.css";
import { AuthProvider } from "@/context/AuthProvider";
import 'react-toastify/dist/ReactToastify.css';  
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastUtils } from "@/utils/ToastifyContainer";




export const metadata = {
  title: "Network Treasure Hunt",
  description: "Decrypt the Encrypted",
};

export default function RootLayout({ children }) {
  return (
<html lang="en">
  <head>
    <meta charSet="UTF-8" />
    <link rel="icon" href="/nth-logo.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta property="og:title" content="Network Treasure Hunt"/>
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image" content="/webpic.png"/>
    <meta property="og:image:width" content="900" />
    <meta property="og:image:height" content="628" />
    <meta property="og:description" content="Decrypt the Encrypted"/>
    <meta name="twitter:card" content="/webpic.png" />
    <meta name="description" content="Network Treasure Hunt - Decrypt the Encrypted" />
  </head>
  <body className="h-screen flex flex-col flex-auto bg-black">
    <ToastUtils />
    <AuthProvider>
      <Navbar />
      <div className="h-full relative overflow-y-scroll">
        {children}
      </div>
      <Footer />
    </AuthProvider>
  </body>
</html>

  );
}
