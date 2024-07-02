"use client"
import { AppProps } from 'next/app';
import '../app/globals.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Home.module.css'

const Home = () => {
  const [formData, setFormData] = useState({ Am: '', COD: '', TN: '' });
  const [result, setResult] = useState<{ classification_prediction?: number; regression_prediction?: number }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('https://wtflask-2.onrender.com/predict', formData);
      setResult(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error making prediction request:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Water Treatment Prediction</h1>
      <h3 className={styles.subtitle}>Predict BOD in Water</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Am: </label>
          <input type="number" name="Am" value={formData.Am} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>COD: </label>
          <input type="number" name="COD" value={formData.COD} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>TN: </label>
          <input type="number" name="TN" value={formData.TN} onChange={handleChange} required />
        </div>
        <button type="submit" className={styles.button}>Submit</button>
      </form>

      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
          <p>Wait, predicting results for you...</p>
        </div>
      )}

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Results</h2>
            <p>BOD Classification Prediction: {result.classification_prediction}</p>
            <p>BOD Possible Value (Regression): {result.regression_prediction}</p>
            <button onClick={closeModal} className={styles.closeButton}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
