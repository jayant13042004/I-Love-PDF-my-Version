import Link from 'next/link';
import { ArrowRight, Calendar, User } from 'lucide-react';

const posts = [
    {
        slug: '5-tips-secure-pdf',
        title: '5 Tips to Secure Your PDF Documents',
        excerpt: 'Learn how to protect your sensitive information using encryption, watermarking, and metadata removal.',
        date: 'Dec 12, 2024',
        author: 'Alex Dev',
        category: 'Security'
    },
    {
        slug: 'compress-pdf-without-losing-quality',
        title: 'How to Compress PDFs Without Losing Quality',
        excerpt: 'Discover the balance between file size and image resolution. We explain how our smart compression algorithm works.',
        date: 'Dec 10, 2024',
        author: 'Sarah Tech',
        category: 'Guides'
    },
    {
        slug: 'benefits-client-side-processing',
        title: 'Why Client-Side PDF Processing Matters',
        excerpt: 'Privacy, speed, and cost. Why moving logic to the browser is the future of web utilities.',
        date: 'Dec 08, 2024',
        author: 'PDF Team',
        category: 'Engineering'
    }
];

export const metadata = {
    title: 'Blog - PDF Toolkit',
    description: 'Latest updates, guides, and tips from the PDF Toolkit team.',
};

export default function BlogPage() {
    return (
        <div className="container mx-auto px-6 py-24 animate-fade-in">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
                        The PDF Blog
                    </h1>
                    <p className="text-xl text-slate-600">Updates, tips, and engineering deep dives.</p>
                </div>

                <div className="grid gap-8">
                    {posts.map(post => (
                        <article key={post.slug} className="glass-card p-8 rounded-3xl group hover:border-blue-300 transition-all duration-300">
                            <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-bold">{post.category}</span>
                                <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</div>
                                <div className="flex items-center gap-1"><User className="w-4 h-4" /> {post.author}</div>
                            </div>

                            <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                                {post.title}
                            </h2>

                            <p className="text-slate-600 mb-6 leading-relaxed">
                                {post.excerpt}
                            </p>

                            <Link href={`/blog/${post.slug}`} className="inline-flex items-center font-bold text-blue-600 hover:gap-2 transition-all">
                                Read Article <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
