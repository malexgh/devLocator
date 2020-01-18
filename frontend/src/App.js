import React, { useState, useEffect } from 'react';
import api from './services/api';
import DevForm from './components/DevForm';
import DevItem from './components/DevItem';
import './sass/index.scss';

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const res = await api.get('/devs');
      setDevs(res.data);
    }
    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const res = await api.post('/devs', data);
    setDevs(previous => [...previous, res.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => <DevItem key={dev._id} dev={dev} />)}
        </ul>
      </main>
    </div>
  );
}

export default App;
