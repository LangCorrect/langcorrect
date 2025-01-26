import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

const openSans = Open_Sans({
    subsets: ["latin"],
    variable: "--font-open-sans",
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
        <html lang="en">
            <body className={`${openSans.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
