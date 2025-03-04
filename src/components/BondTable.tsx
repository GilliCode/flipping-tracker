import React, { useEffect, useState } from 'react';
import { Table, OverlayTrigger, Tooltip, Container } from 'react-bootstrap';

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

  useEffect(() => {
    const boughtCount = data.reduce((acc, trade) => acc + trade.h.sO.filter((item) => item.st === "BOUGHT").length, 0);
    const soldCount = data.reduce((acc, trade) => acc + trade.h.sO.filter((item) => item.st === "SOLD").length, 0);
    setStats({ bought: boughtCount, sold: soldCount });
  }, [data]);

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
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="tooltip-top" className="tooltip-top">Conversion cost is only applicable to SOLD bonds</Tooltip>}
              >
                <span style={{ cursor: "pointer", marginLeft: "5px" }}>🛈</span>
              </OverlayTrigger>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.flatMap((trade) =>
            trade.h.sO.map((entry, index) => (
              <tr key={index}>
                <td>{new Date(entry.t).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</td>
                <td>{entry.p.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} GP</td>
                <td>
                  {entry.st === "SOLD"
                    ? entry.cC
                      ? `${entry.cC.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} GP`
                      : "N/A"
                    : "For conversion"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default BondTable;
