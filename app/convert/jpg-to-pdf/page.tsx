import type { Metadata } from "next";
import { ImageToPdfEditor } from "@/components/features/ImageToPdfEditor";

export const metadata: Metadata = {
    title: "JPG to PDF | Convert Images to PDF",
    description: "Convert JPG, PNG, and other images to PDF documents instantly. Drag and drop interface.",
};

export default function JpgToPdfPage() {
    return (
        <div className="container mx-auto py-12 px-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-4">JPG to PDF</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Convert your images to a single PDF document. Supports JPG and PNG.
                    Drag to reorder images before converting.
                </p>
            </div>

            <ImageToPdfEditor />
        </div>
    );
}
