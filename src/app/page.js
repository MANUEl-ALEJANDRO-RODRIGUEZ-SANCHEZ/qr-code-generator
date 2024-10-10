'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaQrcode, FaSpinner, FaDownload } from 'react-icons/fa';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [qrValue, setQrValue] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef(null); 

  const handleGenerateQR = () => {
    if (inputText.trim() !== '') {
      setIsLoading(true);
      setQrValue(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${inputText}`);
      setShowAlert(false);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } else {
      setShowAlert(true);
    }
  };

  const handleDownloadQR = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const img = new window.Image();
    img.crossOrigin = 'Anonymous'; 
    img.src = qrValue;

    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'qr_code.png';
      link.click();
    };
  };


  useEffect(() => {
    if (qrValue && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = qrValue;
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        ctx.drawImage(img, 0, 0);
      };
    }
  }, [qrValue]);

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light p-5 rounded shadow">
      <h1 className="mb-4 text-center text-primary">QR Code Generator <FaQrcode /></h1>
      
      <div className="mb-3 w-100" style={{ maxWidth: '400px' }}>
        <input 
          type="text"
          className="form-control"
          placeholder="Type something fun here!"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          title="Enter text to generate your QR code"
        />
      </div>
      
      <button 
        className="btn btn-success mb-4" 
        onClick={handleGenerateQR}
      >
        {isLoading ? <FaSpinner className="spinner" /> : "Generate QR Code"}
      </button>

      {qrValue && !isLoading && (
        <div className="text-center">
          <Image 
            src={qrValue}
            alt="Generated QR Code"
            width={256} 
            height={256}  
            className="qr-image animated fadeIn"
          />
          <p className="mt-3">QR Code for: <strong>{inputText}</strong></p>

          <canvas ref={canvasRef} width={256} height={256} style={{ display: 'none' }}></canvas>

          <button 
            className="btn btn-info mt-3" 
            onClick={handleDownloadQR}
          >
            <FaDownload /> Download QR Code
          </button>
        </div>
      )}
      
      {showAlert && (
        <div className="alert alert-danger animated fadeIn" role="alert">
          🚨 Oops! Please enter some text to generate a QR code! 🎉
        </div>
      )}
    </div>
  );
}
