export function Footer() {
    return (
        <footer className="border-t border-white/20 bg-white/30 backdrop-blur-md py-12 mt-20">
            <div className="container mx-auto px-6 text-center text-slate-500">
                <div className="mb-8">
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
                        PDF Toolkit
                    </span>
                    <p className="mt-2 text-sm text-slate-400">
                        Secure, client-side PDF tools for everyone.
                    </p>
                </div>
                <div className="flex justify-center gap-8 text-sm font-medium mb-8">
                    <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-primary transition-colors">Contact</a>
                    <a href="https://github.com" target="_blank" className="hover:text-primary transition-colors">GitHub</a>
                </div>
                <p className="text-sm text-slate-400">
                    © {new Date().getFullYear()} PDF Toolkit. Built with Next.js & Tailwind.
                </p>
            </div>
        </footer>
    );
}
