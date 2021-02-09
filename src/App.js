import React from 'react';
import Tabs from "./components/Tabs/Tabs";
import './App.css';
import VideoChapters from "./components/VideoChapters/VideoChapters";
import ChatBox from "./components/ChatBox/ChatBox";
import Map from "./components/Map/Map";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";

function App() {
    return (
        <div className='app'>
            <div className='header'>
                <img id="logo" alt="Logo IMRStreaming" src="img/logo.png"/>
                Votre nouvelle plateforme de streaming
            </div>
            <div className='content'>
                <VideoPlayer/>
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
        </div>
    );
}

export default App;
