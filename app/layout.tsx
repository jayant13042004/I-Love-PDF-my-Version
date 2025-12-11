import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        template: "%s | PDF Toolkit",
        default: "PDF Toolkit - Free Online PDF Tools"
    },
    description: "Secure, client-side PDF tools. Merge, Compress, Convert, and Edit PDFs instantly in your browser without uploading files to a server.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="min-h-screen flex flex-col">
                    <Navbar />
                    <main className="flex-1 bg-slate-50/50">
                        {children}
                    </main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
