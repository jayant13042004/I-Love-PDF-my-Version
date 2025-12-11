import type { Metadata } from "next";
import { CompressEditor } from "@/components/features/CompressEditor";

export const metadata: Metadata = {
    title: "Compress PDF | Reduce PDF File Size",
    description: "Optimize and compress PDF files online. Reduce file size while maintaining quality.",
};

export default function CompressPage() {
    return (
        <div className="container mx-auto py-12 px-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Compress PDF</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Reduce the file size of your PDFs. Choose from different compression levels to balance quality and file size.
                </p>
            </div>

            <CompressEditor />
        </div>
    );
}
