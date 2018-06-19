import React, {Component} from 'react'
import firebase from 'firebase'
import ApplePhoneTemplate from '../../templates/ApplePhoneTemplate'

class SettingPage extends Component {
    constructor () {
        super();
        this.state = {
            user: null,
        }
    }

    componentDidMount () {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
            this.setState({user});
        });
    }

    componentWillUnmount () {
        this.unregisterAuthObserver();
    }

    handleLogOut = () => {
        firebase.auth().signOut();
    };

    render () {
        return (
            <ApplePhoneTemplate>
                <h3>Setting Page</h3>
                {this.state.user &&
                <div>
                    <p>{this.state.user.displayName}</p>
                    <p>{this.state.user.email}</p>
                    <p>{this.state.user.uid}</p>
                </div>
                }
                <button onClick={this.handleLogOut}>Logout</button>
            </ApplePhoneTemplate>
        );
    }
}

export default SettingPage;
