import React from 'react';
import './ChatBox.css';

class ChatBox extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            name: "monNom",
            messageToSend: "",
            moment: 0
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
                                {message.moment !== null && <div className='msgMoment'>{message.moment}</div>}
                            </li>
                        ))}
                    </ul>
                </div>
                <div id="messageSender">
                    <form
                        action="."
                        onSubmit={e => {
                            e.preventDefault()
                            this.sendMessageOnWS()
                            this.setState({messageToSend: ''})
                        }}
                    >
                        <input
                            type="text"
                            placeholder={'Enter message...'}
                            value={this.state.messageToSend}
                            onChange={e => this.setState({messageToSend: e.target.value})}
                        />
                        <input type="submit" value={'Send'}/>
                    </form>
                </div>
            </div>
        )
    }

    sendMessageOnWS() {
        const message = {
            name: this.state.name,
            message: this.state.messageToSend,
            moment: this.state.moment
        };
        this.props.ws.send(JSON.stringify(message));
    }
}

export default ChatBox;
