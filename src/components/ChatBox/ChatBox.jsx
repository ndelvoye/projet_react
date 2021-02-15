import React from 'react';
import './ChatBox.css';
import * as PropTypes from "prop-types";

class ChatBox extends React.Component {
    static propTypes = {
        isWsReady: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            senderName: "",
            messageToSend: "",
        }
    }

    /**
     * Sends desiredTimestamp to App component when clicking to moment shared by a user in the chat
     * @param desiredTimestamp
     */
    handleClick(desiredTimestamp) {
        this.props.onClick(desiredTimestamp);
    }

    /**
     * Sends message to the WS contained in props
     */
    sendMessageOnWS() {
        const message = {
            name: this.state.senderName,
            message: this.state.messageToSend,
            moment: this.props.sharingMoment,
        };
        this.props.ws.send(JSON.stringify(message));
    }

    render() {
        if (this.props.isWsReady) {
            return (
                <div className="ChatBox" data-testid="ChatBox">
                    <div id="messages">
                        <ul>
                            {this.props.messages.map((message, index) => (
                                <li key={index + message.message}>
                                    <div className='msgDate'>
                                        {new Date(message.when).getHours()}:{new Date(message.when).getMinutes()}:{new Date(message.when).getSeconds()}
                                    </div>
                                    <div className='msgAuthor'>
                                        {message.name}
                                    </div>
                                    <div className='msgContent'>
                                        {message.message}
                                    </div>

                                    {message.moment !== null && isFinite(message.moment) &&
                                    <div className='msgMoment' onClick={() => this.handleClick(message.moment)}>
                                        Go to {Math.floor(message.moment)}
                                    </div>}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div id="messageToSend">
                        <form action="."
                              onSubmit={e => {
                                  e.preventDefault()
                                  this.sendMessageOnWS()
                                  this.setState({messageToSend: '', momentToShare: undefined})
                              }}>
                            <input
                                type="text"
                                placeholder={'Your username'}
                                value={this.state.senderName}
                                onChange={e => this.setState({senderName: e.target.value})}
                            />
                            <input
                                type="text"
                                placeholder={'Enter message...'}
                                value={this.state.messageToSend}
                                onChange={e => this.setState({messageToSend: e.target.value})}
                            />
                            <input
                                type="text"
                                placeholder={'No moment to share'}
                                value={this.props.sharingMoment === undefined ? undefined : Math.floor(this.props.sharingMoment)}
                                disabled
                            />
                            <input type="submit" value={'Send'}/>
                        </form>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="ChatBox" data-testid="ChatBox">
                    <p>Loading chat...</p>
                </div>
            )
        }
    }
}

export default ChatBox;
