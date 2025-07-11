import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setMessage('Testing connection...');
    
    try {
      const response = await fetch('/api/test-db');
      const data = await response.json();
      
      if (data.success) {
        setMessage(`✅ Success: ${data.message}`);
      } else {
        setMessage(`❌ Failed: ${data.message} - ${data.error}`);
      }
    } catch (err) {
      setMessage(`🚫 Network error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>MySQL 8.4 Connection Test</h1>
      <button 
        onClick={testConnection}
        disabled={loading}
        style={{
          padding: '0.5rem 1rem',
          background: loading ? '#ccc' : '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >
        {loading ? 'Testing...' : 'Test Database Connection'}
      </button>
      
      {message && (
        <div style={{ 
          marginTop: '1rem', 
          padding: '1rem', 
          background: message.includes('✅') ? '#e6ffec' : '#ffe6e6',
          border: `1px solid ${message.includes('✅') ? '#79d279' : '#ff9999'}`,
          borderRadius: '4px'
        }}>
          {message}
        </div>
      )}
    </div>
  );
}