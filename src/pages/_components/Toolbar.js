import React from 'react'

const Toolbar = ({ onHighlight, onUnderline, onSign, onSave }) => {
    return (
        <div className="flex space-x-4 p-4 bg-white shadow">
        <button onClick={onHighlight} className="p-2 bg-yellow-400 rounded">Highlight</button>
        <button onClick={onUnderline} className="p-2 bg-blue-400 rounded">Underline</button>
        <button onClick={onSign} className="p-2 bg-green-400 rounded">Sign</button>
        <button onClick={onSave} className="p-2 bg-purple-400 rounded">Save</button>
        </div>
    );
};

export default Toolbar;
