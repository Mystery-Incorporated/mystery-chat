import React, { Component } from 'react';
import './CustomEditor.css';

import { 
    Grommet, 
    Box,  
    Text, 
    ResponsiveContext, 
    Button,
} from 'grommet';

import { 
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

import {Editor, EditorState, RichUtils, getDefaultKeyBinding} from 'draft-js';

import {stateFromHTML} from 'draft-js-import-html';
import {stateToHTML} from 'draft-js-export-html';


class CustomEditor extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            typingMessage: false,
            maxRows: this.props.maxRows,
            minRows: this.props.minRows,  
        }
        this.setEditor = (editor) => {
            this.editor = editor;
        };
        this.focusEditor = () => {
            if (this.editor) {
              this.editor.focus();
            }
            this.setState({typingMessage: true});
        };
        this.blurEditor = () => {

            this.setState({typingMessage: false});
        };
    }

    componentDidMount() {

        this._isMounted = true;

        this.focusEditor();

    }

    render() {

        return (
            <div               
                className="flex-column-reverse editor-container"
                onFocus={this.focusEditor}
                onClick={this.focusEditor}

            >               
                <Box
                    width="100%"
                    height={{"min":"45px", "max":"45px"}}
                    pad="small"
                    style={{
                        "borderBottomRightRadius":"10px",
                        "borderBottomLeftRadius":"10px"
                    }}
                    background={this.state.typingMessage ? this.props.data.color8 : "none"}
                    direction="row"
                    justify="between"
                    align="center"
                    onFocus={this.focusEditor}
                >
                    <Box
                        width="50%"
                        height="100%"
                        direction="row"
                        justify="start"
                        align="center"
                        gap="small"
                    >
                        <Button disabled={!this.state.typingMessage} className="textarea-button" plain size="small" icon={<Bold size="20px" />} onClick={() => {}} />
                        <Button disabled={!this.state.typingMessage} className="textarea-button" plain size="small" icon={<Italic size="20px" />} onClick={() => {}} />
                        <Button disabled={!this.state.typingMessage} className="textarea-button" plain size="small" icon={<Underline size="20px" />} onClick={() => {}} />
                        <Button disabled={!this.state.typingMessage} className="textarea-button" plain size="small" icon={<StrikeThrough size="20px" />} onClick={() => {}} />
                        <Button disabled={!this.state.typingMessage} className="textarea-button" plain size="small" icon={<Code size="20px" />} onClick={() => {}} />
                    </Box>
                    <Box
                        width="50%"
                        height="100%"
                        direction="row"
                        justify="end"
                        align="center"
                        gap="small"
                    >
                        <Button disabled={!this.state.typingMessage} className="textarea-button" plain size="small" icon={<Attachment size="20px" />} onClick={() => {}} />
                        <Button disabled={!this.state.typingMessage} className="textarea-button" plain size="small" icon={<Gallery size="20px" />} onClick={() => {}} />
                        <Button disabled={!this.state.typingMessage} className="textarea-button" plain size="small" icon={<Microphone size="20px" />} onClick={() => {}} />

                        <Button key={"something else"} disabled={!this.state.typingMessage} className="textarea-button custom-button" plain size="small" icon={this.props.customButton.icon} onClick={() => {this.props.customButton.onClick(); this.focusEditor()}} />
                        
                    </Box>

                </Box>
                <Box
                    pad="small"
                    width="100%"
                    direction="row"
                    flex="grow"
                    onFocus={this.focusEditor}
                >
                    <Editor
                        ref={this.setEditor}
                        editorState={this.props.editorState}
                        onChange={this.props.onEditorChange}
                        onClick={this.focusEditor}
                        editorClassName={"editor"}
                    />
                </Box>
            </div>
        );
    }
}

export default CustomEditor;
