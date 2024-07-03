import styles from './AboutApp.module.css';

const AboutApp: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About Our Water Treatment Prediction App</h1>
      <p className={styles.description}>
        Our application predicts Chemical Oxygen Demand (COD) and Biological Oxygen Demand (BOD) in water treatment processes. It provides detailed analysis of the data with interactive graphs and offers options to download the dataset used for predictions.
      </p>
      <h2 className={styles.subtitle}>Features</h2>
      <ul className={styles.features}>
        <li>Predict COD and BOD levels in water treatment processes.</li>
        <li>Analyze data with interactive and detailed graphs.</li>
        <li>Download options for the dataset.</li>
        <li>User-friendly interface for seamless navigation.</li>
      </ul>
      <h2 className={styles.subtitle}>Data Source</h2>
      <p className={styles.description}>
        The dataset used for our predictions is sourced from Mendeley Data. You can access and download the dataset from the following link:
      </p>
      <a href="https://data.mendeley.com/datasets/pprkvz3vbd/1" className={styles.link} target="_blank" rel="noopener noreferrer">
        Mendeley Dataset
      </a>
    </div>
  );
};

export default AboutApp;
