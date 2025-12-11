"use client";

import { useState } from 'react';
import { FileUpload } from '@/components/features/FileUpload';
import { Button } from '@/components/ui/button';
import { PDFDocument } from 'pdf-lib';
import { Trash2, FileText, X, AlertCircle } from 'lucide-react';

export function PageRemover() {
    const [file, setFile] = useState<File | null>(null);
    const [pageCount, setPageCount] = useState<number>(0);
    const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
    const [isProcessing, setIsProcessing] = useState(false);

    // ... (maintain logic) ...
    const handleFileSelected = async (files: File[]) => {
        if (files.length > 0) {
            const f = files[0];
            setFile(f);
            try {
                const buffer = await f.arrayBuffer();
                const doc = await PDFDocument.load(buffer);
                setPageCount(doc.getPageCount());
                setSelectedPages(new Set());
            } catch (e) {
                console.error(e);
                alert('Invalid PDF');
                setFile(null);
            }
        }
    };

    const togglePage = (index: number) => {
        const newSelected = new Set(selectedPages);
        if (newSelected.has(index)) newSelected.delete(index);
        else newSelected.add(index);
        setSelectedPages(newSelected);
    };

    const handleRemove = async () => {
        if (!file) return;
        setIsProcessing(true);
        try {
            const buffer = await file.arrayBuffer();
            const srcDoc = await PDFDocument.load(buffer);
            const newDoc = await PDFDocument.create();
            const pagesToKeep = Array.from({ length: pageCount }, (_, i) => i).filter(i => !selectedPages.has(i));
            const copiedPages = await newDoc.copyPages(srcDoc, pagesToKeep);
            copiedPages.forEach(page => newDoc.addPage(page));
            const pdfBytes = await newDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `removed-pages-${Date.now()}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (e) {
            console.error(e);
            alert('Failed');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">
            {!file ? (
                <FileUpload
                    onFilesSelected={handleFileSelected}
                    accept={{ 'application/pdf': ['.pdf'] }}
                    multiple={false}
                    className="h-64"
                />
            ) : (
                <div className="glass-card rounded-3xl p-8 space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="bg-red-50 p-3 rounded-2xl">
                                <FileText className="w-8 h-8 text-red-500" />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl text-slate-900">{file.name}</h3>
                                <p className="text-slate-500 font-medium">{pageCount} Pages • {selectedPages.size} Selected</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setFile(null)} className="hover:bg-slate-100 rounded-full">
                            Change File
                        </Button>
                    </div>

                    <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {Array.from({ length: pageCount }).map((_, index) => {
                                const isSelected = selectedPages.has(index);
                                return (
                                    <div
                                        key={index}
                                        onClick={() => togglePage(index)}
                                        className={`
                                    group relative aspect-[3/4] rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-center justify-center bg-white shadow-sm hover:shadow-md
                                    ${isSelected ? 'border-red-500 ring-4 ring-red-100' : 'border-slate-200 hover:border-blue-400'}
                                `}
                                    >
                                        <span className={`text-2xl font-bold ${isSelected ? 'text-red-500' : 'text-slate-300'}`}>
                                            {index + 1}
                                        </span>

                                        {isSelected && (
                                            <div className="absolute inset-0 bg-red-50/90 rounded-[10px] flex items-center justify-center backdrop-blur-[1px] animate-fade-in">
                                                <Trash2 className="w-8 h-8 text-red-600" />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="flex items-center text-sm font-medium text-slate-500 gap-2">
                            <AlertCircle className="w-4 h-4" />
                            <span>Selected pages will be permanently removed.</span>
                        </div>
                        <Button
                            onClick={handleRemove}
                            disabled={isProcessing || selectedPages.size === 0}
                            variant={selectedPages.size > 0 ? "destructive" : "default"}
                            className="h-12 px-8 rounded-xl shadow-lg shadow-red-200"
                        >
                            {isProcessing ? 'Processing...' : `Remove ${selectedPages.size} Pages`}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
