import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import { UserProvider } from "./context/userContext";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css"; // Toastify CSS

export const metadata = {
  title: "Shorty - URL Shortener",
  description: "A modern URL shortener app.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <UserProvider>
          <Navbar />
          <div>{children}</div>
        </UserProvider>
      </body>
    </html>
  );
}
