"use client";

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileUp, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
    onFilesSelected: (files: File[]) => void;
    accept?: Record<string, string[]>;
    multiple?: boolean;
    className?: string;
}

export function FileUpload({ onFilesSelected, accept, multiple = true, className }: FileUploadProps) {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles?.length > 0) {
            onFilesSelected(acceptedFiles);
        }
    }, [onFilesSelected]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept,
        multiple
    });

    return (
        <div
            {...getRootProps()}
            className={cn(
                "group relative border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-300 overflow-hidden",
                isDragActive
                    ? "border-primary bg-primary/5 scale-[1.02]"
                    : "border-slate-200 bg-white hover:border-primary/50 hover:bg-slate-50",
                className
            )}
        >
            <input {...getInputProps()} />

            {/* Decorative gradient blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative flex flex-col items-center justify-center gap-4 z-10">
                <div className={cn(
                    "p-5 rounded-2xl transition-all duration-300",
                    isDragActive ? "bg-primary text-white" : "bg-primary/10 text-primary group-hover:scale-110"
                )}>
                    {isDragActive ? <Sparkles className="w-8 h-8 animate-spin" /> : <Upload className="w-8 h-8" />}
                </div>
                <div>
                    <p className="text-xl font-bold text-slate-900 mb-2">
                        {isDragActive ? "Drop files now!" : "Upload Files"}
                    </p>
                    <p className="text-slate-500 max-w-xs mx-auto leading-relaxed">
                        Drag & drop files here, or click to select files from your computer
                    </p>
                </div>
            </div>
        </div>
    );
}
