import React from 'react';
import './style.css';
import Autosuggest from 'react-autosuggest';

let caracters = [];


fetch(`/api/character`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'access-control-allow-origin': '*'},
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (data) {
        // console.log("Respuesta de API", data);
        let caractersJson = data.results;
        caracters.push(caractersJson);
      } else {
        console.log('Error en consulta de API');
      }
});

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  const caractersLength = caracters[0].length;
    return inputLength === 0 ? [] : caracters[0].filter(lang =>
        lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );  
};

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);

class InputSuggestions extends React.Component {
  constructor(props) {
    super();
    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    console.log(suggestionValue);
    this.props.onSelectCaracter(suggestionValue);
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Escriba un nombre',
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        className="autosuggest-container"
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default InputSuggestions; 