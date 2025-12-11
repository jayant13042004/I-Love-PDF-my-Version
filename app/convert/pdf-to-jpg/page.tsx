import type { Metadata } from "next";
import { PdfToImageEditor } from "@/components/features/PdfToImageEditor";

export const metadata: Metadata = {
    title: "PDF to JPG | Convert PDF Pages to Images",
    description: "Extract images from PDF or convert pages to JPG format. Download as ZIP archive.",
};

export default function PdfToJpgPage() {
    return (
        <div className="container mx-auto py-12 px-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-4">PDF to JPG</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Convert PDF pages into high-quality JPG images. Download all pages as a ZIP archive.
                </p>
            </div>

            <PdfToImageEditor />
        </div>
    );
}
