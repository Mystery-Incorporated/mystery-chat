import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link, Route, Switch, BrowserRouter } from 'react-router-dom';

import { grommet, Grommet, Anchor, Box, Button, Header, Nav, Image, Avatar, Text, ResponsiveContext, DropButton } from 'grommet';

import { Login, Notes, Logout, Organization, User, StatusCritical, Refresh, CheckboxSelected } from "grommet-icons";
import "./Home.css";

import {Banner, Logo} from 'Media';
import {Dashboard} from 'Components';

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
                            border="bottom"
                        >
                                
                            <Box direction="row" align="center">
                                <Link to={"/"} style={{ textDecoration: 'none' }}>
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
                                </Link>
                            </Box>
                            <Nav direction="row" align="center">
                                {!this.props.data.verified &&
                                    <Box width={{"min":"200px"}} height="45px" direction="row" background={this.props.data.color3} round="medium" align="center" gap="small" pad="small">
                                        <StatusCritical color={this.props.data.color2} />
                                        <Text color={this.props.data.color2}>Email not verified!</Text>
                                        {!this.state.resent ?
                                            <Button 
                                                size="small" 
                                                color={this.props.data.color1} 
                                                icon={<Refresh />} 
                                                primary label="Resend" 
                                                onClick={() => this.resendEmail()}
                                                gap="xxsmall"
                                                margin="none"
                                            />
                                        :
                                            <Button 
                                                size="small" 
                                                color={this.props.data.color2} 
                                                icon={<CheckboxSelected color={this.props.data.color3} />} 
                                                primary label="Sent!" 
                                                disabled="true"
                                                gap="xxsmall"
                                            />
                                            
                                        }
                                    </Box>
                                }

                                <Link to={"/user/" + this.props.data.username} style={{ textDecoration: 'none' }}>
                                    <Box
                                        direction="row"
                                        gap="xsmall"
                                        align="center"
                                        justify="center"
                                    >
                                        <Avatar background={this.props.data.color1}>
                                            <User color="dark-1" />
                                        </Avatar>
                                        <Text color={this.props.data.color3}>
                                            {this.props.data.firstname}
                                        </Text>
                                    </Box>
                                    
                                </Link>

                                <Link to="/settings" style={{ textDecoration: 'none' }}>
                                    <Box direction="row" align="center" gap="xsmall"  justify="center">
                                        <Logout color={this.props.data.color3} size='20px' />
                                        <Text color={this.props.data.color3}>Settings</Text>
                                    </Box>
                                </Link>

                                <Link to="/logout" style={{ textDecoration: 'none' }}>
                                    <Box direction="row" align="center" gap="xsmall"  justify="center">
                                        <Logout color={this.props.data.color3} size='20px' />
                                        <Text color={this.props.data.color3}>Logout</Text>
                                    </Box>
                                </Link>
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