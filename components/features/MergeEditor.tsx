"use client";

import { useState, useCallback, memo } from 'react';
import { FileUpload } from './FileUpload';
import { Button } from '@/components/ui/button';
import { mergePdfs } from '@/lib/pdf-processing/merger';
import { FileText, X, ArrowDown, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatBytes } from '@/lib/utils';

export function MergeEditor() {
    const [files, setFiles] = useState<File[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFilesSelected = useCallback((newFiles: File[]) => {
        setFiles(prev => [...prev, ...newFiles]);
    }, []);

    const removeFile = useCallback((index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    }, []);

    const moveFile = useCallback((index: number, direction: 'up' | 'down') => {
        setFiles(prev => {
            if ((direction === 'up' && index === 0) || (direction === 'down' && index === prev.length - 1)) return prev;
            const newFiles = [...prev];
            const target = direction === 'up' ? index - 1 : index + 1;
            [newFiles[index], newFiles[target]] = [newFiles[target], newFiles[index]];
            return newFiles;
        });
    }, []);

    const handleMerge = async () => {
        if (files.length === 0) return;
        setIsProcessing(true);
        try {
            const buffers = await Promise.all(files.map(f => f.arrayBuffer()));
            const mergedPdf = await mergePdfs(buffers);
            const blob = new Blob([mergedPdf as BlobPart], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `merged-${Date.now()}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (e) {
            console.error(e);
            alert('Merge failed');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto animate-fade-in">
            <FileUpload
                onFilesSelected={handleFilesSelected}
                accept={{ 'application/pdf': ['.pdf'] }}
                className="h-64"
            />

            {files.length > 0 && (
                <div className="glass-card rounded-3xl p-8 space-y-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary/10 p-2 rounded-lg">
                                <FileText className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="font-bold text-xl text-slate-800">Files to Merge <span className="text-slate-400 text-lg font-normal">({files.length})</span></h3>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setFiles([])} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                            Clear All
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {files.map((file, index) => (
                            <FileItem
                                key={`${file.name}-${index}`}
                                file={file}
                                index={index}
                                onMove={moveFile}
                                onRemove={removeFile}
                            />
                        ))}
                    </div>

                    <div className="pt-6 flex justify-end">
                        <Button onClick={handleMerge} disabled={isProcessing || files.length < 2} size="lg" className="rounded-xl px-8 shadow-lg shadow-primary/20">
                            {isProcessing ? 'Merging PDFs...' : 'Merge Files Now'}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

const FileItem = memo(({ file, index, onMove, onRemove }: {
    file: File,
    index: number,
    onMove: (i: number, dir: 'up' | 'down') => void,
    onRemove: (i: number) => void
}) => (
    <div className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all">
        <div className="cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-500">
            <GripVertical className="w-5 h-5" />
        </div>

        <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-red-500" />
        </div>

        <div className="flex-1 min-w-0">
            <p className="font-medium text-slate-900 truncate">{file.name}</p>
            <p className="text-xs text-slate-500">{formatBytes(file.size)}</p>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => onMove(index, 'up')} disabled={index === 0}>
                <span className="sr-only">Move Up</span>
                <ArrowDown className="w-4 h-4 rotate-180" />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => onMove(index, 'down')}>
                <span className="sr-only">Move Down</span>
                <ArrowDown className="w-4 h-4" />
            </Button>
        </div>

        <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-red-500 ml-2" onClick={() => onRemove(index)}>
            <X className="w-4 h-4" />
        </Button>
    </div>
));
FileItem.displayName = 'FileItem';
