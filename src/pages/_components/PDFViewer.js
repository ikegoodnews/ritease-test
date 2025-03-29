import { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { fabric } from "fabric";
import SignaturePad from "./SignaturePad";
import { saveAnnotations, loadAnnotations } from "../_utils/pdfUtils";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = ({ file, annotations, setAnnotations }) => {
    const [numPages, setNumPages] = useState(null);
    const canvasRef = useRef(null);
    const fabricCanvas = useRef(null);
    const [showSignaturePad, setShowSignaturePad] = useState(false);

    useEffect(() => {
        if (!file) return;

        const canvas = new fabric.Canvas(canvasRef.current, {
            isDrawingMode: false,
        });

        fabricCanvas.current = canvas;
        loadAnnotations().then((savedAnnotations) => {
            setAnnotations(savedAnnotations);
            // applyAnnotations(savedAnnotations);
        });

        return () => {
            canvas.dispose();
        };
    }, [file]);

    // const applyAnnotations = (annotations) => {
    //     annotations.forEach((annotation) => {
    //         if (annotation.type === "highlight") {
    //             // Apply highlight effect
    //             console.log("Applying highlight:", annotation.text);
    //         } else if (annotation.type === "underline") {
    //             // Apply underline effect
    //             console.log("Applying underline:", annotation.text);
    //         } else if (annotation.type === "signature") {
    //             // Load signature image
    //             fabric.Image.fromURL(annotation.dataURL, (img) => {
    //                 img.set({ left: annotation.x, top: annotation.y, scaleX: 0.5, scaleY: 0.5 });
    //                 fabricCanvas.current.add(img);
    //             });
    //         }
    //     });
    // };

    const addSignature = (dataURL) => {
        const newAnnotation = { type: "signature", dataURL, x: 100, y: 100 };
        setAnnotations((prev) => [...prev, newAnnotation]);
        saveAnnotations([...annotations, newAnnotation]);

        fabric.Image.fromURL(dataURL, (img) => {
            img.set({
                left: 100,
                top: 100,
                scaleX: 0.5,
                scaleY: 0.5,
            });
            fabricCanvas.current.add(img);
        });
        setShowSignaturePad(false);
    };

    const highlightText = () => {
        if (window.getSelection) {
            const selectedText = window.getSelection().toString();
            if (selectedText.length > 0) {
                const newAnnotation = { type: "highlight", text: selectedText };
                setAnnotations((prev) => [...prev, newAnnotation]);
                saveAnnotations([...annotations, newAnnotation]);
            }
        }
    };

    const underlineText = () => {
        if (window.getSelection) {
            const selectedText = window.getSelection().toString();
            if (selectedText.length > 0) {
                const newAnnotation = { type: "underline", text: selectedText };
                setAnnotations((prev) => [...prev, newAnnotation]);
                saveAnnotations([...annotations, newAnnotation]);
            }
        }
    };

    const enableDrawing = () => {
        fabricCanvas.current.isDrawingMode = true;
    };

    const disableDrawing = () => {
        fabricCanvas.current.isDrawingMode = false;
    };

    const saveData = () => {
        saveAnnotations(annotations);
        alert("Annotations saved!");
    };

    return (
        <div className="relative">
            <Document file={file} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
                {Array.from(new Array(numPages), (el, index) => (
                    <Page key={`page_${index + 1}`} pageNumber={index + 1} canvasRef={canvasRef} />
                ))}
            </Document>

            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none"></canvas>

            <button onClick={highlightText} className="absolute top-4 right-4 p-2 bg-yellow-400 text-white rounded">
                Highlight
            </button>
            <button onClick={underlineText} className="absolute top-12 right-4 p-2 bg-blue-400 text-white rounded">
                Underline
            </button>
            <button onClick={enableDrawing} className="absolute top-20 right-4 p-2 bg-green-400 text-white rounded">
                Sign
            </button>
            <button onClick={disableDrawing} className="absolute top-28 right-4 p-2 bg-red-400 text-white rounded">
                Stop Sign
            </button>
            <button onClick={saveData} className="absolute top-36 right-4 p-2 bg-purple-400 text-white rounded">
                Save
            </button>

            {showSignaturePad && <SignaturePad onSave={addSignature} />}
        </div>
    );
};

export default PDFViewer;
