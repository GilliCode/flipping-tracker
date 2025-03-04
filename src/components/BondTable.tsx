import React, { useState, useEffect } from 'react';
import { Table, Container, Modal, Button } from 'react-bootstrap';

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

interface BondTableProps {
  data: Trade[];
  fileName: string;
}

const BondTable: React.FC<BondTableProps> = ({ data }) => {
  const [stats, setStats] = useState({ bought: 0, sold: 0 });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const boughtCount = data.reduce((acc, trade) => acc + trade.h.sO.filter((item) => item.st === "BOUGHT").length, 0);
    const soldCount = data.reduce((acc, trade) => acc + trade.h.sO.filter((item) => item.st === "SOLD").length, 0);
    setStats({ bought: boughtCount, sold: soldCount });
  }, [data]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <Container className="container-custom">
      <h4 className="text-green">Transactions</h4>
      <p>Quantity Bought: {stats.bought}</p>
      <p>Quantity Sold: {stats.sold}</p>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Date</th>
            <th>Price</th>
            <th>
              Conversion Cost
              <span style={{ cursor: 'pointer', marginLeft: '5px' }} onClick={handleShow}>🛈</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.flatMap((trade) =>
            trade.h.sO.map((entry, index) => (
              <tr key={index}>
                <td>{new Date(entry.t).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                <td>{entry.p.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} GP</td>
                <td>
                  {entry.st === 'SOLD'
                    ? entry.cC
                      ? `${entry.cC.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} GP`
                      : 'N/A'
                    : 'For conversion'}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-header-title">Conversion Cost Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>Conversion cost is only applicable to SOLD bonds.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BondTable;
