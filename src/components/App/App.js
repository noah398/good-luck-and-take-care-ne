import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {injectGlobal, ThemeProvider} from 'styled-components'
import firebase from 'firebase'

import HomePage from '../pages/HomePage/HomePage'
import ComposePage from '../pages/ComposePage/ComposePage'
import LoginPage from '../pages/LoginPage/LoginPage'
import SettingPage from '../pages/SettingPage/SettingPage'
import SelectAvatarPage from '../pages/SelectAvatarPage/SelectAvatarPage'
import AvatarUploadPage from '../pages/AvatarUploadPage/AvatarUploadPage'

injectGlobal`
  body {
    margin: 0;
    padding: 0;
  }
`;

const PublicRoute = ({component: Component, isAuthenticated, ...rest}) => (
    <Route
        {...rest}
        render={(props) => isAuthenticated === false
            ? <Component {...props} />
            : <Redirect to='/'/>}
    />
);

const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) => (
    <Route
        {...rest}
        render={(props) => isAuthenticated
            ? <Component {...props} />
            : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
        }
    />
);

class App extends Component {
    constructor () {
        super();
        this.state = {
            isAuthenticated: false
        };
    }

    componentDidMount () {
        this.removeListener = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    isAuthenticated: true
                })
            } else {
                this.setState({
                    isAuthenticated: false
                })
            }
        })
    }

    componentWillUnmount () {
        this.removeListener()
    }

    render () {
        return (
            <ThemeProvider theme={theme}>
                <Switch>
                    <Route path="/" component={HomePage} exact/>
                    <PublicRoute isAuthenticated={this.state.isAuthenticated} path="/login" component={LoginPage}/>
                    <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/setting" component={SettingPage}/>
                    <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/compose" component={ComposePage}/>
                    <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/avatar" component={SelectAvatarPage}/>
                    <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/avatar-upload" component={AvatarUploadPage}/>
                    <Route component={HomePage}/>
                </Switch>
            </ThemeProvider>
        )
    }
}

const theme = {
    light: '#ffffff',
    dark: '#373E46',
    grey: '#C1D1E0',
    greyDark: '#798896',
    greyLight: '#F5F8FA'
};

export default App
