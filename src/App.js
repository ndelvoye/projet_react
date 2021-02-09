import React from 'react';
import ReactPlayer from 'react-player';
import Tabs from "./components/Tabs/Tabs";
import './App.css';
import VideoChapters from "./components/VideoChapters/VideoChapters";
import ChatBox from "./components/ChatBox/ChatBox";
import Map from "./components/Map/Map";

function App() {
    const videoUrl = "https://ia801406.us.archive.org/32/items/Route_66_-_an_American_badDream/Route_66_-_an_American_badDream_512kb.mp4";
    return (
        <div className='app'>
            <div className='header'>
                <img id="logo" alt="Logo IMRStreaming" src="logo.png"/>
                Votre nouvelle plateforme de streaming
            </div>
            <ReactPlayer src={videoUrl}/>
            <Tabs>
                <div label="Chapters">
                    <VideoChapters/>
                </div>
                <div label="Map">
                    <Map/>
                </div>
                <div label="Chat">
                    <ChatBox/>
                </div>
            </Tabs>
        </div>
    );
}

export default App;
