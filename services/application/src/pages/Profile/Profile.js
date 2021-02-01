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
    ResponsiveContext,
    TextArea,
    DateInput,
    Select

} from 'grommet';
import { grommet } from "grommet/themes";
import { Previous, Calendar, Send, FormEdit, View, Checkmark, Alert, Refresh } from "grommet-icons";

import Avatar from 'react-avatar';
import {Spinner} from 'Components';

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
            avatarType:0,
            bio:'',
            following:[],
            editted:false,
            alreadyFollowing: false,
            editAvatar: false,
            editName: false,
            editBio: false,
            editDob: false,
            saving: false,
            error: ''
        };        
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
                        avatarType:data.avatarType,
                        dob: data.dob,
                        bio:data.bio,
                        sent:data.sent,
                        following:data.following,
                        personal: data.username == this.props.data.username,
                        alreadyFollowing: this.props.data.following.includes(data.username)
                    });
                    
                }
                
            }) 
            .catch(err => {
                console.error(err);
                alert('Error checking token');
            });
        }
    }
    
    toggleAvatar() {
        this.setState({editAvatar: !this.state.editAvatar, editted:true})
    }
    
    toggleName() {
        this.setState({editName: !this.state.editName, editted:true})
    }
    
    toggleBio() {
        this.setState({editBio: !this.state.editBio, editted:true})
    }
    
    toggleDob() {
        this.setState({editDob: !this.state.editDob, editted:true})
    }
    
    saveProfile() {
        console.log("Trying to save profile", this.state);
        this.setState({saving:true});

        fetch('/api/users/update', {
            method: 'POST',
            body: JSON.stringify({
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                bio: this.state.bio,
                dob: this.state.dob,
                avatar: this.state.avatar,
                avatarType: this.state.avatarType,
                submitFor: this.state.username
            }),
            headers: {
                'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
                'Content-Type': 'application/json'
            }
        })
        .then(res => {

            this.setState({
                editted: false,
                editAvatar: false,
                editName: false,
                editBio: false,
                editDob: false,
                saving:false,
                error: ''
            });
            return res.json();
        })
        .then(data => {
            if ('error' in data) {
                console.log(data);
                this.setState({error: data.msg});
            }
            else {
                window.location.reload();
            }
        }) 
        .catch(err => {
            console.error(err);
        });
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
                
            }
        })
        .catch(err => {
            console.error(err);
        });
    }

    render() {
        var value = this.state;
        
        const onOpen = () => this.setInvalid(true);
        const onClose = () => this.setInvalid(undefined);

        var profileCont =
            <Box
                width="100%"
                height="auto"
                gap="xsmall"
            >
                {this.state.error && this.state.error != '' &&
                    <Box
                        width="100%"
                        height="auto"
                        direction="row"
                        justify="start"
                        align="center"
                        background={this.props.data.color5}
                        pad="small"
                        round="2px"
                        gap="small"
                    >
                        <Alert size="20px"/>
                        <Text size="small" color="#fff">{this.state.error}</Text>
                    </Box>
                }
                {this.state.personal && !this.props.data.verified &&
                    <Box
                        width="100%"
                        height="auto"
                        direction="row"
                        justify="start"
                        align="center"
                        background={this.props.data.color7}
                        pad="small"
                        round="2px"
                        gap="small"
                    >
                        <Alert size="20px" color="#fff"/>
                        <Text size="small" color="#fff">Email not verified! </Text>
                        <Button 
                            plain
                            size="small" 
                            color={this.props.data.color1} 
                            label="Resend" 
                            onClick={() => this.resendEmail()}
                            gap="xxsmall"
                            margin="none"
                        />
                    </Box>
                }
                <Box
                    width="100%"
                    height={{"min":"300px"}}
                    border="bottom"
                    direction="column"
                    justify="start"
                    align="center"
                    gap="medium"
                    pad="medium"
                >
                    <Box
                        direction="column"
                        align="center"
                        justify="start"
                        gap="xsmall"
                    >
                        {this.state.avatarType == 0 ?
                            <Avatar name={this.props.data.getFullName()} src={this.state.avatar} size="200" round={true}/>
                        :
                            <Avatar name={this.props.data.getFullName()} githubHandle={this.state.avatar} size="200" round={true}/>
                        }
                        {this.state.personal &&
                            (<Button plain icon={<FormEdit />} color="#000" size="small" onClick={() => this.toggleAvatar()}/>)
                        }

                        {this.state.personal && this.state.editAvatar && (
                            <Layer
                                onEsc={() => this.setState({editAvatar: false})}
                                onClickOutside={() => this.setState({editAvatar: false})}
                            >
                                <Box
                                    pad="large"
                                    gap="medium"
                                >
                                    <FormField name="avatarType" label="Avatar type" >
                                    <Select
                                        placeholder="Avatar type"
                                        multiple
                                        value={this.state.avatarType == 0 ? 'Cutom Avatar' : 'GitHub Avatar'}
                                        options={['Cutom Avatar', 'GitHub Avatar']}
                                        onChange={(val) => this.setState({avatarType: val.option == 'Cutom Avatar'? 0 : 1})}
                                    />
                                    </FormField>
                                    <FormField name="avatar" label={this.state.avatarType == 0 ? 'Image url' : 'GitHub handle'} >
                                        <TextInput  
                                            placeholder={this.state.avatarType == 0 ? 'Image url' : 'GitHub handle'} 
                                            value={this.state.avatar}
                                            onChange={event => this.setState({avatar:event.target.value})} 
                                        />
                                    </FormField>
                                    <Button primary label="save" color="#000" onClick={() => this.toggleAvatar()} />
                                </Box>
                                
                            </Layer>
                        )}
                        
                    </Box>
                    <Box
                        width="100%"
                        height="auto"
                        direction="column"
                        justify="start"
                        align="center"
                        gap="small"
                    >
                        <Box
                            direction="row"
                            justify="start"
                            align="center"
                            gap="small"
                        >

                            {this.state.personal && this.state.editName ?
                                <Box
                                    direction="row"
                                    justify="start"
                                    align="center"
                                >
                                    <TextInput
                                        placeholder="First Name"
                                        value={this.state.firstname}
                                        onChange={event => this.setState({firstname:event.target.value})}
                                        plain={true}
                                        focusIndicator={true}
                                    />
                                    <TextInput
                                        placeholder="Last Name"
                                        value={this.state.lastname}
                                        onChange={event => this.setState({lastname:event.target.value})}
                                        plain={true}
                                        focusIndicator={true}
                                    />
                                </Box>
                            :
                                <Text size="xxlarge">{this.props.data.getNameAlt(this.state.firstname) + " " + this.props.data.getNameAlt(this.state.lastname)}</Text>
                            }
                            
                            {this.state.personal && !this.state.editName &&
                                (<Button plain icon={<FormEdit />} color="#000" size="small" onClick={() => this.toggleName()}/>)
                            }
                            {this.state.personal && this.state.editName &&
                                (<Button plain icon={<Checkmark />} color="#000" size="small" onClick={() => this.toggleName()}/>)
                            }
                        </Box>
                        <Box
                            direction="row"
                            justify="start"
                            align="center"
                            gap="small"
                        >
                            {this.state.personal && this.state.editBio ?
                                <TextArea
                                    placeholder="Add bio"
                                    value={this.state.bio}
                                    onChange={event => this.setState({bio:event.target.value})}
                                    plain={true}
                                />
                            :
                                <Text size="medium">{this.state.bio}</Text>
                            }
                            {this.state.personal && !this.state.editBio &&
                                (<Button plain icon={<FormEdit />} color="#000" size="small" onClick={() => this.toggleBio()}/>)
                            }
                            {this.state.personal && this.state.editBio &&
                                (<Button plain icon={<Checkmark />} color="#000" size="small" onClick={() => this.toggleBio()}/>)
                            }
                        </Box>
                    </Box>
                </Box>
                <Box
                    width="100%"
                    height="auto"
                    direction="row"
                    justify="between"
                    align="center"
                >
                    <Box
                        width="auto"
                        height="auto"
                        direction="row"
                        justify="start"
                        align="center"
                        gap="medium"
                    >
                        <Box
                            direction="row"
                            justify="start"
                            align="center"
                            gap="xsmall"
                        >
                            <Calendar color={this.props.data.color3} size='15px' />
                            <Text size="small">{this.props.data.formatDOB(this.state.dob)}</Text>
                            {this.state.personal && !this.state.editDob &&
                                (<Button plain icon={<FormEdit />} color="#000" size="small" onClick={() => this.toggleDob()}/>)
                            }
                            {this.state.personal && this.state.editDob &&
                                (<Button plain icon={<Checkmark />} color="#000" size="small" onClick={() => this.toggleDob()}/>)
                            }
                        </Box>
                        <Box
                            direction="row"
                            justify="start"
                            align="center"
                            gap="xsmall"
                        >
                            <Send color={this.props.data.color3} size='15px' />
                            <Text size="small">{this.state.sent}</Text>
                        </Box>
                        <Box
                            direction="row"
                            justify="start"
                            align="center"
                            gap="xsmall"
                        >
                            <View color={this.props.data.color3} size='15px' />
                            <Text size="small">{this.state.following.length}</Text>
                        </Box>
                    </Box>
                    <Box
                        width="auto"
                        height="auto"
                        direction="row"
                        justify="end"
                        align="center"
                        gap="xsmall"
                    >
                        {this.state.personal &&
                            (<Button 
                                primary 
                                label={this.state.saving ? (
                                    <Box direction="row" gap="small">
                                        {" "}
                                        <Spinner color="#fff" /> <Text size="medium"> Saving... </Text>
                                    </Box>
                                ):("Save")}  
                                color="#000" 
                                disabled={!this.state.editted} 
                                size="small"
                                onClick={() => this.saveProfile()}
                            />)
                        }

                        {!this.state.personal && 
                            (<Button 
                                secondary 
                                label="Follow" 
                                color={this.props.data.color4} 
                                size="small" 
                                
                            />)
                        }
                        
                    </Box>
                    
                </Box>
                <Box>
                    {this.state.personal && this.state.editDob &&
                        (
                            <DateInput inline value={this.state.dob} onChange={(value)=>{this.setState({dob:value.value})}} />
                        )
                    }
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