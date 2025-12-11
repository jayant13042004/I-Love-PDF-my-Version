"use client";

import { useState } from 'react';
import { FileUpload } from '@/components/features/FileUpload';
import { Button } from '@/components/ui/button';
import { convertImagesToPdf } from '@/lib/pdf-processing/converter';
import { FileImage, X, ArrowUp, ArrowDown, GripVertical, Image as ImageIcon } from 'lucide-react';
import { cn, formatBytes } from '@/lib/utils';

export function ImageToPdfEditor() {
    const [files, setFiles] = useState<File[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    // ... (maintain logic) ...
    const handleFilesSelected = (newFiles: File[]) => {
        const validFiles = newFiles.filter(f => f.type === 'image/jpeg' || f.type === 'image/png');
        if (validFiles.length < newFiles.length) {
            alert('Only JPG and PNG files are supported');
        }
        setFiles(prev => [...prev, ...validFiles]);
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const moveFile = (index: number, direction: 'up' | 'down') => {
        if ((direction === 'up' && index === 0) || (direction === 'down' && index === files.length - 1)) return;
        const newFiles = [...files];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]];
        setFiles(newFiles);
    };

    const handleConvert = async () => {
        if (files.length === 0) return;
        setIsProcessing(true);
        try {
            const pdfBytes = await convertImagesToPdf(files);
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `converted-images-${Date.now()}.pdf`;
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
        <div className="space-y-8 max-w-4xl mx-auto animate-fade-in">
            <FileUpload
                onFilesSelected={handleFilesSelected}
                accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] }}
                className="h-64"
            />

            {files.length > 0 && (
                <div className="glass-card rounded-3xl p-8 space-y-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="bg-purple-50 p-2 rounded-lg">
                                <ImageIcon className="w-5 h-5 text-purple-600" />
                            </div>
                            <h3 className="font-bold text-xl text-slate-800">Images Selected <span className="text-slate-400 text-lg font-normal">({files.length})</span></h3>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setFiles([])} className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg">
                            Clear All
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {files.map((file, index) => (
                            <div key={`${file.name}-${index}`} className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all">
                                <div className="cursor-grab text-slate-300 hover:text-slate-500">
                                    <GripVertical className="w-5 h-5" />
                                </div>

                                {/* Image Preview Placeholder - use actual URL if created, here using icon for simplicity or minimal overhead */}
                                <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center shrink-0 border">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt="preview"
                                        className="w-full h-full object-cover"
                                        onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                                    />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-slate-900 truncate">{file.name}</p>
                                    <p className="text-xs text-slate-500">{formatBytes(file.size)}</p>
                                </div>

                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => moveFile(index, 'up')} disabled={index === 0}>
                                        <ArrowDown className="w-4 h-4 rotate-180" />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => moveFile(index, 'down')} disabled={index === files.length - 1}>
                                        <ArrowDown className="w-4 h-4" />
                                    </Button>
                                </div>

                                <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-red-500 ml-2" onClick={() => removeFile(index)}>
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div className="pt-6 flex justify-end">
                        <Button onClick={handleConvert} disabled={isProcessing} size="lg" className="rounded-xl px-8 shadow-lg shadow-purple-200 bg-purple-600 hover:bg-purple-700 text-white">
                            {isProcessing ? 'Converting...' : 'Convert to PDF'}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
