import type { Metadata } from "next";
import { WatermarkEditor } from "@/components/features/WatermarkEditor";

export const metadata: Metadata = {
    title: "Add Watermark to PDF | Stamp Text & Images",
    description: "Add text or image watermarks to your PDF documents. Customize opacity, rotation, and position.",
};

export default function WatermarkPage() {
    return (
        <div className="container mx-auto py-12 px-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Add Watermark</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Stamp your documents with text or image watermarks. customizable positioning, transparency, and rotation.
                </p>
            </div>

            <WatermarkEditor />
        </div>
    );
}
