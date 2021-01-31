import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link, Route, Switch, BrowserRouter, useParams} from 'react-router-dom';
import queryString from 'query-string'

import "./Profile.css";

import {
    Grommet,
    Box, 
    Text, 
    Button, 
    Form,
    FormField,
    MaskedInput,
    TextInput,
    Layer,
    Meter,
    ResponsiveContext

} from 'grommet';
import { grommet } from "grommet/themes";
import { Previous } from "grommet-icons";

import Avatar from 'react-avatar-edit'

class Profile extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {

            id:'',
            personal:false,
            invalid:false,
            firstname: '',
            lastname: '',
            username: '',
            avatar: '',
            dob: '',
            avatarSrc:''

        };
        this.onCrop = this.onCrop.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this);
        
    }

    handleInputChange = (value) => {

        if (Object.keys(value).length ==  0) {
            this.setState({
                
                password:null,
                password2:null,
                reveal: false,
                message: null,
                error:''
            });
        }
        else {
            for ( var property in value ) {
                this.setState({[property]: value[property]});
            }
        }
        this.setState({
            error:''
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;

        if (this._isMounted) {
            this.setState({id: this.props.match.params.id});
        }

        fetch('/api/users/' + this.props.match.params.id, {
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
                        msg: "Profile does not exist",
                        invalid:true
                    });
                }
            }
        })
        .then(data => {
            console.log("DATA", data)
            if (data) {
                this.setState({
                    firstname: data.firstname,
                    lastname: data.lastname,
                    username: data.username,
                    avatar: data.avatar,
                    avatarSrc:data.avatarSrc,
                    dob: data.dob,
                    personal: data.username == this.props.data.username
                });
                
            }
            
        }) 
        .catch(err => {
            console.error(err);
            alert('Error checking token');
        });
    }

    onClose() {
        this.setState({avatar: null})
    }
    
    onCrop(preview) {
        console.log(this.state)
        this.setState({avatar:preview})
    }

    onBeforeFileLoad(elem) {
        console.log(elem.target.files[0].size);
        if(elem.target.files[0].size > 5571680){
            alert("File is too big!");
            elem.target.value = "";
        };
    }
    

    render() {
        var value = this.state;
        
        const onOpen = () => this.setInvalid(true);
        const onClose = () => this.setInvalid(undefined);

        var profileCont =
            <Box
                width="100%"
                height="auto"
            >
                <Box
                    width="100%"
                    height="300px"
                    border="bottom"
                    direction="column"
                    justify="start"
                    align="center"
                >
                    <Box
                        direction="row"
                    >
                        <Avatar
                            width={390}
                            height={295}
                            onCrop={this.onCrop}
                            onClose={this.onClose}
                            onBeforeFileLoad={this.onBeforeFileLoad}
                            src={this.state.avatar}
                        />
                        <img src={this.state.avatar} alt="Preview" width="300px" height="auto"/>
                    </Box>
                </Box>
            </Box>

        return (
            <Grommet theme={grommet} full background={this.props.data.color1}>
            
                <Box
                    width="100vw"
                    height="100vh"
                    direction="column"
                    gap="xxsmall"
                >
                    <Box
                        width="100%"
                        direction="row"
                        align="center"
                        justify="start"
                        pad="small"
                    >
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <Box direction="row" align="center" gap="xsmall"  justify="center">
                                <Previous color={this.props.data.color3} size='20px' />
                                <Text color={this.props.data.color3}>Back</Text>
                            </Box>
                        </Link>
                    </Box>

                    <Box
                        fill
                        direction="row"
                        align="start"
                        justify="center"
                    >
                         <ResponsiveContext.Consumer>
                            {responsive => responsive === "small" ? (
                                <Box
                                    pad="none"
                                    width="95%"
                                    height="auto"
                                    round="small"
                                    direction="row"
                                    align="center"
                                    justify="center"
                                    gap="small"
                                >
                                    {profileCont}
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
                                    {profileCont}
                                </Box>
                            )}
                        </ResponsiveContext.Consumer>
                    </Box>

                </Box>
            </Grommet>
        );
    }
    
}

export default withRouter(Profile);