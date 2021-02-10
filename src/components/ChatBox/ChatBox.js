import React from 'react';
import './ChatBox.css';

class ChatBox extends React.Component {
    URL = "wss://imr3-react.herokuapp.com";
    ws = new WebSocket(this.URL);

    constructor(props, context) {
        super(props, context);
        this.state = {
            connected: false,
            messageToSend: "",
            messages: [],
            messageFields: ["when", "name", "message", "moment"]
        }
        this.add = this.add.bind(this);
    }

    componentDidMount() {
        this.ws.onopen = () => {
            console.log("connected");
            this.setState({
                connected: true
            });
        };

        this.ws.onmessage = evt => {
            const messages = JSON.parse(evt.data);
            console.log(messages)
            messages.map(message => this.add(message));
        };

        this.ws.onclose = () => {
            console.log("disconnected, reconnect.");
            this.setState({
                connected: false,
                ws: new WebSocket(this.URL)
            });
        };
    }

    add(message) {
        this.setState({
            messages: this.state.messages.concat(message)
        })
    }

    render() {
        return (
            <div className="ChatBox" data-testid="ChatBox">
                <div id="messages">
                    <ul>
                        {this.state.messages.map((message) => (
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
        this.ws.send(JSON.stringify(message));
    }
}

export default ChatBox;
