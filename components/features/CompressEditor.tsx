"use client";

import { useState, useCallback } from 'react';
import { FileUpload } from './FileUpload';
import { Button } from '@/components/ui/button';
import { compressPdf, CompressionLevel } from '@/lib/pdf-processing/compressor';
import { FileText, Download, CheckCircle, RefreshCw, X, Settings2 } from 'lucide-react';
import { formatBytes, cn } from '@/lib/utils';

export function CompressEditor() {
    const [file, setFile] = useState<File | null>(null);
    const [level, setLevel] = useState<CompressionLevel>('medium');
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState<{ blob: Blob; url: string; size: number } | null>(null);

    const handleFileSelected = useCallback((files: File[]) => {
        if (files.length > 0) {
            setFile(files[0]);
            setResult(null);
        }
    }, []);

    const handleCompress = useCallback(async () => {
        if (!file) return;
        setIsProcessing(true);
        try {
            const buffer = await file.arrayBuffer();
            const compressedBytes = await compressPdf(buffer, level);
            const blob = new Blob([compressedBytes as BlobPart], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            setResult({ blob, url, size: blob.size });
        } catch (error) {
            console.error('Compression failed:', error);
            alert('Failed to compress PDF');
        } finally {
            setIsProcessing(false);
        }
    }, [file, level]);

    const downloadFile = () => {
        if (!result) return;
        const link = document.createElement('a');
        link.href = result.url;
        link.download = `compressed-${Date.now()}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-8 max-w-3xl mx-auto animate-fade-in">
            {!file ? (
                <FileUpload
                    onFilesSelected={handleFileSelected}
                    accept={{ 'application/pdf': ['.pdf'] }}
                    multiple={false}
                    className="h-64"
                />
            ) : (
                <div className="glass-card rounded-3xl p-8 space-y-8">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-50 p-3 rounded-2xl">
                                <FileText className="w-8 h-8 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl text-slate-900">{file.name}</h3>
                                <p className="text-slate-500 font-medium">{formatBytes(file.size)}</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => { setFile(null); setResult(null); }} className="hover:bg-slate-100 rounded-full">
                            <X className="w-5 h-5 text-slate-400" />
                        </Button>
                    </div>

                    {!result && (
                        <div className="space-y-6">
                            <div>
                                <div className="flex items-center gap-2 mb-4 text-slate-800 font-bold">
                                    <Settings2 className="w-5 h-5" />
                                    Compression Level
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    {(['low', 'medium', 'high'] as const).map((l) => (
                                        <button
                                            key={l}
                                            onClick={() => setLevel(l)}
                                            className={cn(
                                                "relative p-4 rounded-xl border-2 text-center transition-all duration-200 overflow-hidden",
                                                level === l
                                                    ? "border-blue-600 bg-blue-50 text-blue-700 shadow-md transform scale-[1.02]"
                                                    : "border-slate-100 bg-white hover:border-blue-200 hover:bg-slate-50 text-slate-600"
                                            )}
                                        >
                                            <span className="block font-bold capitalize text-lg mb-1">{l}</span>
                                            <span className="text-xs opacity-80 block">
                                                {l === 'low' ? 'Better Quality' : l === 'high' ? 'Smallest Size' : 'Balanced'}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <Button
                                onClick={handleCompress}
                                disabled={isProcessing}
                                className="w-full h-14 text-lg rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                            >
                                {isProcessing ? (
                                    <>
                                        <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                                        Compressing PDF...
                                    </>
                                ) : (
                                    'Compress PDF Now'
                                )}
                            </Button>
                        </div>
                    )}

                    {result && (
                        <div className="bg-green-50/50 border border-green-200 rounded-2xl p-6 space-y-6 animate-slide-up">
                            <div className="flex items-center gap-3 text-green-700">
                                <div className="bg-green-100 p-2 rounded-full">
                                    <CheckCircle className="w-6 h-6" />
                                </div>
                                <span className="font-bold text-lg">Compression Complete!</span>
                            </div>

                            <div className="flex justify-between items-center text-sm p-4 bg-white/60 rounded-xl border border-green-100">
                                <div className="text-center">
                                    <p className="text-slate-500 mb-1">Original</p>
                                    <p className="font-bold text-slate-900">{formatBytes(file.size)}</p>
                                </div>
                                <div className="text-green-300">➜</div>
                                <div className="text-center">
                                    <p className="text-slate-500 mb-1">New Size</p>
                                    <p className="font-bold text-green-700 text-lg">{formatBytes(result.size)}</p>
                                </div>
                                <div className="text-center">
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold text-sm">
                                        -{Math.round(((file.size - result.size) / file.size) * 100)}%
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button onClick={downloadFile} className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-200 rounded-xl">
                                    <Download className="w-5 h-5 mr-2" /> Download Compressed PDF
                                </Button>
                                <Button variant="outline" className="h-12 border-green-200 text-green-700 hover:bg-green-50 rounded-xl" onClick={() => { setFile(null); setResult(null); }}>
                                    New
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
