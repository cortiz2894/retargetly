import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './style.css';

export default function SimpleSelect(props) {
  const [specie, setSpecie] = React.useState('');
  
  React.useEffect(() => {
  }, []);


  const handleChange = event => {
    setSpecie(event.target.value);
    props.onSelect(event.target.value)
  };
  

  return (
    
    <div className="filter-select">
      <FormControl>
        <InputLabel id="demo-simple-select-label">{props.titleFilter}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>Todos</em>
          </MenuItem>
          {props.options.map((option) =>
            <MenuItem value={option}>{option}</MenuItem>
          )}
          
        </Select>
      </FormControl>
    </div>
  );
}