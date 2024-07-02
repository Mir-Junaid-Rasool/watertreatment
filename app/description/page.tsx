// pages/description.tsx

import Head from 'next/head';
import styles from './Description.module.css';

const Description: React.FC = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Data Description</title>
      </Head>
      <h1 className={styles.title}>Water Treatment Plant Data Description</h1>
      <div className={styles.description}>
        <ul>
          <li><strong>avg_outflow:</strong> The average outflow of water from the treatment plant.</li>
          <li><strong>avg_inflow:</strong> The average inflow of water into the treatment plant.</li>
          <li><strong>total_grid:</strong> Total grid power used by the plant.</li>
          <li><strong>Am:</strong> Ammonia levels in the water.</li>
          <li><strong>BOD:</strong> Biological Oxygen Demand.</li>
          <li><strong>COD:</strong> Chemical Oxygen Demand.</li>
          <li><strong>TN:</strong> Total Nitrogen levels.</li>
          <li><strong>T:</strong> Temperature of the water.</li>
          <li><strong>TM:</strong> Total Metals in the water.</li>
          <li><strong>Tm:</strong> Minimum temperature recorded.</li>
          <li><strong>SLP:</strong> Sea Level Pressure.</li>
          <li><strong>H:</strong> Humidity levels.</li>
          <li><strong>PP:</strong> Precipitation levels.</li>
          <li><strong>VV:</strong> Visibility.</li>
          <li><strong>V:</strong> Wind speed.</li>
          <li><strong>VM:</strong> Maximum wind speed recorded.</li>
          <li><strong>VG:</strong> Wind gust speed.</li>
          <li><strong>year:</strong> Year of the data record.</li>
          <li><strong>month:</strong> Month of the data record.</li>
          <li><strong>day:</strong> Day of the data record.</li>
        </ul>
      </div>
    </div>
  );
}

export default Description;
