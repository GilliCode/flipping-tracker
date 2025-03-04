import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import BondTable from '../components/BondTable';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';

interface TradeEntry {
  t: string; // Timestamp
  p: number; // Price
  st: string; // Status: BOUGHT or SOLD
  cC?: number; // Conversion Cost (optional)
}

interface Trade {
  id: number;
  name: string;
  h: { sO: TradeEntry[] };
}

const BondConversionTool: React.FC = () => {
  const [jsonData, setJsonData] = useState<Trade[]>([]);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isConverted, setIsConverted] = useState<boolean>(false);
  const [showButtons, setShowButtons] = useState<boolean>(false);

  const handleFileUpload = (file: File) => {
    if (file.type !== 'application/json') {
      setError('Invalid file type. Please upload a JSON file.');
      setJsonData([]);
      setShowButtons(false);
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        if (e.target && e.target.result) {
          const content = JSON.parse(e.target.result as string);
          const bonds = content.trades.filter((item: Trade) => item.id === 13190 && item.name === "Old school bond");
          if (bonds.length === 0) {
            throw new Error('Invalid dataset');
          }
          setJsonData(bonds);
          setError(null);
          setShowButtons(true);
          setIsConverted(false);
        }
      } catch (error) {
        setError('Failed to read or parse the file. Please upload a valid JSON file.');
        setJsonData([]);
        setShowButtons(false);
      }
    };
    reader.readAsText(file);
  };

  const handleConvert = () => {
    if (jsonData.length === 0) {
      setError('No data to convert. Please upload a valid JSON file first.');
      return;
    }

    const defaultKeys = ["uuid", "b", "id", "cQIT", "p", "t", "s", "st", "tAA", "tSFO", "tQIT", "tradeStartedAt", "beforeLogin"];
    let changesMade = false;

    const updatedBonds = jsonData.map((trade) => {
      const boughtBonds = trade.h.sO.filter((entry) => entry.st === "BOUGHT");
      const totalBoughtPrice = boughtBonds.reduce((sum, entry) => sum + entry.p, 0);
      const averageBoughtPrice = boughtBonds.length > 0 ? totalBoughtPrice / boughtBonds.length : 0;

      trade.h.sO.forEach((entry) => {
        if (entry.st === "SOLD" && !Object.keys(entry).some((key) => key !== "cC" && !defaultKeys.includes(key))) {
          if (!entry.hasOwnProperty("cC")) {
            entry.cC = averageBoughtPrice * 0.10;
            changesMade = true;
          }
        }
      });

      return trade;
    });

    if (!changesMade) {
      setError('No changes were made because no matching bonds were found.');
      return;
    }

    setJsonData([...updatedBonds]);
    setError(null);
    setIsConverted(true);
  };

  const handleDownload = () => {
    if (!isConverted) {
      setError('Please convert the data before downloading.');
      return;
    }

    const fileData = JSON.stringify({ trades: jsonData }, null, 2);
    const blob = new Blob([fileData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName || 'download.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container className="container-custom">
      <Row className="mt-3">
        <Col>
          <img src="OSRS_Bond.png" alt="OSRS Bond" className="bond-image" /> {/* Add the bond image */}
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <h4 className="text-green">Bond Conversion Tool</h4>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="file-upload-container">
          <FileUpload onFileUpload={handleFileUpload} />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="error-message-container">
          {error && <Alert variant="danger">{error}</Alert>}
        </Col>
      </Row>
      {showButtons && (
        <Row className="mt-3">
          <Col>
            <div className="button-group mb-3">
              <Button variant="success" onClick={handleConvert}>Convert</Button>
              <Button variant="info" onClick={handleDownload} className="ml-2">Download</Button>
            </div>
          </Col>
        </Row>
      )}
      {jsonData.length > 0 && (
        <Row className="mt-3">
          <Col>
            <BondTable data={jsonData} fileName={fileName} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default BondConversionTool;