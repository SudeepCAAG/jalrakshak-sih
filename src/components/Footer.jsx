import React from 'react';

const Footer = () => {
  return (
    <footer 
      style={{ 
        marginTop: '40px', 
        paddingTop: '15px', 
        borderTop: '1px solid #334155', // উপরে একটি হালকা দাগ
        color: '#94a3b8', 
        fontSize: '13px', 
        display: 'flex', 
        justifyContent: 'space-between', // বাম ও ডান পাশে টেক্সট সরানোর জন্য
        alignItems: 'center' 
      }}
      >
      <div>
        <strong style={{ color: '#cbd5e1' }}>Urban Flood Nowcasting System</strong> | Smart India Hackathon 2026
      </div>
      
      <div>
        <span>📡 Data Source: Live Rainfall Engine & GIS Radar</span>
      </div>
    </footer>
  );
};

export default Footer;