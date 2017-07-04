import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

const Whatever = () => (
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
                <h2>Test formy</h2>
            </div>
        </div>
    </div>
);

class Form extends React.Component {
    render() {
        return (
            <div>
                <Whatever/>
            </div>
        )
    }
}

ReactDOM.render(<Form />, document.getElementById('component'));