import React, { Component } from 'react';

class Calendar extends Component {

  get mounthNames() {
    return ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
      "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
  }

  constructor(props) {
    super(props);
    
    this.currentDate = new Date();

    this.fillWeeks(this.currentDate);   

    this.state = {
      mounthName: this.mounthNames[this.currentDate.getMonth()],
      mounth: this.currentDate.getMonth(),
      year: this.currentDate.getFullYear(),
      weeks: this.weeks
    };

    this.selectDay = this.selectDay.bind(this);
    this.back = this.back.bind(this);
    this.forward = this.forward.bind(this);
  }

  fillWeeks(date) {
    this.weeks = [];
    for (var i = 0; i <= 5; i++) {
      this.weeks.push([]);
      for (var j = 0; j <= 6; j++) {
        this.weeks[i].push({ color: 'black', name: '' });
      }
    }

    var countDays = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
    j = 0;
    for (i = 1; i <= countDays; i++) {
      var d = new Date(date.getFullYear(), date.getMonth(), i);
      var dayOfWeek = (d.getDay() ? d.getDay() - 1 : 6);
      this.weeks[j][dayOfWeek].name = i;
      if (dayOfWeek === 6) j++;
    }

    this.props.dates && this.props.dates.forEach(function(element){
      if (element.date.getFullYear() === date.getFullYear() &&element.date.getMonth() === date.getMonth()) {
        this.setColorDay(element.date.getDate(), element.color);
      }
    }.bind(this));
    
  }

  setColorDay(dayName, color) {
    this.weeks.forEach(function (week) {
      var findedDay = week.find(function (day) {
        return day.name === parseInt(dayName, 10);
      })
      findedDay && (findedDay.color = color);
    })
  }

  selectDay(e) {
    this.setColorDay(e.target.innerText, 'blue');   
    this.setState({
      mounthName: this.mounthNames[this.currentDate.getMonth()],
      mounth: this.currentDate.getMonth(),
      year: this.currentDate.getFullYear(),
      weeks: this.weeks
    });
  }

  back() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    
    this.fillWeeks(this.currentDate);

    this.setState({
      mounthName: this.mounthNames[this.currentDate.getMonth()],
      mounth: this.currentDate.getMonth(),
      year: this.currentDate.getFullYear(),
      weeks: this.weeks
    });
  }

  forward() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);

    this.fillWeeks(this.currentDate);

    this.setState({
      mounthName: this.mounthNames[this.currentDate.getMonth()],
      mounth: this.currentDate.getMonth(),
      year: this.currentDate.getFullYear(),
      weeks: this.weeks
    });
  }

  render() {
    return (
      <div>

        <button onClick={this.back}>{'<'}</button>
        <span style={{ margin: '0 8px' }}>{this.state.mounthName + ' ' + this.state.year}</span>
        <button onClick={this.forward}>{'>'}</button>

        <table>
          <tbody>
          {
            this.state.weeks.map(function (week, index) {
              return (
                <tr key={index}>
                  {
                    week.map(function (day, index) {
                      return (
                        <td key={index}>
                          <div style={{ color: day.color, cursor: 'pointer' }} onClick={this.selectDay} >{day.name}</div>
                        </td>
                      );
                    }.bind(this))
                  }
                </tr>
              );
            }.bind(this))
          }
          </tbody>
        </table>

      </div>
    );
  }

}

export default Calendar;