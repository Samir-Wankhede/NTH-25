import "./globals.css";
import { AuthProvider } from "@/context/AuthProvider";



export const metadata = {
  title: "Network Treasure HUnt",
  description: "Decrypt the Encrypted",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
