import React from 'react';
import Tabs from "./components/Tabs/Tabs";
import './App.css';
import VideoChapters from "./components/VideoChapters/VideoChapters";
import Map from "./components/Map/Map";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import ChatBox from "./components/ChatBox/ChatBox";

export class App extends React.Component {
    apiUrl = 'https://imr3-react.herokuapp.com/backend'
    wsURL = "wss://imr3-react.herokuapp.com";
    ws = new WebSocket(this.wsURL);

    constructor(props, context) {
        super(props, context);
        this.state = {
            timestamp: 0,
            // API
            dataLoaded: false,
            fileTitle: "",
            synopsisUrl: "",
            chapters: [],
            chapterFields: ["pos", "title"],
            // WS
            connected: false,
            messages: [],
            messageFields: ["when", "name", "message", "moment"]
        }
    }

    handleClick(timestamp) {
        this.setState({timestamp: timestamp});
    }

    componentDidMount() {
        // API Back-End call
        fetch(this.apiUrl)
            .then((response) => response.json())
            .then((data) => {
                let chaptersCopy = data.Chapters;
                chaptersCopy.forEach(chapter => {
                    chapter.formattedTimestamp = new Date(chapter.pos * 1000).toISOString().substr(11, 8)
                })
                this.setState({
                    dataLoaded: true,
                    fileTitle: data.Film.file_title,
                    synopsisUrl: data.Film.synopsis_url,
                    chapters: chaptersCopy
                })
            });

        // WebSocket calls & events
        this.ws.onopen = () => {
            console.log("connected");
            this.setState({
                connected: true
            });
        };

        this.ws.onmessage = evt => {
            const messages = JSON.parse(evt.data);
            messages.map(message => (
                this.setState({
                    messages: this.state.messages.concat(message)
                })
            ));
        }

        this.ws.onclose = () => {
            console.log("disconnected, reconnect.");
            this.setState({
                connected: false,
                ws: new WebSocket(this.wsURL)
            });
        };
    }

    render() {
        return (
            <div className='app'>
                <div className='header'>
                    <img id="logo" alt="Logo IMRStreaming" src="img/logo.png"/>
                    <div id="headerText">Votre nouvelle plateforme de streaming</div>
                </div>
                <div className='content'>
                    <VideoPlayer timestamp={this.state.timestamp}/>
                    <Tabs id='tabs'>
                        <div label="Chapters">
                            <VideoChapters chapters={this.state.chapters}
                                           onClick={this.handleClick.bind(this)}/>
                        </div>
                        <div label="Map">
                            <Map/>
                        </div>
                        <div label="Chat">
                            <ChatBox ws={this.ws}
                                     messages={this.state.messages}
                                     onClick={this.handleClick.bind(this)}/>
                        </div>
                    </Tabs>
                </div>
            </div>)
    }
}
export default App;
