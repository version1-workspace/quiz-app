import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";
import Header from "@/components/shared/layout/header";
import { ToastContainer, show } from "@/lib/toast";
import { join } from "@/lib/className";
import { BreadcrumbsContainer } from "@/components/shared/breadcrumbs/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "4 Choice",
  description: "Quiz App for programmers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={join(styles.body, inter.className)}>
        <ToastContainer padding={{ top: 60 }} />
        <Header />
        {children}
      </body>
    </html>
  );
}
