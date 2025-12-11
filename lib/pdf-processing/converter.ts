import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';
import * as pdfjsLib from 'pdfjs-dist';

// Configure worker for client-side usage
if (typeof window !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;
}

export async function convertImagesToPdf(images: File[]): Promise<Uint8Array> {
    const doc = await PDFDocument.create();
    for (const image of images) {
        const buffer = await image.arrayBuffer();
        let pdfImage;
        try {
            if (image.type === 'image/jpeg') {
                pdfImage = await doc.embedJpg(buffer);
            } else if (image.type === 'image/png') {
                pdfImage = await doc.embedPng(buffer);
            } else {
                continue; // Skip unsupported types
            }
            const page = doc.addPage([pdfImage.width, pdfImage.height]);
            page.drawImage(pdfImage, {
                x: 0,
                y: 0,
                width: pdfImage.width,
                height: pdfImage.height,
            });
        } catch (e) {
            console.error('Error embedding image', image.name, e);
        }
    }
    return doc.save();
}

export async function convertPdfToImages(pdfBuffer: ArrayBuffer): Promise<Blob> {
    const zip = new JSZip();

    // Load PDF
    const loadingTask = pdfjsLib.getDocument({ data: pdfBuffer });
    const pdf = await loadingTask.promise;
    const totalPages = pdf.numPages;

    for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 }); // High quality scale

        // Create canvas
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) continue;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
            canvasContext: context,
            viewport: viewport
        }).promise;

        // Convert to blob
        const blob = await new Promise<Blob | null>(resolve =>
            canvas.toBlob(resolve, 'image/jpeg', 0.95)
        );

        if (blob) {
            const fileName = `page-${i.toString().padStart(3, '0')}.jpg`;
            zip.file(fileName, blob);
        }
    }

    return zip.generateAsync({ type: "blob" });
}
