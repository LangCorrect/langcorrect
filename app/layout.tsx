import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { siteConfig } from "@/config/site";
import Navbar from "@/components/navbar";
import "./globals.css";

const openSans = Open_Sans({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" data-theme="dracula">
            <body className={`${openSans.className} antialiased`}>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
