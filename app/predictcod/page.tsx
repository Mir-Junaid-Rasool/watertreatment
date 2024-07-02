"use client";
import { useState } from 'react';
import axios from 'axios';
import styles from './Cod.module.css';

const Home = () => {
  const [formData, setFormData] = useState({
    BOD: '',
    TN: '',
    Am: '',
    avg_inflow: '',
    avg_outflow: '',
    T: '',
    H: '',
    PP: '',
  });

  const [result, setResult] = useState<{ classification_prediction?: string }>({});
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
      const response = await axios.post('https://wtflask-2.onrender.com/codpredict', formData);
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
      <h3 className={styles.subtitle}>Predict COD in Water</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>BOD: </label>
          <input
            type="number"
            name="BOD"
            value={formData.BOD}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>TN: </label>
          <input
            type="number"
            name="TN"
            value={formData.TN}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Am: </label>
          <input
            type="number"
            name="Am"
            value={formData.Am}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>avg_inflow: </label>
          <input
            type="number"
            name="avg_inflow"
            value={formData.avg_inflow}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>avg_outflow: </label>
          <input
            type="number"
            name="avg_outflow"
            value={formData.avg_outflow}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Temperature (T): </label>
          <input
            type="number"
            name="T"
            value={formData.T}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Humidity (H): </label>
          <input
            type="number"
            name="H"
            value={formData.H}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Precipitation (PP): </label>
          <input
            type="number"
            name="PP"
            value={formData.PP}
            onChange={handleChange}
            required
          />
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
            <p>COD Classification Prediction: {result.classification_prediction}</p>
            <button onClick={closeModal} className={styles.closeButton}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
