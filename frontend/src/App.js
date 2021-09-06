import React, { Component } from 'react';
import { BrowserRouter  as Router, Switch, Route } from "react-router-dom";

import UserProvider from "./contexts/UserProvider";
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import VideoPage from './pages/VideoPage';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="app">
                <Router >
                    <UserProvider>
                        <Switch>
                            <Route exact path="/" render={() => <LoginPage/>}>
                            </Route>
                            <Route exact path="/register" render={() => <RegisterPage/>}></Route>
                            <Route exact path="/video" render={() =><VideoPage /> }></Route>
                            <Route path="*" render={() => <NotFoundPage />}></Route>
                        </Switch>
                    </UserProvider>
                </Router>
            </div>
        );
    }
}

export default App;