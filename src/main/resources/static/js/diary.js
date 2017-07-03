import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import $ from 'jquery';

import 'fullcalendar/dist/fullcalendar.css';
import 'fullcalendar/dist/fullcalendar.js';

import axios from 'axios';

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
        axios.get('/api/calendar', {credentials: 'same-origin'}).then(res => {
            console.log(res.data);
            let diaryParts = res.data;
            var sourceEvents = [];
            diaryParts.forEach(function(diaryPart) {
                console.log(diaryPart.content);
                sourceEvents.push({
                    title: diaryPart.content,
                    date: Date.now(),
                    allDay: true
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

ReactDOM.render(<Diary />, document.getElementById('component'));


