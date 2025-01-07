import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download } from 'lucide-react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg ${className}`}>
      {children}
    </div>
  );
};

const Input = ({ 
  type = 'text', 
  value, 
  onChange, 
  className = '', 
  placeholder 
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`
        w-full 
        px-3 
        py-2 
        border
        text-black 
        border-gray-300 
        rounded-md 
        focus:outline-none 
        focus:ring-2 
        focus:ring-blue-500 
        focus:border-transparent 
        ${className}
      `}
      placeholder={placeholder}
    />
  );
};

const Button = ({ onClick, children, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex
        items-center
        justify-center
        gap-2
        px-4
        py-2
        bg-blue-500
        text-white
        rounded-md
        hover:bg-blue-600
        transition-colors
        duration-200
        ${className}
      `}
    >
      {children}
    </button>
  );
};

const QRGenerator = () => {
  const [username, setUsername] = useState('');
  const baseUrl = 'https://qr-plum-pi.vercel.app/card/';
  const qrRef = useRef();

  const downloadQRCode = () => {
    const svg = qrRef.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `qr-${username}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <Card className="max-w-md mx-auto">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            QR Code Generator
          </h1>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="transition-all duration-200"
                placeholder="Enter username"
              />
            </div>

            {username && (
              <div className="bg-white rounded-xl p-6 shadow-inner border border-gray-100">
                
                <div ref={qrRef} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
                  <QRCodeSVG
                    value={`${baseUrl}${username}`}
                    size={256}
                    level="H"
                    includeMargin={true}
                    className="mx-auto"
                  />
                  <h2 className="text-xl font-semibold text-center text-black mb-4">
                  Scan to know {username}
                </h2>
                </div>
                <p className="mt-4 text-sm text-gray-600 text-center break-all">
                  URL: {baseUrl}{username}
                </p>
                <div className="mt-4 flex justify-center">
                  <Button onClick={downloadQRCode}>
                    <Download size={20} />
                    Download QR Code
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default QRGenerator;