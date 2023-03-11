import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

interface Plant {
  PlantName: string;
  Id: string;
  LastWatered?: Date;
};

function App() {
  async function addNewPlantToDatabase(newPlant : Plant) {
    await axios.post('https://plantoapi.azurewebsites.net/addPlant', newPlant)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  function generateGUID(): string {
    let guid = "";
    for (let i = 0; i < 32; i++) {
      const hex = Math.floor(Math.random() * 16).toString(16);
      guid += hex;
      if (i === 7 || i === 11 || i === 15 || i === 19) {
        guid += "-";
      }
    }
    return guid;
  }

  // call addNewPlant with useEffect
  React.useEffect(() => {
    // Create a test plant with a name and a guid
    const testPlant:Plant = {
      PlantName: 'DUDAA',
      Id: generateGUID()
    };
    // Call the addNewPlantToDatabase function
    addNewPlantToDatabase(testPlant);
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
