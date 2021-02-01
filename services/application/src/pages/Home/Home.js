import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link, Route, Switch, BrowserRouter } from 'react-router-dom';

import { grommet, Grommet, Anchor, Box, Button, Header, Nav, Image, Text, ResponsiveContext, DropButton, Menu } from 'grommet';

import { Login, Notes, Logout, Organization, User, StatusCritical, Refresh, CheckboxSelected, FormDown, Configure, Notification } from "grommet-icons";
import "./Home.css";

import {Banner, Logo} from 'Media';
import {Dashboard} from 'Components';

import Avatar from 'react-avatar';

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            resent: false,
            tag:''
        };
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
    }
    
    componentDidMount() {
        this.setState(this.props.data);
    }

    resendEmail() {
        
        fetch('/api/sendVerification', {
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
                'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status === 200) {
                this.setState({resent: true});
            }
        })
        .catch(err => {
            console.error(err);
        });
    }

    render() {

        const customTheme = {
            global: {
              colors: {
                custom: this.props.data.color1
              }
            }
        };

        return (
            <Grommet theme={customTheme}>

                {this.state.isLoggedIn ?
                    <Box
                        pad="none"
                        width="100vw"
                        height="100vh"
                        round="small"
                        direction="column"
                        gap="xxsmall"
                        align="center"
                        justify="center"                        
                    >
                        <Box 
                            width="100%" 
                            direction="row" 
                            align="center" 
                            justify="between" 
                            background={this.props.data.color1} 
                            pad="xsmall" 
                        >
                                
                            <Box direction="row" align="center">
                                <Link to={"/"} style={{ textDecoration: 'none' }}>
                                    <ResponsiveContext.Consumer>
                                        {responsive => responsive === "small" ? (
                                            <Box
                                                pad="none"
                                                height="auto"
                                                width="60px"
                                                round="small"
                                                direction="row"
                                                align="center"
                                                margin={{"left":"5px"}}
                                                gap="xsmall"
                                            >
                                                <Image src={Logo} fit="contain"/>
                                            </Box>
                                        ) : (
                                            <Box
                                                pad="none"
                                                height="auto"
                                                width="160px"
                                                round="small"
                                                direction="row"
                                                align="center"
                                                margin={{"left":"5px"}}
                                                gap="xsmall"
                                            >
                                                <Image src={Banner} fit="contain"/>
                                            </Box>
                                        )}
                                    </ResponsiveContext.Consumer>
                                </Link>
                            </Box>
                            <Nav direction="row" align="center">
                                
                                <Link to={"/user/" + this.props.data.username} style={{ textDecoration: 'none' }} className="hover-button">
                                    <Box
                                        direction="row"
                                        gap="small"
                                        align="center"
                                        justify="center"
                                        hoverIndicator
                                        pad={{
                                            "top":"xsmall",
                                            "bottom":"xsmall",
                                            "left":"small",
                                            "right":"small"
                                        }}
                                        
                                    >
                                        {this.props.data.avatarType == 0 ?
                                            <Avatar 
                                                name={this.props.data.getFullName()}
                                                src={this.props.data.avatar} 
                                                size="40" 
                                                round={true}
                                            />
                                        :
                                            <Avatar 
                                                name={this.props.data.getFullName()}
                                                githubHandle={this.props.data.avatar} 
                                                size="40" 
                                                round={true}
                                            />
                                        }
                                        <Text color={this.props.data.color3}>
                                            {this.props.data.getName()}
                                        </Text>
                                    </Box>
                                    
                                </Link>

                                <Menu
                                    children={
                                        <Box pad="small" className="hover-button" direction="row" justify="center" align="start">
                                            <Notification />
                                            <Box width="8px" height="8px" background="red" round="100%">
                                            </Box>
                                        </Box>
                                    }
                                    plain
                                    size="large"
                                    dropProps={{ align: { top: 'bottom', left: 'left' } }}
                                    items={[
                                        {
                                            label: 
                                                <Box
                                                    width="300px"
                                                    height="40px"
                                                    alignSelf="center"
                                                    direction="row"
                                                    align="center"
                                                    justify="center"
                                                    pad={{"left":"small", "right":"small"}}
                                                >
                                                    <Box
                                                        width="255px"
                                                        height="40px"
                                                        alignSelf="center"
                                                        direction="column"
                                                        align="start"
                                                        justify="center"
                                                        pad={{"left":"small", "right":"small"}}
                                                    >
                                                        <Text color={this.props.data.color3}>
                                                            Test Notification
                                                        </Text>
                                                        <Text
                                                            color={this.props.data.color2}
                                                            size="xsmall"
                                                        >
                                                            somet other notification
                                                        </Text>
                                                    </Box>
                                                    <Box width="8px" height="8px" background="red" round="100%">
                                                    </Box>
                                                </Box>
                                            ,
                                            href: "",
                                            icon: 
                                                <Box
                                                    width="auto"
                                                    height="auto"
                                                    alignSelf="center"
                                                    direction="column"
                                                    align="center"
                                                    justify="center"
                                                >
                                                    <FormDown size="20px"/>
                                                </Box>
                                        }
                                    ]}
                                />
                                
                                <Menu
                                    children={<Box pad="small" className="hover-button"><FormDown /></Box>}
                                    plain
                                    dropProps={{ align: { top: 'bottom', left: 'left' } }}
                                    items={[
                                        {
                                            label: 
                                                <Box
                                                    alignSelf="center"
                                                    direction="column"
                                                    align="start"
                                                    justify="center"
                                                    pad={{"left":"small", "right":"small"}}
                                                >
                                                    <Text color={this.props.data.color3}>
                                                        {this.props.data.getFullName()}
                                                    </Text>
                                                    <Text
                                                        color={this.props.data.color2}
                                                        size="xsmall"
                                                    >
                                                        See your profile
                                                    </Text>
                                                </Box>
                                            ,
                                            href: "/user/" + this.props.data.username,
                                            icon: 
                                                this.props.data.avatarType == 0 ?
                                                    <Avatar 
                                                        name={this.props.data.getFullName()}
                                                        src={this.props.data.avatar} 
                                                        size="40" 
                                                        round={true}
                                                    />
                                                :
                                                    <Avatar 
                                                        name={this.props.data.getFullName()}
                                                        githubHandle={this.props.data.avatar} 
                                                        size="40" 
                                                        round={true}
                                                    />
                                            ,
                                        },
                                        {
                                            label: 
                                                <Box
                                                    alignSelf="center"
                                                    direction="column"
                                                    align="start"
                                                    justify="center"
                                                    pad={{"left":"small", "right":"small"}}
                                                >
                                                    <Text color={this.props.data.color3}>
                                                        Settings
                                                    </Text>
                                                </Box>
                                            ,
                                            onClick: () => {},
                                            icon: (
                                                <Configure color={this.props.data.color3} size='20px' />
                                            ),
                                        },
                                        {
                                            label: 
                                                <Box
                                                    alignSelf="center"
                                                    direction="column"
                                                    align="start"
                                                    justify="center"
                                                    pad={{"left":"small", "right":"small"}}
                                                >
                                                    <Text color={this.props.data.color3}>
                                                        Logout
                                                    </Text>
                                                </Box>
                                            ,
                                            href: "/logout",
                                            icon: (
                                                <Logout color={this.props.data.color3} size='20px' />
                                            ),
                                        },
                                    ]}
                                /> 
                            </Nav>
                        </Box>
                        <Box fill background='none'>
                            <Dashboard data={this.props.data}/>
                        </Box>
                    </Box>

                :
                    <Box
                        pad="none"
                        width="100vw"
                        height="100vh"
                        round="small"
                        direction="column"
                        align="center"
                        justify="center"
                        gap="small"
                    >
                        <ResponsiveContext.Consumer>
                            {responsive => responsive === "small" ? (
                                <Box
                                    pad="none"
                                    width="90%"
                                    height="auto"
                                    round="small"
                                    direction="row"
                                    align="center"
                                    justify="center"
                                    gap="small"
                                >
                                    
                                    <Image src={Banner} fit="contain"/>
                                </Box>
                            ) : (
                                <Box
                                    pad="none"
                                    width="60%"
                                    height="auto"
                                    round="small"
                                    direction="row"
                                    align="center"
                                    justify="center"
                                    gap="small"
                                >
                                    
                                    <Image src={Banner} fit="contain"/>
                                </Box>
                            )}
                        </ResponsiveContext.Consumer>
                        <Box
                            pad="none"
                            width="auto"
                            height="auto"
                            round="small"
                            direction="row"
                            align="center"
                            justify="center"
                            gap="small"
                        >
                            {!this.state.isLoggedIn && 
                                <Link to="/register" style={{ textDecoration: 'none' }}>
                                    <Box direction="row" align="center" gap="xsmall">
                                        <Notes color={this.props.data.color2} size='20px' />
                                        <Text color={this.props.data.color3}>Register</Text>
                                    </Box>
                                </Link>
                            }
                            
                            {!this.state.isLoggedIn && 
                                <Link to="/login" style={{ textDecoration: 'none' }}>
                                    <Box direction="row" align="center" gap="xsmall">
                                        <Login color={this.props.data.color2} size='20px' />
                                        <Text color={this.props.data.color3}>Login</Text>
                                    </Box>
                                </Link>
                            }
                        </Box>
                    </Box>
                }
            
                
            </Grommet>
        );
    }
    
}

export default withRouter(Home);