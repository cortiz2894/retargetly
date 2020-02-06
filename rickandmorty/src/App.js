import React, { useState, useEffect } from 'react';
import './App.css';

//Componentes

import CardContainer from './components/CardContainer';
import InputSuggestions from './components/Input';

function App() {

  //States
  const [caracters, setCaracters] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    if(caracters == null){
      callRickApi('');
    }
  });

  //Functions
  const callRickApi = (filter) => {
    fetch(`/api/character/${filter}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'access-control-allow-origin': '*'},
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data) {
          // console.log("Respuesta de API", data);
          setCaracters(data.results);
        } else {
          console.log('Error en consulta de API');
        }
      });
  }

  const handleCaracter = (caracterValue) => {
    console.log("Caracter seleccionado from child", caracterValue);
    setCaracters(null)
    callRickApi(`?name=${caracterValue}`)
  }
  
  return (
    <div className="App">
      <div className="title-container">
        <h1>Rick And Morty App</h1>
      </div>
      <div className="filtros-container">
        <p>Filtros:</p>
        <InputSuggestions
          onSelectCaracter={handleCaracter}
        ></InputSuggestions>
      </div>
      {caracters ? (
        <div className="container-caracter-list">
            {caracters.map(function(caracter, i){
              return <CardContainer info={caracter}></CardContainer>
            })}
        </div>
      ):(
        <div className="loader">
          <img src={require('../src/assets/loading.gif')} />
        </div>
      )}
      
      
    </div>
  );
}

export default App;
