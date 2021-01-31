import React, { Component } from 'react';
import './App.css';

import { Link, Route, Switch, BrowserRouter } from 'react-router-dom';
import { Box, Heading, Grommet } from 'grommet';

import { Home, Login, Logout, Register, Loading, Verify, Profile } from 'Pages';

class App extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            mag:'',
            loading:true,
            isLoggedIn:false,
            verified:false,
            firstname: '',
            lastname: '',
            avatar: '',
            username: ''
            
        };

        this.logout = this.logout.bind(this);
        this.login = this.login.bind(this);
    }

    login(data) {
        this.setState({isLoggedIn: true, firstname:data.firstname, lastname:data.lastname, verified:data.verified, avatar: data.avatar, username: data.username});
    }

    logout() {
        this.setState({
            mag:'',
            isLoggedIn:false,
            verified:false,
            firstname: '',
            lastname: '',
            avatar: '',
            username: ''
        });

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;

        fetch('/api/checkToken', {
            headers: {
                'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                if (this._isMounted) {
                    this.setState({
                        msg: "PLEASE LOGIN FIRST.",
                        isLoggedIn:false,
                        loading:false
                    });
                }
            }
        })
        .then(data => {
            if (data) {
                if (this._isMounted) {
                    this.setState({
                        firstname: data.firstname,
                        lastname: data.lastname,
                        username: data.username,
                        avatar: data.avatar,
                        msg: "USER LOGGED IN!",
                        isLoggedIn:true,
                        loading:false,
                        verified: data.verified
                    });
                }
            }
            
        }) 
        .catch(err => {
            console.error(err);
            alert('Error checking token');
        });
        
    }


    render() {
        console.log("APP STATE", this.state);
        var propsData = {
            login: this.login,
            logout:this.logout,
            logout:this.logout,
            firstname:this.state.firstname,
            lastname:this.state.lastname,
            username:this.state.username,
            avatar:this.state.avatar,
            verified:this.state.verified,
            isLoggedIn:this.state.isLoggedIn,
            color1: '#fff',
            color2: '#999',
            color3: '#555',
            color4: '#4b9cd5',
            color5: '#aa3333'
        };

        var content = this.state.loading ? <Loading data={propsData}/> : <Home data={propsData}/>;
        //var content = <Loading data={propsData}/>;
        
        return (
          <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={() => 
                        content
                    }/>
                    <Route exact path="/login" component={() =>
                        <Login data={propsData}/>
                    }/>
                    <Route exact path="/logout" component={() =>
                        <Logout data={propsData}/>
                    }/>
                    <Route exact path="/register" component={() =>
                        <Register data={propsData}/>

                    }/>
                    <Route exact path="/verify" component={() =>
                        <Verify data={propsData}/>

                    }/>
                    <Route exact path="/profile" component={() =>
                        <Profile data={propsData}/>

                    }/>

                    
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
