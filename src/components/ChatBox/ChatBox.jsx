import React from 'react';
import './ChatBox.css';
import * as PropTypes from "prop-types";
import * as DateUtils from "../../utils/DateUtils";

class ChatBox extends React.Component {
    static propTypes = {
        isWsReady: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            senderName: "ndelvoye",
            messageToSend: "",
            sharingMoment: undefined
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.sharingMoment !== prevProps.sharingMoment) {
            this.setState({sharingMoment: this.props.sharingMoment});
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
            moment: this.state.sharingMoment,
        };
        this.props.ws.send(JSON.stringify(message));
        this.setState({sharingMoment: undefined})
    }

    render() {
        if (this.props.isWsReady) {
            return (
                <div className="ChatBox" data-testid="ChatBox">
                    <div id="messages">
                        <ul>
                            {this.props.messages.map((message, index) => (
                                <li key={message + index}>
                                    <div className='msgDate'>
                                        {DateUtils.timestampToHoursMinutes(message.when)}
                                    </div>
                                    <div className='msgAuthor'>
                                        {message.name}
                                    </div>
                                    :
                                    <div className='msgContent'>
                                        {message.message}
                                    </div>

                                    {message.moment !== null && isFinite(message.moment) &&
                                    <div className='msgMoment' onClick={() => this.handleClick(message.moment)}>
                                        Go to {DateUtils.timestampToHoursMinutesSeconds(Math.floor(message.moment))}
                                    </div>}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div id="messageToSend">
                        <form id="messageToSendForm" action="."
                              onSubmit={e => {
                                  e.preventDefault()
                                  this.sendMessageOnWS()
                                  this.setState({messageToSend: '', momentToShare: undefined})
                              }}>
                            <input
                                id='senderName'
                                type="text"
                                placeholder={'Your username'}
                                value={this.state.senderName}
                                onChange={e => this.setState({senderName: e.target.value})}
                            />
                            <textarea
                                id='messageToSend'
                                placeholder={'Enter message...'}
                                value={this.state.messageToSend}
                                onChange={e => this.setState({messageToSend: e.target.value})}
                            />
                            <input
                                id='momentToShare'
                                type="text"
                                placeholder={'No moment to share'}
                                value={!this.state.sharingMoment ? 'No moment to share' : DateUtils.timestampToHoursMinutesSeconds(Math.floor(this.state.sharingMoment))}
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
