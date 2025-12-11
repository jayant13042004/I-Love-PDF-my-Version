import type { Metadata } from "next";
import { MergeEditor } from "@/components/features/MergeEditor";

export const metadata: Metadata = {
    title: "Merge PDF Files | Combine PDFs Online",
    description: "Merge multiple PDF files into one document instantly. Secure client-side merging with no file uploads.",
};

export default function MergePage() {
    return (
        <div className="container mx-auto py-12 px-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Merge PDF Files</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Combine multiple PDF files into one. Drag and drop to upload, reorder pages, and download your merged document.
                </p>
            </div>

            <MergeEditor />
        </div>
    );
}
