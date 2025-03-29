import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

const SignaturePad = ({ onSave }) => {
    const sigCanvas = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    const clearSignature = () => {
        sigCanvas.current.clear();
    };

    const saveSignature = () => {
        if (!sigCanvas.current.isEmpty()) {
        const dataURL = sigCanvas.current.toDataURL("image/png");
        onSave(dataURL);
        }
    };

    return (
        <div className="absolute bottom-10 right-10 bg-white p-4 shadow-lg border rounded">
            <h3 className="mb-2 text-lg font-bold">Sign Here</h3>
            <SignatureCanvas
                ref={sigCanvas}
                penColor="black"
                canvasProps={{ width: 300, height: 100, className: "border" }}
                onBegin={() => setIsDrawing(true)}
                onEnd={() => setIsDrawing(false)}
            />
            <div className="mt-2 flex justify-between">
                <button onClick={clearSignature} className="p-2 bg-red-400 text-white rounded">Clear</button>
                <button onClick={saveSignature} className="p-2 bg-green-500 text-white rounded">Save</button>
            </div>
        </div>
    );
};

export default SignaturePad;
