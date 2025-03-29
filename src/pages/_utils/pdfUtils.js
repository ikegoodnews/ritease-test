import { PDFDocument } from "pdf-lib";
import { openDB } from "idb";

const DB_NAME = "pdf_annotations";
const STORE_NAME = "annotations";

export async function saveAnnotations(annotations) {
    const db = await openDB(DB_NAME, 1, {
        upgrade(db) {
            db.createObjectStore(STORE_NAME);
        },
    });

    await db.put(STORE_NAME, annotations, "annotationsData");
}

export async function loadAnnotations() {
    const db = await openDB(DB_NAME, 1);
    return (await db.get(STORE_NAME, "annotationsData")) || [];
}

export const exportPDF = async (file, fabricCanvas) => {
    const existingPdfBytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const page = pdfDoc.getPages()[0];
    const canvasDataURL = fabricCanvas.toDataURL();

    const pngImage = await pdfDoc.embedPng(canvasDataURL);
    page.drawImage(pngImage, { x: 0, y: 0, width: page.getWidth(), height: page.getHeight() });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "annotated.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
