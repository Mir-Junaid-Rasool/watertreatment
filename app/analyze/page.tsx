"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import csvParser from 'csv-parser';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import Image from 'next/image';

interface DataType {
  [key: string]: any;
}

const AnalyzePage: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<string>('BOD'); // Default value

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/Data-Melbourne_F.csv', { responseType: 'blob' });
        const reader = response.data.stream().getReader();
        const result = await reader.read();
        const decoder = new TextDecoder('utf-8');
        const csvText = decoder.decode(result.value);
        
        const rows: DataType[] = [];
        const parser = csvParser();

        parser.on('data', (data) => rows.push(data));
        parser.write(csvText);
        parser.end();

        setData(rows);
        setLoading(false);
      } catch (fetchError: any) {
        console.error("Fetch Error:", fetchError);
        setError(`Fetch error: ${fetchError.message}`);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const columns = data.length ? Object.keys(data[0]) : [];

  const calculateStats = (col: string) => {
    if (!col) return {};

    const values = data.map((d) => parseFloat(d[col])).filter((v) => !isNaN(v));
    const sum = values.reduce((a, b) => a + b, 0);
    const mean = sum / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const count = values.length;
    const std = Math.sqrt(values.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / count);

    return { mean, min, max, count, std };
  };

  const calculateFeatureImportance = () => {
    const normalizedRanges = columns.reduce((acc, col) => {
      const values = data.map((d) => parseFloat(d[col])).filter((v) => !isNaN(v));
      const min = Math.min(...values);
      const max = Math.max(...values);
      const mean = values.reduce((a, b) => a + b, 0) / values.length;
      const std = Math.sqrt(values.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / values.length);
      const range = max - min;
      const importance = std / mean; // Using coefficient of variation (CV) for feature importance

      acc.push({ feature: col, importance });
      return acc;
    }, [] as { feature: string, importance: number }[]);

    return normalizedRanges;
  };

  const stats = calculateStats(selectedColumn);
  const featureImportance = calculateFeatureImportance();

  const handleColumnChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedColumn(event.target.value as string);
  };

  return (
    <div className="analyze-container">
      <h1>Data Analysis</h1>
      <h2>Basic Statistics</h2>
      <FormControl variant="outlined" style={{ minWidth: 200, marginBottom: 20 }}>
        <InputLabel>Select Column</InputLabel>
        <Select value={selectedColumn} onChange={handleColumnChange} label="Select Column">
          {columns.map((col) => (
            <MenuItem key={col} value={col}>{col}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={[stats]}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="stat" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="mean" fill="#8884d8" />
          <Bar dataKey="min" fill="#82ca9d" />
          <Bar dataKey="max" fill="#ffc658" />
          <Bar dataKey="count" fill="#d0ed57" />
          <Bar dataKey="std" fill="#a4de6c" />
        </BarChart>
      </ResponsiveContainer>
      <h2>Feature Importance</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={featureImportance}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="feature" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="importance" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
      <h2>Histogram</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data.map((d) => ({ value: parseFloat(d[selectedColumn]) })).filter((v) => !isNaN(v.value))}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="value" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <h2>Saved Plot</h2>
      <Image src="/feature_importances.png" alt="Feature Importances" layout="responsive" width={500} height={300} />
      <style jsx>{`
        .analyze-container {
          padding: 20px;
        }
        h1, h2 {
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default AnalyzePage;
