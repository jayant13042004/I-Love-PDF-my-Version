import type { Metadata } from "next";
import { PageRemover } from "@/components/features/PageRemover";

export const metadata: Metadata = {
    title: "Remove Pages from PDF | Delete PDF Pages", // Added type annotation
    description: "Select and remove unwanted pages from your PDF documents. Fast and secure processing.",
};

export default function RemovePagesPage() {
    return (
        <div className="container mx-auto py-12 px-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Remove Pages</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Delete unwanted pages from your PDF documents. Select the pages you want to remove and download the new file.
                </p>
            </div>

            <PageRemover />
        </div>
    );
}
