import React from "react";
import "@styles/globals.css";
import { connectDb } from "@helper/connectDb";
import "bootstrap/dist/css/bootstrap.min.css";  

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

connectDb();

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
