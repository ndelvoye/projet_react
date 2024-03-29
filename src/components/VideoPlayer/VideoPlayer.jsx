import React from 'react';
import './VideoPlayer.css';
import {Player} from 'video-react';


class VideoPlayer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            player: null,
            playerSource: 'https://ia801406.us.archive.org/32/items/Route_66_-_an_American_badDream/Route_66_-_an_American_badDream_512kb.mp4',
            currentTime: 0
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.timestamp !== this.props.timestamp) {
            this.player.seek(this.props.timestamp);
        }

        if (this.player) {
            this.player.subscribeToStateChange(
                this.handleStateChange.bind(this)
            );
        }
    }

    handleStateChange(state, prevState) {
        if (prevState.currentTime !== state.currentTime) {
            this.props.onChangeCurrentTime(state.currentTime);
        }
    }

    render() {
        return (
            <Player playsInline
                    fluid={false}
                    height={window.innerHeight * 0.7}
                    width={window.innerWidth * 0.7}
                    subscribeToStateChange={this.subscribeToStateChange}
                    ref={player => {
                        this.player = player;
                    }}>
                <source src={this.state.playerSource}/>
            </Player>
        )
    }

}

export default VideoPlayer;
