import React from 'react';
import { Shield, Zap, Globe, Github, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
    title: 'About - PDF Toolkit',
    description: 'Learn about our mission to provide free, secure, and client-side PDF tools.',
};

export default function AboutPage() {
    return (
        <div className="container mx-auto px-6 py-24 animate-fade-in">
            <div className="max-w-4xl mx-auto space-y-16">

                {/* Mission */}
                <section className="text-center space-y-6">
                    <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        Our Mission
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        We believe that simple PDF tasks shouldn't require expensive software or risky server uploads.
                        <br />
                        **PDF Toolkit** is built to be the privatest, fastest, and most accessible PDF tool on the web.
                    </p>
                </section>

                {/* Core Values */}
                <section className="grid md:grid-cols-3 gap-8">
                    <div className="glass-card p-8 rounded-3xl text-center space-y-4">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
                            <Shield className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Privacy First</h3>
                        <p className="text-slate-500">
                            Your files never leave your device. All processing happens locally in your browser using WebAssembly.
                        </p>
                    </div>
                    <div className="glass-card p-8 rounded-3xl text-center space-y-4">
                        <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto">
                            <Zap className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Lightning Fast</h3>
                        <p className="text-slate-500">
                            No upload times. No download quotas. Instant results powered by modern browser capabilities.
                        </p>
                    </div>
                    <div className="glass-card p-8 rounded-3xl text-center space-y-4">
                        <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto">
                            <Globe className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Open & Free</h3>
                        <p className="text-slate-500">
                            Accessible to everyone, everywhere. No paywalls, no hidden fees, just great tools.
                        </p>
                    </div>
                </section>

                {/* Tech Stack */}
                <section className="bg-slate-50 rounded-3xl p-10 border border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Built with Modern Tech</h2>
                    <div className="flex flex-wrap gap-3">
                        {['Next.js 14', 'TypeScript', 'Tailwind CSS', 'pdf-lib', 'pdfjs-dist', 'Web Workers', 'React'].map(tag => (
                            <span key={tag} className="px-4 py-2 bg-white border border-slate-200 rounded-full text-slate-600 font-medium text-sm">
                                {tag}
                            </span>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="text-center space-y-8">
                    <h2 className="text-3xl font-bold text-slate-800">Open Source & Community Driven</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">
                        We are constantly improving. If you are a developer, check out our code on GitHub or contribute to make PDF Toolkit even better.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button className="rounded-full px-8 h-12 gap-2">
                            <Github className="w-5 h-5" /> View on GitHub
                        </Button>
                        <Button variant="outline" className="rounded-full px-8 h-12 gap-2">
                            <Heart className="w-5 h-5 text-red-500" /> Support Us
                        </Button>
                    </div>
                </section>
            </div>
        </div>
    );
}
