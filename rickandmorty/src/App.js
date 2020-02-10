import React, { useState, useEffect } from 'react';
import './App.css';

//Material UI

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

//Componentes

import CardContainer from './components/CardContainer';
import InputSuggestions from './components/Input';
import SimpleSelect from './components/Select'


const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function App() {

  const classes = useStyles();

  //States
  const [caracters, setCaracters] = useState(null);
  const [filtersState, setfiltersState] = useState(null)
  const [noResults, setNoResults] = useState(false)

  //Options

  let species = ["Alien", "Human"];
  let gender = ["Female", "Male", "Genderless", "Unknown"];

  useEffect(() => {
    if(caracters == null){
      callRickApi('');
    }
  });

  //Functions
  const callRickApi = (filter) => {
    setCaracters(false)
    let parameters = '';
    if (filter != undefined) {
      if (filter.specie) {
          parameters = parameters + `&species=${filter.specie}`;
      }
      if (filter.gender) {
        parameters = parameters + `&gender=${filter.gender}`;
      }
      if (filter.name) {
        parameters = parameters + `&name=${filter.name}`;
      }
    }
    fetch(`/api/character/?${parameters}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'access-control-allow-origin': '*'},
    })
      .then(response => {
        console.log("estado de la respuesta: ", response.status);
        if(response.status != 200){
          setNoResults(true);
        }else{
          return response.json();
        }
      })
      .then(data => {
        if (data) {
          setNoResults(false);
          setCaracters(data.results);
        } else {
          console.log('Error en consulta de API');
        }
      });
  }
  const handleFilterSpecie = (value) => {
    const filters = {
      ...filtersState, 
      specie: value, 
    };
    setfiltersState(filters);
    callRickApi(filters);
  }

  const handleFilterCaracter = (value) => {
    const filters = {
      ...filtersState, 
      name: value, 
    };
    setfiltersState(filters);
    callRickApi(filters);
  }

  const handleFilterGender = (value) => {
    const filters = {
      ...filtersState, 
      gender: value, 
    };
    setfiltersState(filters);
    callRickApi(filters);
  }
  

  const handleResetFilter = () => {
    callRickApi();
  }
  
  return (
    <div className="App">
      <div className="title-container">
        <h1>Rick And Morty App</h1>
      </div>
      <div className="filtros-container">
        <p>Filtros:</p>
        <div className="container">
          <InputSuggestions
            onSelectCaracter={handleFilterCaracter}
          >
          </InputSuggestions>
          <SimpleSelect
            onSelect={handleFilterSpecie}
            options={species}
            titleFilter={"Species"}
          >
          </SimpleSelect>
          <SimpleSelect
            onSelect={handleFilterGender}
            options={gender}
            titleFilter={"Gender"}
          >
          </SimpleSelect>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={handleResetFilter}
          >
            Quitar filtros
          </Button>
        </div>
      </div>
      {noResults ?(
        <div className="no-result">NO SE ENCONTRARON RESULTADOS</div>
      ):(
        <div>
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
      )}
    </div>
  );
}

export default App;
