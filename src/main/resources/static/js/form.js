import 'rc-time-picker/assets/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'url-search-params-polyfill';
import { Grid, Row, Col } from 'react-flexbox-grid';
import DatePicker from 'react-bootstrap-date-picker'
import TimePicker from 'rc-time-picker';
import $ from 'jquery';

var ExampleForm = React.createClass({
    getInitialState: function () {
        let search = new URLSearchParams (window.location.search);
        return { form:
            {
                name: search.get("name"),
                day: search.get("day"),
                startTime: search.get("startTime"),
                endTime: search.get("endTime"),
                content: search.get("content")
            }
        }
    },
    onChange: function(event) {
        this.state.form[event.target.name] = event.target.value;

        this.setState({form: this.state.form});
    },
    onSubmit: function(event) {
        event.preventDefault();

        $.ajax({
            url: "/api/form/diaryPart",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(this.state.form),
            credentials: "same-origin",
            async: false,
            cache: false,
            processData:false,
            success: function(response) {
                alert(response)
            },
            error: function(e) {
                alert('Error');
            }
        });
    },
    render: function() {
        var self = this;
        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/">E-pamiętnik strona główna</a>
                        </div>
                        <ul className="nav navbar-nav">
                            <li><a href="/api/diary">Pamiętnik</a></li>
                        </ul>
                        <ul className="nav navbar-nav">
                            <li className="active"><a href="/api/form">Dodaj wspomnienie</a></li>
                        </ul>
                    </div>
                </nav>
                <div className="jumbotron text-center">
                    <div>
                        <Grid>
                            <form onSubmit={this.onSubmit}>
                                <Row>
                                    <Col xs={6}>
                                        <div className="form-group">
                                            <label ><p>Nazwa</p></label>
                                            <p><input type="text" name="name" value={this.state.form.name} onChange={this.onChange}/></p>
                                        </div>
                                    </Col>
                                    <Col xs={6}>
                                        <div className="form-group">
                                            <label ><p>Dzień</p></label>
                                            <p><input type="text" name="day" value={this.state.form.day} onChange={this.onChange}/></p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={6}>
                                        <div className="form-group">
                                            <label ><p>Czas rozpoczęcia</p></label>
                                            <p><input type="text" name="startTime" value={this.state.form.startTime} onChange={this.onChange}/></p>
                                        </div>
                                    </Col>
                                    <Col xs={6}>
                                        <div className="form-group">
                                            <label ><p>Czas zakończenia</p></label>
                                            <p><input type="text" name="endTime" value={this.state.form.endTime} onChange={this.onChange}/></p>
                                        </div>
                                    </Col>
                                </Row>
                                <div className="form-group">
                                    <label ><p>Zawartość</p></label>
                                    <p><input type="text" name="content" value={this.state.form.content} onChange={this.onChange}/></p>
                                    <small className="form-text text-muted"><p>Skończyłeś pisać już swoje wspomnienie?</p></small>
                                </div>
                                <button type="submit" className="btn btn-primary">Dodaj wspomnienie!</button>
                            </form>
                        </Grid>
                    </div>
                </div>
            </div>
        )
    }
});

ReactDOM.render(<ExampleForm />, document.getElementById('component'));