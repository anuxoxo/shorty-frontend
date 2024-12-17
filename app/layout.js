import Navbar from "./components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Shorty - URL Shortener",
  description: "A modern URL shortener app.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div>{children}</div>
      </body>
    </html>
  );
}
