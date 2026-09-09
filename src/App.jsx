import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Floodmap from './components/Floodmap';
import NowcastStats from './components/NowcastStats';
import { floodData as initialMockData } from './mockData'; 
import Footer from './components/Footer';

function App() {
  const [data, setData] = useState(initialMockData);
  const [loading, setLoading] = useState(true);


  const fetchBackendData = async () => {
    try {
      const response = await fetch('');
      const result = await response.json();

      setData(result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching flood data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBackendData();
    const interval = setInterval(() => {
      fetchBackendData();
    }, 30000); // 30000 ms = 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='app-container' style={{ padding: '20px', minHeight: '100vh', backgroundColor: '#0f172a', color: '#fff' }}>
      <Header />
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
        <Floodmap />
        <NowcastStats data={data} />
      </div>
      <Footer/>
    </div>
  );
}

export default App;