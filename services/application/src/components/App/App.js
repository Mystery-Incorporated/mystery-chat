import React, { Component } from 'react';
import './App.css';

import { Link, Route, Switch, BrowserRouter } from 'react-router-dom';
import { Home, Login, Logout, Register, Loading, Verify, Profile } from 'Pages';


import { grommet, Grommet, Anchor, Box, Button, Header, Nav, Image, Avatar, Text, ResponsiveContext } from 'grommet';
import { Notes, Organization, User, StatusCritical, Refresh, CheckboxSelected } from "grommet-icons";

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
            username: '',
            following: [],
            avatarType: 0,
            notifications: []
        };

        this.logout = this.logout.bind(this);
        this.login = this.login.bind(this);
        this.getName = this.getName.bind(this);
        this.getNameAlt = this.getNameAlt.bind(this);
        this.getFullName = this.getFullName.bind(this);
        this.formatDOB = this.formatDOB.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.formatDateTime = this.formatDateTime.bind(this);
        this.readNotification = this.readNotification.bind(this);
    }

    formatDOB(dob) {
        if (dob) {
            var date = Date.parse(dob);
            var options = { month: 'long', day: 'numeric' };
            return new Intl.DateTimeFormat('en-US', options).format(date);
        }
    }

    formatDate(date) {
        if (date) {
            var date = Date.parse(date);
            var options = { };
            return new Intl.DateTimeFormat('en-US', options).format(date);
        }
    }

    formatDateTime(date) {
        if (date) {
            var date = Date.parse(date);
            var options = { dateStyle: 'medium', timeStyle: 'short' };
            return new Intl.DateTimeFormat('en-US', options).format(date);
        }
    }

    getName() {
        return this.getNameAlt(this.state.firstname);
    }

    readNotification(i) {
        let notifs = [ ...this.state.notifications ];
        notifs[i].read = true;
        console.log(notifs);
        this.setState({notifications:notifs});
    }

    getNameAlt(name) {
        var name = name.toLowerCase().split(' ');
        for (var i = 0; i < name.length; i++) {

            name[i] = name[i].charAt(0).toUpperCase() + name[i].substring(1);     
        }

        return name.join(' ');
    }

    getFullName() {
        return this.getNameAlt(this.state.firstname) + " " + this.getNameAlt(this.state.lastname);;
    }

    login(data) {
        this.setState({isLoggedIn: true, firstname:data.firstname, lastname:data.lastname, verified:data.verified, avatar: data.avatar, username: data.username, avatarType:data.avatarType, following:data.following, notifications:data.notifications});
    }

    logout() {
        this.setState({
            mag:'',
            isLoggedIn:false,
            verified:false,
            firstname: '',
            lastname: '',
            avatar: '',
            username: '',
            avatarType:0,
            following: [],
            notifications: []
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
                        avatarType:data.avatarType,
                        msg: "USER LOGGED IN!",
                        isLoggedIn:true,
                        loading:false,
                        verified: data.verified,
                        following: data.following,
                        notifications: data.notifications
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
            getName:this.getName,
            getNameAlt:this.getNameAlt,
            getFullName:this.getFullName,
            formatDOB:this.formatDOB,
            formatDate:this.formatDate,
            formatDateTime:this.formatDateTime,
            readNotification:this.readNotification,
            firstname:this.state.firstname,
            lastname:this.state.lastname,
            username:this.state.username,
            avatar:this.state.avatar,
            avatarType:this.state.avatarType,
            verified:this.state.verified,
            isLoggedIn:this.state.isLoggedIn,
            following:this.state.following,
            notifications:this.state.notifications,
            color1: '#fff',
            color2: '#999',
            color3: '#555',
            color4: '#4b9cd5',
            color5: '#aa3333',
            color6: '#e12727',
            color7: '#e19027',
            color8: '#eee',
            color9: '#ddd',
            color10: '#ccc',
            color11: '#e1e7ee',
            color12: '#222',
        };

        var content = this.state.loading ? <Loading data={propsData}/> : <Home data={propsData}/>;
        //var content = <Loading data={propsData}/>;
        
        return (
          <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={() => 
                        content
                    }/>
                    <Route exact path="/c/:id" component={() => 
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
                    <Route exact path="/user/:id" component={() =>
                        <Profile data={propsData}/>

                    }/>

                    
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
