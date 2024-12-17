import Navbar from "./components/Navbar";
import { UserProvider } from "./context/userContext";
import "./globals.css";

export const metadata = {
  title: "Shorty - URL Shortener",
  description: "A modern URL shortener app.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Navbar />
          <div>{children}</div>
        </UserProvider>
      </body>
    </html>
  );
}
