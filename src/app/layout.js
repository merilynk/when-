import { Aleo } from "next/font/google";
import "./globals.css";

const font = Aleo({ subsets: ["latin"] });

export const metadata = {
  title: "when?",
  description: "Stop asking the question.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
