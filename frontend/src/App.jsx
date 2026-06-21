import { useState } from 'react';
import SensorForm from './components/SensorForm';
import Dashboard from './components/Dashboard';
import './App.css'; 

function App() {
  // State to track what is visible on the screen. Defaults to 'form'.
  const [activeView, setActiveView] = useState('form'); 

  return (
    <div className="app-root">
      {/* App-Level Navigation Bar */}
      <nav className="app-navigation">
        <button 
          className={activeView === 'form' ? 'nav-btn active-tab' : 'nav-btn'} 
          onClick={() => setActiveView('form')}
        >
          Device Configurator
        </button>
        <button 
          className={activeView === 'dashboard' ? 'nav-btn active-tab' : 'nav-btn'} 
          onClick={() => setActiveView('dashboard')}
        >
          Operations Dashboard
        </button>
      </nav>

      {/* Conditional Rendering: Show Form if 'form', otherwise show Dashboard */}
      <div className="view-container">
        {activeView === 'form' ? <SensorForm /> : <Dashboard />}
      </div>
    </div>
  );
}

export default App;