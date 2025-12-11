"use client";

import { useState } from 'react';
import { FileUpload } from '@/components/features/FileUpload';
import { Button } from '@/components/ui/button';
import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';
import { FileText, Type, Image as ImageIcon, Download, Settings, X, RotateCw, Spline, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

type WatermarkType = 'text' | 'image';

export function WatermarkEditor() {
    const [file, setFile] = useState<File | null>(null);
    const [type, setType] = useState<WatermarkType>('text');
    const [text, setText] = useState('CONFIDENTIAL');
    const [watermarkImage, setWatermarkImage] = useState<File | null>(null);
    const [opacity, setOpacity] = useState(0.5);
    const [rotation, setRotation] = useState(-45);
    const [fontSize, setFontSize] = useState(50);
    const [isProcessing, setIsProcessing] = useState(false);

    // ... (maintain logic) ...
    const handleFileSelected = (files: File[]) => {
        if (files.length > 0) setFile(files[0]);
    };
    const handleWatermarkImageSelected = (files: File[]) => {
        if (files.length > 0) setWatermarkImage(files[0]);
    };
    const handleApply = async () => {
        if (!file) return;
        setIsProcessing(true);
        try {
            const buffer = await file.arrayBuffer();
            const doc = await PDFDocument.load(buffer);
            const pages = doc.getPages();
            const font = await doc.embedFont(StandardFonts.HelveticaBold);

            let imageEmbed: any;
            if (type === 'image' && watermarkImage) {
                const imgBuffer = await watermarkImage.arrayBuffer();
                if (watermarkImage.type === 'image/png') imageEmbed = await doc.embedPng(imgBuffer);
                else imageEmbed = await doc.embedJpg(imgBuffer);
            }

            pages.forEach(page => {
                const { width, height } = page.getSize();
                if (type === 'text') {
                    const textWidth = font.widthOfTextAtSize(text, fontSize);
                    page.drawText(text, {
                        x: width / 2 - textWidth / 2,
                        y: height / 2 - fontSize / 2,
                        size: fontSize,
                        font,
                        color: rgb(0.5, 0.5, 0.5),
                        opacity,
                        rotate: degrees(rotation),
                    });
                } else if (type === 'image' && imageEmbed) {
                    const scale = fontSize / 100;
                    const w = imageEmbed.width * scale;
                    const h = imageEmbed.height * scale;
                    page.drawImage(imageEmbed, {
                        x: width / 2 - w / 2,
                        y: height / 2 - h / 2,
                        width: w,
                        height: h,
                        opacity,
                        rotate: degrees(rotation),
                    });
                }
            });

            const pdfBytes = await doc.save();
            const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `watermarked-${Date.now()}.pdf`;
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
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto animate-fade-in">
            <div className="lg:col-span-2 space-y-6">
                {!file ? (
                    <FileUpload
                        onFilesSelected={handleFileSelected}
                        accept={{ 'application/pdf': ['.pdf'] }}
                        multiple={false}
                        className="h-full min-h-[500px]"
                    />
                ) : (
                    <div className="glass-card h-[600px] flex items-center justify-center relative rounded-3xl overflow-hidden bg-slate-100/50 border border-white/40 shadow-inner">
                        <div className="absolute top-4 right-4 z-10">
                            <Button variant="secondary" size="sm" onClick={() => setFile(null)} className="gap-2">
                                <X className="w-4 h-4" /> Change PDF
                            </Button>
                        </div>

                        <p className="text-slate-400 font-medium">Preview Canvas</p>

                        <div
                            className="absolute text-slate-900 font-bold select-none pointer-events-none whitespace-nowrap"
                            style={{
                                transform: `rotate(${rotation}deg)`,
                                opacity: opacity,
                                fontSize: `${fontSize}px`
                            }}
                        >
                            {type === 'text' ? text : (watermarkImage ? <img src={URL.createObjectURL(watermarkImage)} className="h-40 w-auto opacity-50" alt="" /> : "Image")}
                        </div>
                    </div>
                )}
            </div>

            <div className="glass-card rounded-3xl p-6 h-fit space-y-8">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <div className="bg-indigo-50 p-2 rounded-xl">
                        <Settings className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="font-bold text-lg text-slate-800">Watermark Configuration</h3>
                </div>

                <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                    <button
                        onClick={() => setType('text')}
                        className={cn("flex-1 flex items-center justify-center py-2.5 text-sm font-bold rounded-xl transition-all", type === 'text' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700')}
                    >
                        <Type className="w-4 h-4 mr-2" /> Text
                    </button>
                    <button
                        onClick={() => setType('image')}
                        className={cn("flex-1 flex items-center justify-center py-2.5 text-sm font-bold rounded-xl transition-all", type === 'image' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700')}
                    >
                        <ImageIcon className="w-4 h-4 mr-2" /> Image
                    </button>
                </div>

                <div className="space-y-6">
                    {type === 'text' ? (
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-slate-700">Text Content</label>
                            <input
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-slate-700">Upload Logo</label>
                            <div className="border border-dashed border-slate-300 rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50 transition-colors relative">
                                <input type="file" accept="image/*" onChange={(e) => e.target.files && handleWatermarkImageSelected([e.target.files[0]])} className="absolute inset-0 opacity-0 cursor-pointer" />
                                <div className="text-sm text-slate-600 truncate">{watermarkImage ? watermarkImage.name : "Click to upload image"}</div>
                            </div>
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm font-medium text-slate-600">
                                <span className="flex items-center gap-2"><Layers className="w-4 h-4" /> Opacity</span>
                                <span>{Math.round(opacity * 100)}%</span>
                            </div>
                            <input
                                type="range" min="0" max="1" step="0.1"
                                value={opacity} onChange={(e) => setOpacity(parseFloat(e.target.value))}
                                className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm font-medium text-slate-600">
                                <span className="flex items-center gap-2"><RotateCw className="w-4 h-4" /> Rotation</span>
                                <span>{rotation}°</span>
                            </div>
                            <input
                                type="range" min="-180" max="180" step="15"
                                value={rotation} onChange={(e) => setRotation(parseInt(e.target.value))}
                                className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm font-medium text-slate-600">
                                <span className="flex items-center gap-2"><Spline className="w-4 h-4" /> Size</span>
                                <span>{fontSize}px</span>
                            </div>
                            <input
                                type="range" min="10" max="200" step="5"
                                value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))}
                                className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                    <Button
                        className="w-full h-12 rounded-xl text-lg shadow-lg shadow-indigo-200 bg-indigo-600 hover:bg-indigo-700"
                        onClick={handleApply}
                        disabled={isProcessing || !file}
                    >
                        {isProcessing ? 'Processing...' : 'Download Watermarked PDF'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
