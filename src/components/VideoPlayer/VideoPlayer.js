import React from 'react';
import './VideoPlayer.css';
import {Player} from "video-react";

const VideoPlayer = () => (
    <Player playsInline fluid={false} width={800}>
        <source
            src='https://ia801406.us.archive.org/32/items/Route_66_-_an_American_badDream/Route_66_-_an_American_badDream_512kb.mp4'/>
    </Player>
);

VideoPlayer.propTypes = {};

VideoPlayer.defaultProps = {};

export default VideoPlayer;
