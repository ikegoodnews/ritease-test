import { useState } from "react";
import FileUpload from "./_components/FileUpload";
import PDFViewer from "./_components/PDFViewer";
import Toolbar from "./_components/Toolbar";
import { exportPDF, saveAnnotations } from "./_utils/pdfUtils";

export default function Home() {
  const [file, setFile] = useState(null);
  const [annotations, setAnnotations] = useState([]);

  const handleHighlight = () => {
    alert("Highlight feature triggered! Implement text selection logic.");
  };

  const handleUnderline = () => {
    alert("Underline feature triggered! Implement text selection logic.");
  };

  const handleSign = () => {
    alert("Signature feature triggered! Opens signature pad.");
  };

  const handleSave = () => {
    alert("Annotations saved!");
    saveAnnotations(annotations);
  };

  const handleExport = () => {
    if (!file) return;
    exportPDF(file, annotations);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">PDF Annotation Tool</h1>
      {!file ? (
        <FileUpload onFileSelect={setFile} />
      ) : (
        <div className="w-full max-w-4xl bg-white shadow rounded p-4">
          <Toolbar
            onHighlight={handleHighlight}
            onUnderline={handleUnderline}
            onSign={handleSign}
            onSave={handleSave}
            onExport={handleExport}
          />
          <PDFViewer file={file} annotations={annotations} setAnnotations={setAnnotations} />
        </div>
      )}
    </div>
  );
}
