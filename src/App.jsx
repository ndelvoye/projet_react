import React from 'react';
import Tabs from "./components/Tabs/Tabs";
import './App.css';
import VideoChapters from "./components/VideoChapters/VideoChapters";
import UnderVideo from "./components/VideoInfos/UnderVideo";
import Map from "./components/Map/Map";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import ChatBox from "./components/ChatBox/ChatBox";

export class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            // Video Player
            currentTime: null,
            timestamp: undefined,

            // API
            isDataLoaded: false,
            filmTitle: null,
            synopsisUrl: null,
            chapters: [],
            chapterFields: ["pos", "title"],
            waypoints: [],
            waypointsFields: ["lat", "lng", "label", "timestamp"],
            keywords: [],
            keywordsFields: ["pos", "data"],

            // WS
            ws: null,
            connected: false,
            messages: [],
            messageFields: ["when", "name", "message", "moment"],

            // Chat infos
            sharingMoment: undefined
        }
    }

    componentDidMount() {
        // API Back-End call
        fetch('https://imr3-react.herokuapp.com/backend')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    isDataLoaded: true,
                    filmTitle: data.Film.title,
                    synopsisUrl: data.Film.synopsis_url,
                    chapters: data.Chapters,
                    waypoints: data.Waypoints,
                    keywords: data.Keywords,
                })
            });

        this.connectToWS();
    }

    /**
     * Change timestamp
     * @param timestamp
     */
    handleChangeTimestamp = (timestamp) => {
        this.setState({timestamp: timestamp});
    }

    /**
     * Change currentTime
     * @param currentTime
     */
    handleChangeCurrentTime = (currentTime) => {
        this.setState({currentTime: currentTime});
    }

    /**
     * Change sharingMoment
     * @param sharingMoment
     */
    handleChangeSharingMoment = (sharingMoment) => {
        this.setState({sharingMoment: sharingMoment});
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
                        <VideoPlayer timestamp={this.state.timestamp}
                                     onChangeCurrentTime={this.handleChangeCurrentTime}
                        />
                        <UnderVideo filmTitle={this.state.filmTitle}
                                    synopsisUrl={this.state.synopsisUrl}
                                    currentTime={this.state.currentTime}
                                    onClick={this.handleChangeSharingMoment}
                        />
                    </div>
                    <Tabs id='tabs'>
                        <div label="Chapters">
                            <VideoChapters isDataLoaded={this.state.isDataLoaded}
                                           chapters={this.state.chapters}
                                           onClick={this.handleChangeTimestamp}
                            />
                        </div>
                        <div label="Map">
                            <Map/>
                        </div>
                        <div label="Chat">
                            <ChatBox ws={this.state.ws}
                                     isWsReady={this.state.connected}
                                     messages={this.state.messages}
                                     sharingMoment={this.state.sharingMoment}
                                     onClick={this.handleChangeTimestamp}
                            />
                        </div>
                    </Tabs>
                </div>
            </div>)
    }

    connectToWS = () => {
        const ws = new WebSocket("wss://imr3-react.herokuapp.com");
        let that = this; // cache the this
        let connectInterval;

        ws.onopen = () => {
            console.log("Connected to WS.");
            this.setState({
                ws: ws,
                connected: true
            });
            this.setState({
                messages: []
            }, this.scrollToBottom);
            that.timeout = 250; // reset timer to 250 on open of websocket connection
            clearTimeout(connectInterval);
        }

        ws.onmessage = evt => {
            const messages = JSON.parse(evt.data);
            messages.map(message => (
                this.setState({
                    messages: this.state.messages.concat(message)
                }, this.scrollToBottom)
            ));
        }

        ws.onclose = () => {
            console.log(`Disconnected from WS. Reconnect will be attempted in ${Math.min(10000 / 1000, (that.timeout + that.timeout) / 1000)} second(s)`
            );

            that.timeout = that.timeout + that.timeout; // increment retry interval
            connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); // call check function after timeout
        };

        ws.onerror = err => {
            console.error(
                "Socket encountered error: ",
                err.message,
                "Closing socket"
            );

            ws.close();
        };
    }

    /**
     * Used by the function connectToWS to check if the connection is closed, if so, attempts to reconnect
     */
    check = () => {
        const {ws} = this.state;
        if (!ws || ws.readyState === WebSocket.CLOSED) this.connectToWS();
    };
}

export default App;
