import "./globals.css";
import { AuthProvider } from "@/context/AuthProvider";
import 'react-toastify/dist/ReactToastify.css';  

import { ToastContainer } from "react-toastify";




export const metadata = {
  title: "Network Treasure HUnt",
  description: "Decrypt the Encrypted",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
        <AuthProvider>
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
