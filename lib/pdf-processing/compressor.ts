import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';

// Ensure worker is set (redundant check if already set in converter, but safe)
if (typeof window !== 'undefined' && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;
}

export type CompressionLevel = 'low' | 'medium' | 'high';

export async function compressPdf(pdfBytes: ArrayBuffer, level: CompressionLevel): Promise<Uint8Array> {
    const qualityMap = {
        low: 0.8,
        medium: 0.6,
        high: 0.4
    };
    const quality = qualityMap[level];

    // Load via pdfjs for rendering
    const loadingTask = pdfjsLib.getDocument({ data: pdfBytes });
    const pdf = await loadingTask.promise;
    const totalPages = pdf.numPages;

    const newDoc = await PDFDocument.create();

    for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 }); // Reasonable scale for readability

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) continue;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
            canvasContext: context,
            viewport: viewport
        }).promise;

        // Compress as JPEG
        const blob = await new Promise<Blob | null>(resolve =>
            canvas.toBlob(resolve, 'image/jpeg', quality)
        );

        if (blob) {
            const buffer = await blob.arrayBuffer();
            const embeddedImage = await newDoc.embedJpg(buffer);
            const newPage = newDoc.addPage([embeddedImage.width, embeddedImage.height]);
            newPage.drawImage(embeddedImage, {
                x: 0,
                y: 0,
                width: embeddedImage.width,
                height: embeddedImage.height,
            });
        }
    }

    return newDoc.save();
}
