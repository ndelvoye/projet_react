import React from 'react';
import Tabs from "./components/Tabs/Tabs";
import './App.css';
import VideoChapters from "./components/VideoChapters/VideoChapters";
import UnderVideo from "./components/VideoInfos/UnderVideo";
import Map from "./components/Map/Map";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import ChatBox from "./components/ChatBox/ChatBox";

export class App extends React.Component {
    wsURL = "wss://imr3-react.herokuapp.com";
    ws = new WebSocket(this.wsURL);

    constructor(props, context) {
        super(props, context);
        this.state = {
            // Video Player
            timestamp: 0,

            // API
            dataLoaded: false,
            filmTitle: "a",
            synopsisUrl: "",
            chapters: [],
            chapterFields: ["pos", "title"],
            waypoints: [],
            waypointsFields: ["lat", "lng", "label", "timestamp"],
            keywords: [],
            keywordsFields: ["pos", "data"],

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
        fetch('https://imr3-react.herokuapp.com/backend')
            .then((response) => response.json())
            .then((data) => {
                // On ajoute un champ "formattedTimestamp" qui sera affiché côté front
                data.Chapters.forEach(chapter => {
                    chapter.formattedTimestamp = new Date(chapter.pos * 1000).toISOString().substr(11, 8)
                })
                this.setState({
                    dataLoaded: true,
                    filmTitle: data.Film.title,
                    synopsisUrl: data.Film.synopsis_url,
                    chapters: data.Chapters,
                    waypoints: data.Waypoints,
                    keywords: data.Keywords,
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
                    <div className='video'>
                        <VideoPlayer timestamp={this.state.timestamp}/>
                        <UnderVideo filmTitle={this.state.filmTitle}/>
                    </div>
                    <Tabs id='tabs'>
                        <div label="Chapters">
                            <VideoChapters dataLoaded={this.state.dataLoaded}
                                           chapters={this.state.chapters}
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
