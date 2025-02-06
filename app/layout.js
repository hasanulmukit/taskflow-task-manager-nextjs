// app/layout.jsx
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Trello Clone</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
