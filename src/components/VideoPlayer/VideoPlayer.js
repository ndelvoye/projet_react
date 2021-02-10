import React from 'react';
import './VideoPlayer.css';
import {Player} from "video-react";

class VideoPlayer extends React.Component {
    render() {
        return (
            <Player playsInline fluid={false} height={window.innerHeight * 0.7} width={window.innerWidth * 0.7}>
                <source
                    src='https://ia801406.us.archive.org/32/items/Route_66_-_an_American_badDream/Route_66_-_an_American_badDream_512kb.mp4'/>
            </Player>
        )
    }

}

export default VideoPlayer;
