"use client"
import React from 'react'
import ScrollingTable from './ScrollingTable'

export default function page() {
  return (
    <div className="page-container">
      <h1>Data Set</h1>
    <main className="main-content">
      <ScrollingTable />
    </main>
    <style jsx>{`
      .page-container {
        display: flex;
        flex-direction: column;
        height: 100vh;
      }
      .main-content {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
        h1{
        color:red;
        text-align:center;
        font-size:25px;
        }
    `}</style>
  </div>
);
};

