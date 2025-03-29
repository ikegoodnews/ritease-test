import React from 'react'

const Toolbar = ({ onHighlight, onUnderline, onSign, onSave, onExport }) => {
    return (
        <div className="flex space-x-4 p-4 bg-white shadow rounded w-full justify-center">
            <button onClick={onHighlight} className="p-2 bg-yellow-400 text-white rounded">Highlight</button>
            <button onClick={onUnderline} className="p-2 bg-blue-400 text-white rounded">Underline</button>
            <button onClick={onSign} className="p-2 bg-green-400 text-white rounded">Sign</button>
            <button onClick={onSave} className="p-2 bg-purple-400 text-white rounded">Save</button>
            <button onClick={onExport} className="p-2 bg-red-400 text-white rounded">Export PDF</button>
        </div>
    );
};

export default Toolbar;

