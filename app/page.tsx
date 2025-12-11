import Link from "next/link";
import {
    Merge,
    Minimize2,
    Image,
    FileText,
    Scissors,
    Stamp,
    ArrowRight,
    ShieldCheck,
    Zap,
    Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";

const tools = [
    {
        title: "Merge PDF",
        description: "Combine multiple PDFs into a single document. Reorder pages with ease.",
        icon: Merge,
        href: "/merge",
        color: "text-blue-600",
        bg: "bg-blue-100/50"
    },
    {
        title: "Compress PDF",
        description: "Reduce file size while optimizing for maximal quality.",
        icon: Minimize2,
        href: "/compress",
        color: "text-green-600",
        bg: "bg-green-100/50"
    },
    {
        title: "JPG to PDF",
        description: "Convert JPG/PNG images to PDF. Perfect for receipts and photos.",
        icon: Image,
        href: "/convert/jpg-to-pdf",
        color: "text-purple-600",
        bg: "bg-purple-100/50"
    },
    {
        title: "PDF to JPG",
        description: "Turn PDF pages into high-quality images. Download as ZIP.",
        icon: FileText,
        href: "/convert/pdf-to-jpg",
        color: "text-orange-600",
        bg: "bg-orange-100/50"
    },
    {
        title: "Remove Pages",
        description: "Delete unwanted pages from your PDFs instantly.",
        icon: Scissors,
        href: "/remove-pages",
        color: "text-red-600",
        bg: "bg-red-100/50"
    },
    {
        title: "Watermark",
        description: "Stamp text or images over your PDF pages for security.",
        icon: Stamp,
        href: "/watermark",
        color: "text-indigo-600",
        bg: "bg-indigo-100/50"
    }
];

const features = [
    {
        icon: ShieldCheck,
        title: "100% Secure",
        desc: "Files are processed entirely in your browser. No data is ever sent to a server."
    },
    {
        icon: Zap,
        title: "Lightning Fast",
        desc: "Instant processing powered by WebAssembly. No upload or wait times."
    },
    {
        icon: Globe,
        title: "Works Everywhere",
        desc: "Compatible with all modern browsers on Desktop, Tablet, and Mobile."
    }
];

export default function Home() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                <div className="container mx-auto text-center max-w-4xl relative z-10 animate-fade-in">
                    <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-white/50 border border-white/20 backdrop-blur-sm text-sm font-medium text-slate-600 animate-slide-up">
                        ✨ Free, Secure, and Client-Side
                    </div>
                    <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-8 animate-slide-up" style={{ animationDelay: "100ms" }}>
                        The Ultimate <br />
                        <span className="text-gradient">PDF Toolkit</span>
                    </h1>
                    <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: "200ms" }}>
                        Manage your PDF files with privacy-first tools. Merge, compress, and edit instantly without ever leaving your browser.
                    </p>
                    <div className="flex justify-center gap-4 animate-slide-up" style={{ animationDelay: "300ms" }}>
                        <Button size="lg" className="rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                            Get Started
                        </Button>
                        <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg bg-white/50 border-white/40 hover:bg-white/80">
                            View Features
                        </Button>
                    </div>
                </div>

                {/* Background blobs */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow"></div>
                    <div className="absolute top-20 right-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }}></div>
                    <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow" style={{ animationDelay: "4s" }}></div>
                </div>
            </section>

            {/* Tools Grid */}
            <section className="py-20 container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-16 text-slate-800">Everything you need</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tools.map((tool, index) => {
                        const Icon = tool.icon;
                        return (
                            <Link
                                key={tool.href}
                                href={tool.href}
                                className="group glass-card p-8 rounded-3xl relative overflow-hidden"
                            >
                                <div className={`w-14 h-14 ${tool.bg} ${tool.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-slate-800 group-hover:text-blue-600 transition-colors">
                                    {tool.title}
                                </h3>
                                <p className="text-slate-500 mb-8 leading-relaxed">
                                    {tool.description}
                                </p>
                                <div className="absolute bottom-8 right-8 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white transform translate-y-4 group-hover:translate-y-0">
                                    <ArrowRight className="w-5 h-5" />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* Feature Highlights */}
            <section className="py-24 bg-white/50 border-t border-white/20 backdrop-blur-sm">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-12">
                        {features.map((feature, idx) => (
                            <div key={idx} className="text-center">
                                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <feature.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-slate-500">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
