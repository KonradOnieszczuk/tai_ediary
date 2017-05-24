import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

class Diary extends React.Component {

    render() {
        return (
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
                        <h1>To be implemented ;)</h1>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Diary />, document.getElementById('component'));