import React from 'react';
import './ChatBox.css';

class ChatBox extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            senderName: "",
            messageToSend: "",
            momentToShare: undefined
        }
    }
    render() {
        return (
            <div className="ChatBox" data-testid="ChatBox">
                <div id="messages">
                    <ul>
                        {this.props.messages.map((message, index) => (
                            <li key={index + message.message}>
                                <div className='msgAuthor'>{message.name}</div>
                                <div className='msgContent'>{message.message}</div>
                                {message.moment !== null && isFinite(message.moment) &&
                                <div className='msgMoment'>Go to {message.moment}</div>}
                            </li>
                        ))}
                    </ul>
                </div>
                <div id="messageToSend">
                    <form
                        action="."
                        onSubmit={e => {
                            e.preventDefault()
                            this.sendMessageOnWS()
                            this.setState({messageToSend: '', momentToShare: null})
                        }}
                    >
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
                            value={this.state.momentToShare}
                            disabled
                        />
                        <input type="submit" value={'Send'}/>
                    </form>
                </div>
            </div>
        )
    }

    sendMessageOnWS() {
        const message = {
            name: this.state.senderName,
            message: this.state.messageToSend,
            moment: this.state.momentToShare
        };
        this.props.ws.send(JSON.stringify(message));
    }
}

export default ChatBox;
