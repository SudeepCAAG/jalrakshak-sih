import React, { useState } from 'react'

const NowcastStats = ({ data }) => {
    const [simulating, setSimulating] = useState(false);
   const handleSimulation = async () => {
    setSimulating(true);

    try {
      const response = await fetch('http://localhost:5000/api/run-simulation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location: 'Sector V', rainfall: 'heavy' })
      });

      const result = await response.json();

      alert('✅Real Simulation Done: Safe route via ${result.safeRoute}');

    } catch (error) {
      console.error("Simulation failed:", error);
      alert("❌ Simulation failed! Check if Backend server is running.");
    } finally {
      setSimulating(false);
    }
  };
    return (
        <>
            <div className='ns-container'>
                <h3 style={{ marginTop: '0', color: '#f8fafc' }}>📝0-3 Hour Nowcast</h3>
                <hr style={{ borderColor: '#334155', marginBottom: '15px' }} />

                {/* CORE METRICS */}
                <div className='cm-container'>
                    <div className='cm'>
                        <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#94a3b8' }}>Flood Probability</p>
                        <strong style={{ fontSize: '16px', color: '#ef4444', }}>{data.probability}% High Risk</strong>
                    </div>
                    <div className='cm'>
                        <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#94a3b8' }}>Flood Depth</p>
                        <strong style={{ fontSize: '16px', color: '#38bdf8', }}>🌊{data.depth}</strong>
                    </div>
                    <div className='cm'>
                        <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#94a3b8' }}>Time-To-Flood</p>
                        <strong style={{ fontSize: '16px', color: '#fbbf24', }}>{data.timrToFlood}% High Risk</strong>
                    </div>
                    <div className='cm'>
                        <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#94a3b8' }}>Model Confidence</p>
                        <strong style={{ fontSize: '16px', color: '#22c55e', }}>{data.confidence}% High Risk</strong>
                    </div>
                </div>

                {/* ALERTS */}
                <div className='a-container'>
                    <strong style={{ color: '#fca5a5', fontSize: '13px' }}>🚨ALERTS</strong>
                    <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#fecaca' }}>{data.alertMessage}</p>
                </div>

                {/* SAGE ROUTE AND SIMULATION */}
                <div className='sr-container'>
                    <strong style={{ color: '#6ee7b7', fontSize: '13px', }}>🛟SAFE ROUTE SUGGESTION</strong>
                    <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#a7f3d0' }}>{data.safeRoute}</p>
                    <button onClick={handleSimulation} disabled={simulating}
                        style={{ marginTop: '10px', width: '100%', padding: '8px', backgroundColor: simulating ? '#059669' : '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', transition: '0.2s' }}>
                        {simulating ? 'Running Simulation...' : 'Run What-If Simulation'}
                    </button>
                </div>
            </div>
        </>
    )
}

export default NowcastStats