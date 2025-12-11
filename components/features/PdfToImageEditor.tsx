"use client";

import { useState } from 'react';
import { FileUpload } from '@/components/features/FileUpload';
import { Button } from '@/components/ui/button';
import { convertPdfToImages } from '@/lib/pdf-processing/converter';
import { FileText, Download, X } from 'lucide-react';
import { formatBytes } from '@/lib/utils';

export function PdfToImageEditor() {
    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFileSelected = (files: File[]) => {
        if (files.length > 0) setFile(files[0]);
    };

    const handleConvert = async () => {
        if (!file) return;
        setIsProcessing(true);
        try {
            const buffer = await file.arrayBuffer();
            const zipBlob = await convertPdfToImages(buffer);
            const url = URL.createObjectURL(zipBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${file.name.replace('.pdf', '')}-images.zip`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (e) {
            console.error(e);
            alert('Conversion failed');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="space-y-8 max-w-2xl mx-auto animate-fade-in">
            {!file ? (
                <FileUpload
                    onFilesSelected={handleFileSelected}
                    accept={{ 'application/pdf': ['.pdf'] }}
                    multiple={false}
                    className="h-64"
                />
            ) : (
                <div className="glass-card rounded-3xl p-10 text-center space-y-8">
                    <div className="absolute top-4 right-4">
                        <Button variant="ghost" size="icon" onClick={() => setFile(null)} className="rounded-full hover:bg-slate-100">
                            <X className="w-5 h-5 text-slate-400" />
                        </Button>
                    </div>

                    <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <FileText className="w-10 h-10 text-orange-500" />
                    </div>

                    <div>
                        <h3 className="font-bold text-2xl text-slate-900 mb-2">{file.name}</h3>
                        <p className="text-slate-500 font-medium">{formatBytes(file.size)}</p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-600">
                        Ready to extract images? This will download a ZIP file containing JPGs of every page.
                    </div>

                    <Button
                        onClick={handleConvert}
                        disabled={isProcessing}
                        className="w-full h-14 text-lg bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-lg shadow-orange-200"
                    >
                        {isProcessing ? 'Converting...' : 'Convert & Download ZIP'}
                    </Button>
                </div>
            )}
        </div>
    );
}
