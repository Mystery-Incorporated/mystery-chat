import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import "./Register.css";

import {
    Box,
    Button,
    CheckBox,
    Grommet,
    Form,
    FormField,
    MaskedInput,
    RadioButtonGroup,
    RangeInput,
    Select,
    TextArea,
    TextInput,
    DateInput,
    Text,
    Layer,
    ResponsiveContext
  } from "grommet";
  import { grommet } from "grommet/themes";
  import { MailOption, Hide, View, Add, FormClose, StatusGood, Tag, Alert, User  } from 'grommet-icons';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            avatar: '',
            dob: '',
            username: '',
            password:'',
            password2:'',
            email:'',
            reveal: false,
            message: '',
            invalid: false,
            working:false,
            error:''
        };
    }

    handleInputChange = (value) => {

        if (Object.keys(value).length ==  0) {
            this.setState({
                firstname: '',
                lastname: '',
                avatar: '',
                username: '',
                dob: '',
                password:'',
                password2:'',
                email:'',
                reveal: false,
                message: '',
                invalid: false,
                working:false,
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

    setReveal = (val) => {
        this.setState({reveal: val});
    }

    setInvalid = (val) => {
        console.log(val);
        this.setState({invalid: val});
    }

    setWorking = (working) => {
        this.setState({working:working});
    }

    submit = () => {
        console.log(this.state);
        this.setState({
            error:''
        });

        if (this.state.password != this.state.password2) {
            this.setState({message: "Password does not match."});
        }
        else {
            this.setState({message: null});
            var ncount = 0;
            for (var prop in this.state) {
                if (this.state[prop] == null) {
                    ncount++;
                }
            }
            
            if (ncount > 1) {
                this.setInvalid(true);
            }
            else {
                this.setWorking(true);
                fetch('/api/signup', {
                    method: 'POST',
                    body: JSON.stringify(this.state),
                    headers: {
                        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => {
                    this.setWorking(false);
                    return res.json();
                })
                .then(data => {
                    if ('error' in data) {
                        this.setState({error: data.msg});
                    }
                    else {
                        data.playerNickName = data.playerTag;
                        this.props.data.login(data);
                        this.props.history.push('/');
                    }
                }) 
                .catch(err => {
                    console.error(err);
                });
            }
        }
    }

    componentDidMount() {
        fetch('/api/checkToken', {
            headers: {
                'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log(res.status);
            if (res.status === 200) {
                this.props.history.push('/');
            } 
        }) 
        .catch(err => {
            console.error(err);
        });
    }

    render() {
        var value = this.state;
        console.log("VALUE", value);
        const emailMask = [
            {
                regexp: /^[\w\-_.]+$/,
                placeholder: 'example',
            },
            { fixed: '@' },
            {
                regexp: /^[\w]+$/,
                placeholder: 'my',
            },
            { fixed: '.' },
            {
                regexp: /^[\w]+$/,
                placeholder: 'com',
            },
        ];
        const onOpen = () => this.setInvalid(true);

        const onClose = () => this.setInvalid(undefined);

        

        var regFormCont = 
            <Box 
                direction="column"
                pad="none"
                width="100%"
                min-height="100%"
                background={this.props.data.color1}
                overflow="auto"
                round="xsmall"
            >
                <Box width="100%" background={this.props.data.color3} pad="large"> 
                    <Text color={this.props.data.color1} size="xxlarge">Registration</Text>
                </Box>
                {this.state.error != '' && 
                <Box width="100%" background={this.props.data.color2} pad="small" direction="row" align="center"> 
                    <Alert color={this.props.data.color1} />
                    <Text margin="small" color={this.props.data.color1} size="medium">{this.state.error}</Text>
                </Box>}
                <Box pad="large">
                    <Form
                        value={value}
                        onChange={nextValue => this.handleInputChange(nextValue)}
                        onReset={() => this.handleInputChange({})}
                        onSubmit={({ value }) => {this.submit()}}
                    >
                        <FormField name="username" label="User name">
                            <TextInput icon={<Tag />} placeholder='soaad244' name="username" />
                        </FormField>

                        <FormField name="email" label="Email">
                            <MaskedInput
                                icon={<MailOption />}
                                mask={emailMask}
                                name="email"
                            />
                        </FormField>

                        <FormField name="password" label="Password">
                            <Box
                                direction="row"
                                align="center"
                                round="small"
                            >
                                <TextInput
                                    plain
                                    type={this.state.reveal ? "text" : "password"}
                                    name="password"
                                />
                                <Button
                                    icon={this.state.reveal ? <View size="medium" /> : <Hide size="medium" />}
                                    onClick={() => this.setReveal(!this.state.reveal)}
                                />
                            </Box>
                        </FormField>

                        <FormField name="password2" label="Confirm Password">
                            <Box
                                direction="row"
                                align="center"
                                round="small"
                            >
                                <TextInput
                                    plain
                                    type={this.state.reveal ? "text" : "password"}
                                    name="password2"
                                />
                                <Button
                                    icon={this.state.reveal ? <View size="medium" /> : <Hide size="medium" />}
                                    onClick={() => this.setReveal(!this.state.reveal)}
                                />
                            </Box>
                        </FormField>

                        <FormField name="firstname" label="First Name">
                            <TextInput  placeholder='Soaad' name="firstname" />
                        </FormField>

                        <FormField name="lastname" label="Last Name">
                            <TextInput  placeholder='Hossain' name="lastname" />
                        </FormField>

                        <FormField name="dob" label="Date of Birth">
                            <DateInput
                                format="dd/mm/yyyy"
                                placeholder="21/02/1987"
                                name="dob"
                            />
                        </FormField>

                        {this.state.message && (
                            <Box pad={{ horizontal: "small" }}>
                                <Text color="status-error">{this.state.message}</Text>
                            </Box>
                        )}

                        {this.state.invalid && (
                            <Layer
                                position="bottom"
                                modal={false}
                                margin={{ vertical: "medium", horizontal: "small" }}
                                onEsc={onClose}
                                responsive={false}
                                plain
                            >
                                <Box
                                align="center"
                                direction="row"
                                gap="small"
                                justify="between"
                                round="medium"
                                elevation="medium"
                                pad={{ vertical: "xsmall", horizontal: "small" }}
                                background="status-critical"
                                >
                                <Box align="center" direction="row" gap="xsmall">
                                    <StatusGood />
                                    <Text size="small">Fill out all fields!</Text>
                                </Box>
                                <Button icon={<FormClose />} onClick={onClose} plain />
                                </Box>
                            </Layer>
                        )}
                        <Box direction="row" gap="medium" margin={{"top":"40px"}}>
                            <Button type="submit" primary label="Register" color={this.props.data.color2}/>
                            <Button label="Cancel" color={this.props.data.color2} onClick={() => this.props.history.push("/")}/>
                        </Box>
                    </Form>
                </Box>
            </Box>;

        return (
            <Grommet>
                <Box  
                    width="100vw" 
                    min-height="100vh" 
                    direction="row" 
                    align="center" 
                    justify="center" 
                    margin={{"top":"50px", "bottom":"100px"}}
                >
                    {this.state.working && 
                        <Layer animation="fadeIn" modal={true}>
                            <Box background={this.props.data.color2} align="center" justify="center" pad="none" >
                                <Box background={this.props.data.color2} align="center" justify="center" pad="large" round="small">
                                    <Text size="xxlarge" color={this.props.data.color1}>REGISTERING!</Text>
                                </Box>
                            </Box>
                        </Layer>
                    }
                    
                    <ResponsiveContext.Consumer>
                        {responsive => responsive === "small" ? (
                            <Box 
                                direction="column"
                                pad="none"
                                width="90%"
                                min-height="90%"
                                background={this.props.data.color1}
                                overflow="auto"
                                round="xsmall"
                                elevation="small"
                            >
                                {regFormCont}
                            </Box>
                        ) : (
                            <Box 
                                direction="column"
                                pad="none"
                                width="50%"
                                min-height="70%"
                                background={this.props.data.color1}
                                overflow="auto"
                                round="xsmall"
                                elevation="small"
                            >
                                {regFormCont}
                            </Box>
                        )}
                        
                        
                    </ResponsiveContext.Consumer>
                </Box>
            </Grommet>
        );
      }
    
}

export default withRouter(Register);