import React from 'react';
import { createRoot } from 'react-dom/client';

export default function App() {
    return (
        <div className="font-bold">
            <h1>Hello from React!</h1>
        </div>
    );
}

const root = createRoot(document.body);
root.render(<App />);