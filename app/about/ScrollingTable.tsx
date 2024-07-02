"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import csvParser from 'csv-parser';
import { Readable } from 'stream';

const ScrollingTable: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/Data-Melbourne_F.csv', { responseType: 'blob' });
        const reader = response.data.stream().getReader();
        const result = await reader.read();
        const decoder = new TextDecoder('utf-8');
        const csvText = decoder.decode(result.value);
        
        const rows: any[] = [];
        const parser = csvParser();

        parser.on('data', (data) => rows.push(data));
        parser.on('end', () => {
          setData(rows);
          setLoading(false);
        });
        parser.on('error', (parseError) => {
          setError(`Parse error: ${parseError.message}`);
          setLoading(false);
        });

        const stream = Readable.from(csvText);
        stream.pipe(parser);
      } catch (fetchError: any) {
        setError(`Fetch error: ${fetchError.message}`);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const downloadCSV = () => {
    const csv = data.map(row => Object.values(row).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadJSON = () => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'data.json');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="table-container">
      <div className="button-container">
        <button onClick={downloadCSV}>Download CSV</button>
        <button onClick={downloadJSON}>Download JSON</button>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              {data.length > 0 && Object.keys(data[0]).map((key, index) => (
                <th key={index}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, i) => (
                  <td key={i}>{value as React.ReactNode}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        .table-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          padding: 20px;
        }
        .button-container {
          margin-bottom: 8px;
        }
        button {
          margin-right: 10px;
          padding: 10px 20px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 2px;
          cursor: pointer;
        }
        button:hover {
          background-color: #005bb5;
        }
        .table-wrapper {
          flex: 1;
          overflow-y: auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
        }
        th {
          background-color: #f2f2f2;
          position: -webkit-sticky;
          position: sticky;
          top: 0;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        tr:hover {
          background-color: #ddd;
        }
      `}</style>
    </div>
  );
};

export default ScrollingTable;
