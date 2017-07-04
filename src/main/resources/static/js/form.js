import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'url-search-params-polyfill';

const Content = (props) => (
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
                <h3>{props.name}</h3>
                <h3>{props.day}</h3>
                <h3>{props.startTime}</h3>
                <h3>{props.endTime}</h3>
                <h3>{props.content}</h3>
            </div>
        </div>
    </div>
);

class Form extends React.Component {

    constructor(props) {
        super();
        this.state = {
            name: '',
            day: '',
            startTime: '',
            endTime: '',
            content: ''
        }
    }
    componentWillMount() {
        let search = new URLSearchParams (window.location.search);
        this.setState({
            name: search.get("name"),
            day: search.get("day"),
            startTime: search.get("startTime"),
            endTime: search.get("endTime"),
            content: search.get("content")
        })
    }
    render() {
        var search = new URLSearchParams (window.location.search);
        search.forEach(function (item) {
            console.log(item);
        });
        return (
            <div>
                <Content name={this.state.name} day={this.state.day} startTime={this.state.startTime} endTime={this.state.endTime} content={this.state.content}/>
            </div>
        )
    }
}

ReactDOM.render(<Form />, document.getElementById('component'));