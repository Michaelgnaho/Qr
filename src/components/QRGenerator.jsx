// src/components/QRGenerator.jsx
import React from 'react'; 
import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QRGenerator = () => {
  const [username, setUsername] = useState('');
  const baseUrl = 'https://qr-plum-pi.vercel.app/card/';

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">QR Code Generator</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Enter username"
          />
        </div>
        
        {username && (
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <QRCodeSVG
              value={`${baseUrl}${username}`}
              size={256}
              level="H"
              includeMargin={true}
              className="mx-auto"
            />
            <p className="mt-2 text-sm text-gray-600">
              URL: {baseUrl}{username}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRGenerator;