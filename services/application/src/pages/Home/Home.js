import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link, Route, Switch, BrowserRouter } from 'react-router-dom';

import { 
    Grommet, 
    Box,  
    Nav, 
    Image, 
    Text, 
    ResponsiveContext, 
    TextInput, 
    Menu,
    Anchor,
    Button,
    TextArea
} from 'grommet';

import { 
    Login, 
    Notes, 
    Logout, 
    FormDown, 
    Configure, 
    Notification, 
    Info, 
    Chat, 
    UserNew, 
    Search,
    VolumeMute,
    Send,
    CircleInformation,
    Bold,
    Italic,
    Underline,
    StrikeThrough,
    Code,
    Microphone,
    Camera,
    Attachment,
    Gallery 

} from "grommet-icons";
import "./Home.css";

import {Banner, Logo} from 'Media';
import {CustomEditor} from 'Components';

import Avatar from 'react-avatar';
import {Editor, EditorState, ContentState, SelectionState, Modifier  } from 'draft-js';

import {stateFromHTML} from 'draft-js-import-html';
import {stateToHTML} from 'draft-js-export-html';
import {clearEditorContent} from 'draftjs-utils';

import parse from 'html-react-parser';

class Home extends Component {

    _isMounted = false;

    constructor(props) {
        
        super(props);
        this.state = {
            resent: false,
            tag:'',
            parsedNotifications: [],
            newNotifs: 0,
            searchedName: '',
            searchingName: false,
            searchSuggestions: [
                {
                    name: "Kalindu De Costa",
                    avatar: "kalindudc",
                    avatarType: 1
                },
                {
                    name: "Kalindu De Costa",
                    avatar: "kalindudc",
                    avatarType: 1
                },
                {
                    name: "Kalindu De Costa",
                    avatar: "kalindudc",
                    avatarType: 1
                },
            ],
            convos: [
                {
                    id: 213123,
                    members: [
                        {
                            username:"kalindu",
                            firstname: "Kalindu",
                            lastname: "De Costa",
                            avatar: "kalindudc",
                            avatarType: 1
                        },
                        {
                            username:"bob",
                            firstname: "Bobson",
                            lastname: "Bobbert",
                            avatar: "someone else",
                            avatarType: 1
                        },
                    ],
                    tagline:{
                        message:"last sent message this one is extremely extremely long and long",
                        time:"2021-02-01T01:18:52.044+00:00"
                    },
                    unread:true,
                    mute:true
                },
                {
                    id: 112313,
                    title: "Another one",
                    members: [
                        {
                            username:"kalindu",
                            firstname: "Kalindu",
                            lastname: "De Costa",
                            avatar: "kalindudc",
                            avatarType: 1
                        },
                        {
                            username:"bob",
                            firstname: "Bobson",
                            lastname: "Bobbert",
                            avatar: "someone else",
                            avatarType: 1
                        },
                    ],
                    avatar: "kalindudc",
                    avatarType: 1,
                    tagline:{
                        message:"last sent message",
                        time:"2021-02-01T01:18:52.044+00:00"
                    },
                    unread:false,
                    mute:false
                },
            ],
            selectedConvo: '',
            currentConvo: {
                id: 112313,
                title: "Another one",
                members: [
                    {
                        username:"kalindu",
                        firstname: "Kalindu",
                        lastname: "De Costa",
                        avatar: "kalindudc",
                        avatarType: 1
                    },
                    {
                        username:"bob",
                        firstname: "Bobson",
                        lastname: "Bobbert",
                        avatar: "someone else",
                        avatarType: 1
                    },
                ],
                tagline:{
                    message:"last sent message",
                    time:"2021-02-01T01:18:52.044+00:00"
                },
                avatar: "kalindudc",
                avatarType: 1,
                unread:false,
                mute:false,
                sent: 5,
                messages: [
                    {
                        id: 7,
                        convoId: 112313,
                        body: "Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti ",
                        sender: "kalindu",
                        readby: [],
                        timeSent: "2021-02-01T01:19:12.044+00:00"

                    },
                    {
                        id: 6,
                        convoId: 112313,
                        body: "Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti ",
                        sender: "bob",
                        readby: [],
                        timeSent: "2021-02-01T00:19:12.044+00:00"

                    },
                    {
                        id: 5,
                        convoId: 112313,
                        body: "Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti ",
                        sender: "kalindu",
                        readby: [],
                        timeSent: "2021-01-01T21:19:12.044+00:00"

                    },
                    {
                        id: 4,
                        convoId: 112313,
                        body: "cool",
                        sender: "kalindu",
                        readby: [],
                        timeSent: "2021-01-01T13:18:52.044+00:00"

                    },
                    {
                        id: 3,
                        convoId: 112313,
                        body: "zczxczc this is an extremely long message, it is infact longer that most messages sent by most people. Possibly! who knows???",
                        sender: "bob",
                        readby: [],
                        timeSent: "2021-01-01T11:18:32.044+00:00"

                    },
                    {
                        id: 2,
                        convoId: 112313,
                        body: "Hello!",
                        sender: "kalindu",
                        readby: [],
                        timeSent: "2021-01-01T07:18:05.044+00:00"

                    },
                    {
                        id: 1,
                        convoId: 112313,
                        body: "adadad Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti ",
                        sender: "bob",
                        readby: [],
                        timeSent: "2021-01-01T05:17:52.044+00:00"

                    },
                ],
            },
            typedMessage: EditorState.createEmpty(),
            typingMessage: false,            
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

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;

        if (this._isMounted) {
            this.setState(this.props.data);
            this.setState({selectedConvo: this.props.match.params.id});

            var notifs = []

            this.props.data.notifications.forEach((element, i) => {
                if (!element.read) this.setState({newNotifs: this.state.newNotifs + 1})
                this.state.parsedNotifications.push(
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
                                        {element.title}
                                    </Text>
                                    <Text
                                        color={this.props.data.color2}
                                        size="xsmall"
                                    >
                                        {element.subtitle}
                                    </Text>
                                </Box>
                                {!this.props.data.notifications[i].read && <Box width="8px" height="8px" background="red" round="100%"></Box>}
                            </Box>
                        ,
                        onClick: (event) => {this.handleNotification(element, i)},
                        icon: 
                            <Box
                                width="auto"
                                height="auto"
                                alignSelf="center"
                                direction="column"
                                align="center"
                                justify="center"
                            >
                                {element.data.id == 0 && 
                                    <UserNew size="20px"/>
                                }

                                {element.data.id == 1 && 
                                    <Chat size="20px"/>
                                }

                                {element.data.id > 2 && 
                                    <Info size="20px"/>
                                }
                                
                            </Box>
                    }
                );
            });
        }
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

    handleNotification(element, i) {
        //this.setState({newNotifs: this.state.newNotifs - 1});
        //console.log(element);

        fetch('/api/read/notification', {
            method: 'POST',
            body: JSON.stringify({
                id:element._id
            }),
            headers: {
                'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            
            return res.json();
        })
        .then(data => {
            if ('error' in data) {
                this.setState({error: data.msg});
            }
            else {
                console.log(data);
                this.setState({newNotifs: this.state.newNotifs - 1});
                this.props.data.readNotification(i);
                
            }
        }) 
        .catch(err => {
            console.log(err);
            alert('Notification Error logging in please try again');
        });
    }

    parseConvo(convo) {
        if (convo.title) {
            return convo
        }
        else {
            let other = convo.members.find(x => x.username != this.props.data.username);
            convo.title = this.props.data.getNameAlt(other.firstname) + " " +  this.props.data.getNameAlt(other.lastname);
            convo.avatar = other.avatar;
            convo.avatarType = other.avatarType;
            return convo;
        }
    }

    mapAvatars(members) {
        let avatars = {};

        members.forEach(mem => {
            avatars[mem.username] = {
                avatar: mem.avatar,
                avatarType: mem.avatarType,
                firstname: mem.firstname,
                lastname: mem.lastname
            }
        });
        return avatars;
    }

    render() {
        const customTheme = {
            global: {
              colors: {
                custom: this.props.data.color1
              }
            }
        };

        const suggestions = this.state.searchSuggestions
            .filter(({name}) => name.toLowerCase().indexOf(this.state.searchedName.toLowerCase()) >= 0)
            .map(({name, avatar, avatarType}, index, list) => ({
                label:
                    (
                        <Box
                            direction="row"
                            align="center"
                            gap="small"
                            border={index < list.length - 1 ? 'bottom' : undefined}
                            pad="small"
                            background={this.props.data.color8}
                        >
                            {avatarType == 0 ?
                                <Avatar 
                                    name={name}
                                    src={avatar} 
                                    size="35" 
                                    round={true}
                                />
                            :
                                <Avatar 
                                    name={name}
                                    githubHandle={avatar} 
                                    size="35" 
                                    round={true}
                                />
                            }
                            <Text size="small">{name}</Text>
                        </Box>
                    ),
                value: name
            }));

        let left_sidebar = 
        <ResponsiveContext.Consumer>
            
            {responsive => 
            <Box
                direction="column"
                width={{"min":responsive === "small" ? "100%" : "380px"}}
                height="100%"
                background={this.props.data.color8}
                pad={{"top": "small", "bottom": "small", "left": "none", "right": "none"}}
                gap="small"
                justify="start"
                align="center"
                border={{"color":this.props.data.color9, "side":"right"}}
            >
                <Box
                    width="100%"
                    pad="small"
                >
                    <Box
                        width="100%"
                        height={{"min":"45px"}}
                        round="2px"
                        background={this.props.data.color9}
                        direction="row"
                        justify="start"
                        align="center"
                        pad="none"
                        border={this.state.searchingName ? {
                            "color": this.props.data.color4,
                            "size": "xsmall",
                            "side": "all"
                        } : false}
                    >
                        
                        <TextInput
                            icon={<Search color={this.props.data.color2} size="20px"/>}
                            placeholder="Search"
                            plain
                            value={this.state.searchedName}
                            onChange={event => {this.setState({searchedName: event.target.value})}}
                            onFocus={() => {this.setState({searchingName: true})}}
                            onBlur={() => {this.setState({searchingName: false})}}
                            onSuggestionSelect={event => {this.setState({searchingName:false, searchedName: event.suggestion.value});}}
                            size="small"
                        />
                    </Box>
                </Box>

                <Box
                    width="100%"
                    height="auto"
                    direction="column"
                    justify="center"
                    align="start"
                    overflow="auto"
                    margin={{"top":"small"}}
                >
                    
                    {this.state.searchingName && this.state.searchedName != "" ? (
                        <Box 
                            width="100%" 
                            height={{"min":"200px"}} 
                            background="red"
                        >
                            searching
                        </Box>
                    ) : (
                        this.state.convos.map(raw => {
                            let convo = this.parseConvo(raw);
                            return (
                                <Box 
                                    key={convo.id}
                                    width="100%" 
                                    height="auto"
                                    direction="row"
                                    justify="between"
                                    align="center"
                                    pad={responsive === "small" ? "medium" : "small"}
                                    gap={responsive === "small" ? "medium" : "small"}
                                    className={this.state.selectedConvo == convo.id.toString() ? "selected selectable" : "selectable"}
                                    onClick={event => {
                                        this.setState({selectedConvo:convo.id});
                                        this.props.history.push("/c/" + convo.id);
                                    }}
                                    focusIndicator={false}
                                >
                                    <Box
                                        width="85%" 
                                        height="auto"
                                        direction="row"
                                        justify="start"
                                        align="center"
                                        gap={responsive === "small" ? "medium" : "small"}
                                    >
                                        {convo.avatarType == 0 ?
                                            <Avatar 
                                                name={convo.title}
                                                src={convo.avatar} 
                                                size="45px" 
                                                round={true}
                                            />
                                        :
                                            <Avatar 
                                                name={convo.title}
                                                githubHandle={convo.avatar} 
                                                size="45px" 
                                                round={true}
                                            />
                                        }
                                        <Box
                                            width={{"max":"85%"}}
                                            direction="column"
                                            justify="between"
                                            align="start"
                                        >
                                            <Text size="medium">{convo.title}</Text>
                                            <Box
                                                gap="small"
                                                direction="row"
                                                justify="between"
                                                align="center"
                                                overflow="none"
                                            >
                                                <Text size="xsmall" color={this.props.data.color2}>{convo.tagline.message.substring(0,responsive === "small" ? 35 : 25) + " . . ."}</Text>
                                                <Text size="xsmall" color={this.props.data.color2}>{this.props.data.formatDate(convo.tagline.time)}</Text>
                                            </Box>
                                            
                                        </Box>
                                    </Box>

                                    <Box
                                        width="auto" 
                                        height="auto"
                                        direction="row"
                                        justify="end"
                                        align="center"
                                        gap={responsive === "small" ? "medium" : "small"}
                                    >
                                        {convo.unread && <Box
                                            width="10px"
                                            height="10px"
                                            round="20px"
                                            background={this.props.data.color4}
                                        >
                                        </Box>}
                                        {convo.mute && <VolumeMute size="small" />}
                                    </Box>
                                </Box>
                            )
                        })
                    )}
                    <Button 
                        primary 
                        label="prepend convo"
                        onClick={() => {
                            let convo = this.state.currentConvo;
                            convo.messages.push(
                                {
                                    id: Date.now(),
                                    convoId: 112313,
                                    body: "THis is a old old message",
                                    sender: "kalindu",
                                    readby: [],
                                    timeSent: "2021-02-01T00:35:12.044+00:00"
            
                                }
                            );
                            console.log(convo);

                            this.setState({currentConvo: convo});

                        }} 
                    />

                </Box>
            </Box>
            }
        </ResponsiveContext.Consumer>;

        let main_cont = 
        <ResponsiveContext.Consumer>
            
            {responsive =>
                <Box
                    dir="column"
                    width="auto"
                    flex="grow"
                    height="100%"
                    width={{"max":responsive === "small" ? "98%" : "50%"}}
                    pad={{"bottom":"small"}}
                >
                    
                    {this.state.selectedConvo !== "" && 
                        <Box
                            width="100%"
                            height={{"min":"95px"}}
                            direction="row"
                            justify="between"
                            align="start"
                            border={{
                                "color": this.props.data.color9,
                                "size": "xsmall",
                                "side": "bottom"
                            }}
                            margin={{"bottom":"small"}}
                            round="10px"
                        >  
                            <Box
                                width="50%"
                                height="100%"
                                direction="row"
                                justify="start"
                                align="center"
                                gap={responsive === "small" ? "medium" : "small"}
                                pad={responsive === "small" ? "medium" : "small"}
                               
                            >
                                {this.state.currentConvo.avatarType == 0 ?
                                    <Avatar 
                                        name={this.state.currentConvo.title}
                                        src={this.state.currentConvo.avatar} 
                                        size="45px" 
                                        round={true}
                                    />
                                :
                                    <Avatar 
                                        name={this.state.currentConvo.title}
                                        githubHandle={this.state.currentConvo.avatar} 
                                        size="45px" 
                                        round={true}
                                    />
                                }
                                <Box
                                    direction="column"
                                    justify="between"
                                    align="start"
                                >
                                    <Text>{this.state.currentConvo.title}</Text>
                                    <Box
                                        gap="small"
                                        direction="row"
                                        justify="start"
                                        align="center"
                                        overflow="none"
                                    >
                                        {this.state.currentConvo.members.map(mem => {
                                            return (
                                                <Anchor 
                                                    key={"convo " + mem.username}
                                                    href={"/user/" + mem.username} 
                                                    label={this.props.data.getNameAlt(mem.firstname)} 
                                                    size="xsmall" 
                                                    color={this.props.data.color2}
                                                />
                                            )
                                        })}
                                        
                                    </Box>
                                </Box>
                            </Box>

                            <Box
                                width="50%"
                                height="100%"
                                direction="row"
                                justify="end"
                                align="center"
                                gap={responsive === "small" ? "medium" : "small"}
                                pad={responsive === "small" ? "medium" : "small"}
                            >
                                <Box pad="small" gap="xsmall" direction="row" justify="center" align="start">
                                    <Send />
                                    <Text size="small">{this.state.currentConvo.sent}</Text>
                                </Box>
                                <Box pad="small" className="hover-button" direction="row" justify="center" align="start">
                                    <Configure />
                                </Box>
                                <Box pad="small" className="hover-button" direction="row" justify="center" align="start">
                                    <CircleInformation />
                                </Box>
                            </Box>
                        </Box> 
                    }

                    
                    {this.state.selectedConvo !== "" &&
                        <Box
                            width={{"max":"100%"}}
                            height="auto"
                            direction="column-reverse"
                            justify="start"
                            align="start"
                            gap={responsive === "small" ? "medium" : "small"}
                            overflow="auto"
                        >
                            {this.state.currentConvo.messages.map(msg => {
                                let avatarMap = this.mapAvatars(this.state.currentConvo.members);
                                let classNames = msg.sender === this.props.data.username ? "userMsg" : "";
                                classNames += " message flex-row justify-start align-start";
                                return (
                                    
                                    <div 
                                        key={msg.id} 
                                        id={msg.id} 
                                        className={classNames}
                                        style={{

                                        }}
                                        
                                    >
                                        <div
                                           className="flex-row justify-start align-start margin-small" 
                                        >
                                            {avatarMap[msg.sender].avatarType == 0 ?
                                                <Avatar 
                                                    name={avatarMap[msg.sender].title}
                                                    src={avatarMap[msg.sender].avatar} 
                                                    size="45px" 
                                                    round={true}
                                                />
                                            :
                                                <Avatar 
                                                    name={avatarMap[msg.sender].title}
                                                    githubHandle={avatarMap[msg.sender].avatar} 
                                                    size="45px" 
                                                    round={true}
                                                />
                                            }
                                        </div>
                                        <div
                                           className="flex-column justify-start align-start margin-small gap-small" 
                                        >
                                            <div className="flex-row justify-start align-start gap-small">
                                                <Text size="small" color={this.props.data.color12}>
                                                    {this.props.data.getNameAlt(avatarMap[msg.sender].firstname) + " " + this.props.data.getNameAlt(avatarMap[msg.sender].lastname)}
                                                </Text>
                                                <Text size="xsmall" color={this.props.data.color2}>
                                                    {this.props.data.formatDateTime(msg.timeSent)}
                                                </Text>
                                            </div>
                                            <div className="flex-row justify-start align-start gap-small">
                                                <Text size="small" color={"#444"} dangerouslySetInnerHTML={{__html: msg.body}}>
                                                    
                                                </Text>
                                            </div>
                                        </div>
                                        
                                    </div>
                                )
                            })}
                            
                        </Box>
                    }

                    {this.state.selectedConvo !== "" &&
                        <CustomEditor 
                            editorState={this.state.typedMessage}
                            onEditorChange={(editorState) => {this.setState({typedMessage:editorState})}}
                            minRows={6}
                            maxRows={10}
                            responsive={responsive}
                            data={this.props.data}
                            customButton={{
                                icon:<Send size="20px" color="#fff" />,
                                onClick:() => {
                                    let body = stateToHTML(this.state.typedMessage.getCurrentContent());
                                    if (body !== "" && body !== "<p><br></p>") {
                                        let convo = this.state.currentConvo;
                                        convo.messages.unshift(
                                            {
                                                id: Date.now(),
                                                convoId: 112313,
                                                body: body,
                                                sender: this.props.data.username,
                                                readby: [],
                                                timeSent: new Date(Date.now()).toISOString()
                        
                                            }
                                        );
                                        

                                        let editorState = clearEditorContent(this.state.typedMessage);
                                        this.setState({currentConvo: convo, typedMessage: editorState});
                                    }
                                }
                            }}
                        />
                        
                    }


                </Box>
            }
        </ResponsiveContext.Consumer>;

        let right_sidebar = 
        <ResponsiveContext.Consumer>
            
            {responsive =>
                <Box
                    direction="column"
                    width={{"min":responsive === "small" ? "100%" : "380px"}}
                    height="100%"
                    background={this.props.data.color8}
                    pad={{"top": "small", "bottom": "small", "left": "none", "right": "none"}}
                    gap={responsive === "small" ? "medium" : "small"}
                    justify="start"
                    align="center"
                    border={{"color":this.props.data.color9, "side":"left"}}
                >


                </Box>
            }
        </ResponsiveContext.Consumer>;

        return (
            <Grommet theme={customTheme}>

                {this.state.isLoggedIn ?
                    <Box
                        pad="none"
                        width="100vw"
                        height="100vh"
                        round="small"
                        direction="column"
                        gap="none"
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
                            border={{
                                "side":"bottom",
                                "size":"1px",
                                "color":"#ddd"
                            }}
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
                            <Nav direction="row" align="center" gap="small">
                                
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
                                        {console.log(this.props.data.avatarType, this.props.data.avatar)}
                                        {this.props.data.avatarType == 0 ?
                                            <Avatar 
                                                name={this.props.data.getFullName()}
                                                src={this.props.data.avatar} 
                                                size="40px" 
                                                round={true}
                                            />
                                        :
                                            <Avatar 
                                                name={this.props.data.getFullName()}
                                                githubHandle={this.props.data.avatar} 
                                                size="41px" 
                                                round={true}
                                            />
                                        }
                                        <Text color={this.props.data.color3}>
                                            {this.props.data.getName()}
                                        </Text>
                                    </Box>
                                    
                                </Link>

                                <Menu
                                    children={(props) =>
                                        <Box pad="small" className="hover-button" direction="row" justify="center" align="start">
                                            <Notification />
                                            {this.state.newNotifs > 0 && <Box width="8px" height="8px" background="red" round="100%"></Box>}
                                        </Box>
                                    }
                                    plain
                                    size="large"
                                    dropProps={{ align: { top: 'bottom', left: 'left' } }}
                                    items={this.state.parsedNotifications}
                                />
                                
                                <Menu
                                    children={(props) => <Box pad="small" className="hover-button"><FormDown /></Box>}
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
                        
                        <ResponsiveContext.Consumer>
            
                            {responsive =>
                                <Box 
                                    fill
                                    background='none'
                                    direction="row"
                                    justify={responsive === "small" ? "center" : "between"}
                                    align="start"
                                >
                                    
                                    
                                    {responsive === "small" ? this.state.selectedConvo ? main_cont : left_sidebar : left_sidebar}
                                    {responsive === "small" ? <span></span> : main_cont}
                                    {responsive === "large" ? right_sidebar : <span></span>}

                                </Box>
                            }
                        </ResponsiveContext.Consumer>
                        
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