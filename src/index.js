import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './Calendar';

ReactDOM.render(
  <Calendar dates={
    [
      { color: "red", date: new Date('2017-08-05') }, 
      { color: "green", date: new Date('2017-08-06') }, 
      { color: "red", date: new Date('2017-12-31') }
    ]
  }/>, 
  document.getElementById('root')
);
