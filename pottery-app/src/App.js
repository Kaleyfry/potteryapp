import React, { useState } from 'react';
import PotteryForm from './components/PotteryForm';
import PotteryList from './components/PotteryList';

function App() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div style={{ paddingLeft: "20px" }}>
      <h1>Pottery Orders</h1>
      <PotteryForm onAdd={() => setRefresh(refresh + 1)} />
      <PotteryList refresh={refresh} />
    </div>
  );
} 

export default App;