import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'

const LoginComponent = () => (
    <div className="jumbotron text-center">
        <h1>E-pamiętnik</h1>
        <p>Zatrzymaj swoje wspomnienia;)</p>
        <form action="/signin/facebook" method="post">
            <button type="submit" className="btn btn-default">Login</button>
        </form>
    </div>
);

const LogoutComponent = (props) => (
    <div>
        <nav className="navbar navbar-default">
        <div className="container-fluid">
            <div className="navbar-header">
                <a className="navbar-brand" href="/">E-pamiętnik logowanie</a>
            </div>
            <ul className="nav navbar-nav">
                <li className="active"><a href="/api/calendar">Kalendarz</a></li>
            </ul>
        </div>
        </nav>
    <div className="jumbotron text-center">
            <div>
                <h1>{props.name}</h1>
                <button onClick={props.logout} className="btn btn-default">Logout</button>
            </div>
    </div>
    </div>
);

class Facebook extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {isLogged: null};
    }

    componentDidMount() {
        fetch('/api/session', {credentials: 'same-origin'})
            .then(res => res.json())
            .then(session => this.setState({isLogged : session.name}));
    }

    logout() {
        console.log("logout");
        fetch('/api/session', {method: 'delete', credentials: 'same-origin'})
            .then(res => this.setState({isLogged: null}));
    }

    render() {
        const profile = this.state.isLogged ?
            <LogoutComponent name={this.state.isLogged} logout={() => this.logout()}/> :
            <LoginComponent />;
        return (
            <div>
                {profile}
            </div>
        )
    }
}

ReactDOM.render(<Facebook />, document.getElementById('root'));