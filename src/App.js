import React from 'react';
import Tabs from "./components/Tabs/Tabs";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";

function App() {
    const videoUrl = "https://ia801406.us.archive.org/32/items/Route_66_-_an_American_badDream/Route_66_-_an_American_badDream_512kb.mp4";
    return (
        <div className='app'>
            <VideoPlayer url={videoUrl}/>
            <Tabs/>
        </div>
    );
}

export default App;
