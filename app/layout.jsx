import "./globals.css";

export const metadata = {
  title: "Montex Technical Services L.L.C | Dubai",
  description:
    "Montex Technical Services L.L.C provides reliable air conditioning, electrical, plumbing, painting, false ceiling, cleaning and maintenance services in Dubai.",
   icons: {
    icon: "assets/favicon.ico",
    shortcut: "assets/favicon.ico",
    apple: "assets/apple-icon.png",
    }
  
  };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
