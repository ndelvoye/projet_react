import React from 'react';
import './VideoPlayer.css';
import {Player} from "video-react";

class VideoPlayer extends React.Component {
    render() {
        return (
            <Player playsInline fluid={false} height={700} width={1300}>
                <source
                    src='https://ia801406.us.archive.org/32/items/Route_66_-_an_American_badDream/Route_66_-_an_American_badDream_512kb.mp4'/>
            </Player>
        )
    }
}

export default VideoPlayer;
