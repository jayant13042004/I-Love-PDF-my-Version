"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileStack, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { href: "/merge", label: "Merge" },
        { href: "/compress", label: "Compress" },
        { href: "/convert/jpg-to-pdf", label: "JPG to PDF" },
        { href: "/convert/pdf-to-jpg", label: "PDF to JPG" },
        { href: "/remove-pages", label: "Remove Pages" },
        { href: "/watermark", label: "Watermark" },
    ];

    return (
        <nav className="fixed top-0 w-full z-[100] glass border-b-0">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2.5 font-bold text-xl text-slate-900 group">
                    <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
                        <FileStack className="w-6 h-6 text-primary" />
                    </div>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">PDF Toolkit</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-1 bg-slate-100/50 p-1 rounded-full border border-white/20 backdrop-blur-md">
                    {links.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                                pathname === link.href
                                    ? "bg-white text-primary shadow-sm"
                                    : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="hidden lg:block">
                    <Button variant="outline" className="rounded-full gap-2 border-slate-200 hover:bg-slate-50 transition-all" onClick={() => window.open('https://github.com/your-username/pdf-toolkit', '_blank')}>
                        <svg role="img" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.807 1.304 3.495.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.896-.014 3.286 0 .319.216.694.825.576C20.566 22.091 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                        GitHub
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="lg:hidden">
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu Content */}
            {isOpen && (
                <div className="lg:hidden absolute top-20 left-0 w-full bg-white/95 backdrop-blur-xl border-b p-4 flex flex-col gap-2 shadow-xl animate-slide-up">
                    {links.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                                "p-4 rounded-xl font-medium transition-colors flex items-center justify-between",
                                pathname === link.href ? "bg-primary/10 text-primary" : "text-slate-600 hover:bg-slate-50"
                            )}
                        >
                            {link.label}
                            {pathname === link.href && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}
