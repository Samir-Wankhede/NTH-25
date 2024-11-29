import "./globals.css";
import { AuthProvider } from "@/context/AuthProvider";
import 'react-toastify/dist/ReactToastify.css';  

import { ToastContainer } from "react-toastify";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";




export const metadata = {
  title: "Network Treasure Hunt",
  description: "Decrypt the Encrypted",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
  <body className="h-screen flex flex-col bg-black">
    <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
    <AuthProvider>
      <div className="h-[8vh]">
        <Navbar />
      </div>
      <div className="h-[84vh] overflow-y-scroll">
        {children}
      </div>
      <div className="h-[8vh]">
        <Footer />
      </div>
    </AuthProvider>
  </body>
</html>

  );
}
