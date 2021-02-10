import React from 'react';
import './ChatBox.css';

class ChatBox extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            ws: null,
            messageToSend: ""
        }
    }

    render() {
        return (
            <div className="ChatBox" data-testid="ChatBox">
                <div id="messages">
                    <ul>
                        {this.props.messages.map((message) => (
                            <li key={message.when}><span>{message.name}</span> {message.message}</li>
                        ))}
                    </ul>
                </div>
                <div id="messageSender">
                    <form
                        action="."
                        onSubmit={e => {
                            e.preventDefault()
                            this.onSubmitMessage()
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

    onSubmitMessage() {
        const message = {name: this.state.name, message: this.state.messageToSend};
        this.state.ws.send(JSON.stringify(message));
    }
}

export default ChatBox;
