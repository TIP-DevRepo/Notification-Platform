import "./globals.css";

export const metadata = {
  title: "Notifyio",
  description: "SMS and Email Notification Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}