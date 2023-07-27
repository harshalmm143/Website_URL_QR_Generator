import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import './BarcodeGenerator.css'
import QR from './qr-code.gif'





const BarcodeGenerator = () => {
    const [websiteURL, setWebsiteURL] = useState('');
    const [barcode, setBarcode] = useState(null)
    const [loading, setLoading] = useState(false);

    const handleUrlChange = (event) => {
        setWebsiteURL(event.target.value);
    };

    const generateBarcode = () => {
        if (websiteURL.trim()) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setBarcode(websiteURL);
            }, 2000);
        }
    };

    const handleDownload = () => {
        const barcode = document.getElementById('barcode');
        const pngUrl = barcode
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "barcode.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };



    return (
        <div>
            {loading ? (
                <div className='form-input'>
                    <div className="loader">
                        <div className="cell d-0"></div>
                        <div className="cell d-1"></div>
                        <div className="cell d-2"></div>
                        <div className="cell d-1"></div>
                        <div className="cell d-2"></div>
                        <div className="cell d-2"></div>
                        <div className="cell d-3"></div>
                        <div className="cell d-3"></div>
                        <div className="cell d-4"></div>
                    </div>
                </div>
            ) : barcode ? (
                <div>
                    <QRCode
                        id='barcode'
                        value={barcode}
                        size={220}
                        level={"H"}
                        includeMargin={true}
                    />
                </div>
            ) :
                <div>
                    <img src={QR} className='QR-code-gif' />
                </div>
            }
            <div className='form-input'>
                <input
                    className="input"
                    value={websiteURL}
                    required=""
                    onChange={handleUrlChange}
                    placeholder="Enter website URL"
                    type="text" />
            </div>
            <button onClick={generateBarcode} className="button-35">Generate</button>
            {barcode && <button onClick={handleDownload} className="button-35" >Download</button>}
        </div>
    );
};

export default BarcodeGenerator;

