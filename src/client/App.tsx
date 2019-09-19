import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Admin from './Pages/Admin';
import View from './Pages/View';
import Edit from './Pages/Edit';
import Login from './Pages/Login';


class App extends React.Component<IAppProps, IAppState> {




    render() {
        return (
            <Router>
                <main className="container">
                    <nav className="narbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-around">
                        <Link to="/">All Blogs</Link>
                        <Link to="/admin">Admins</Link>
                    </nav>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/admin" component={Admin} />
                        <Route exact path="/view/:id" component={View} />
                        <Route exact path="/edit/:id" component={Edit} />
                        <Route exact path="/login" component={Login} />
                    </Switch>
                </main>
            </Router>
        )
    }
}

export interface IAppProps { }

export interface IAppState { }

export default App;