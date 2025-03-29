import { useDropzone } from "react-dropzone";

const FileUpload = ({ onFileSelect }) => {
    const onDrop = (acceptedFiles) => {
        onFileSelect(acceptedFiles[0]);
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: "application/pdf",
        onDrop,
    });

    return (
        <div {...getRootProps()} className="border-2 border-dashed p-6 text-center cursor-pointer bg-white">
            <input {...getInputProps()} />
            <p>Drag & drop a PDF file here, or click to select one</p>
        </div>
    );
};

export default FileUpload;
