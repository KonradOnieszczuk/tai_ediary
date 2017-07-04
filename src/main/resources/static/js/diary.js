import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import $ from 'jquery';

import 'fullcalendar/dist/fullcalendar.css';
import 'fullcalendar/dist/fullcalendar.js';


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 8)];
    }
    return color;
}

const Waiting = () => (
    <div>
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="/">E-pamiętnik strona główna</a>
                </div>
                <ul className="nav navbar-nav">
                    <li className="active"><a href="/api/diary">Pamiętnik</a></li>
                </ul>
                <ul className="nav navbar-nav">
                    <li><a href="/api/form">Dodaj wspomnienie</a></li>
                </ul>
            </div>
        </nav>
        <div className="jumbotron text-center">
            <div>
                <h2>Twój kalendarz jest pusty, spróbuj dodać nowe zdarzenie ;)</h2>
            </div>
        </div>
    </div>
);

const Initialized = (props) => (
    <div>
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="/">E-pamiętnik strona główna</a>
                </div>
                <ul className="nav navbar-nav">
                    <li className="active"><a href="/api/diary">Pamiętnik</a></li>
                </ul>
                <ul className="nav navbar-nav">
                    <li><a href="/api/form">Dodaj wspomnienie</a></li>
                </ul>
            </div>
        </nav>
        <div className="jumbotron text-center">
            <div>
                <Calendar events={props.events}/></div>
        </div>
    </div>
);

class Diary extends React.Component {

    constructor(props) {
        super();
        this.state = {
            events: []
        }
    }
    componentWillMount() {
        fetch('/api/calendar', {credentials: 'same-origin'})
            .then(r => r.json())
            .then(res => {
            let diaryParts = res;
            var sourceEvents = [];
            diaryParts.forEach(function(diaryPart) {
                let start = new Date(diaryPart.day.year, diaryPart.day.monthValue-1, diaryPart.day.dayOfMonth,
                    diaryPart.startTime.hour,diaryPart.startTime.minute);
                let end = new Date(diaryPart.day.year, diaryPart.day.monthValue-1, diaryPart.day.dayOfMonth,
                    diaryPart.endTime.hour,diaryPart.endTime.minute);
                let name = diaryPart.name;


                let startMinutes;
                let endMinutes;
                let month;
                if (diaryPart.startTime.minute === 0)
                    startMinutes = '00';
                else startMinutes = diaryPart.startTime.minute;
                if (diaryPart.endTime.minute === 0)
                    endMinutes = '00';
                else endMinutes = diaryPart.endTime.minute;
                if (diaryPart.day.monthValue < 10)
                    month = `0${diaryPart.day.monthValue}`;
                else month = diaryPart.day.monthValue;
                sourceEvents.push({
                    title: name,
                    start: start,
                    end: end,
                    url: `http://localhost:8080/api/form?name=${name}&day=${diaryPart.day.year}-${month}-${diaryPart.day.dayOfMonth}&startTime=${diaryPart.startTime.hour}:${startMinutes}&endTime=${diaryPart.endTime.hour}:${endMinutes}&content=${diaryPart.content}`,
                    color: getRandomColor()
                })
            });
          this.setState({
                events: this.state.events.concat(sourceEvents)
            })
        });
    }


    render() {
        let variant;
        if (this.state.events.length > 0) {
            variant = <Initialized events={this.state.events}/>
        } else {
            variant = <Waiting />
        }

        return (
            <div>
                {variant}
            </div>
        )
    }
}

class Calendar extends React.Component {
    componentDidMount() {
        const { calendar } = this.refs;
        $( calendar ).fullCalendar({
            events: this.props.events,
            lang: "pl",
            locale: "pl",
            height: "auto",
            editable: false,
            defaultView: "month",
            header: {
                left: 'month,agendaWeek,agendaDay',
                center: 'title',
                right: 'today prev,next'
            }
        });
    }

    render() {

        return (
            <div ref="calendar"></div>
        );
    }
}

ReactDOM.render(<Diary />, document.getElementById('element'));


