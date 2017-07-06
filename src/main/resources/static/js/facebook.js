import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

const LoginComponent = () => (
    <div className="jumbotron text-center">
        <h1>E-pamiętnik</h1>
        <p>Zatrzymaj swoje wspomnienia;)</p>
        <form action="/signin/facebook" method="post">
            <button type="submit" className="btn btn-primary">Zaloguj się przez Facebook'a</button>
        </form>
    </div>
);

const LogoutComponent = (props) => (
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
                <li><a href="/api/form">Dodaj wspomnienie</a></li>
            </ul>
        </div>
        </nav>
    <div className="jumbotron text-center">
            <div>
                <h1>Witaj!</h1>
                <h3><b>{props.name}</b>, do twojej dyspozycji w naszej aplikacji są zakładki: </h3>
                <h3><b>Pamętnik</b>, który wyświetla kalendarz z twoimi wspomnieniami</h3>
                <h3><b>Dodaj wspomnienie</b>, które pozwala Ci na dodanie nowego wspomnienia</h3>
                <h3>Baw się dobrze!</h3>
                <h3></h3>
                <button onClick={props.logout} className="btn btn-primary">Wyloguj się</button>
            </div>
    </div>
    </div>
);

class Facebook extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {isLogged: null};
    }

    componentWillMount() {
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