import React from "react";
import * as PropTypes from "prop-types";
import './UnderVideo.css'

export class UnderVideo extends React.Component {
    static propTypes = {
        // Static attributes
        filmTitle: PropTypes.string,
        synopsisUrl: PropTypes.string,
        duration: PropTypes.number,
    };

    render() {
        return (
            <div className="UnderVideo" data-testid="UnderVideo">
                <h2>{this.props.filmTitle}</h2>

                <h3>Current : {
                    this.props.currentTime ?
                        this.props.currentTime
                        : "Loading..."
                }</h3>

                <h3>Total : {
                    this.props.duration ?
                        new Date(this.props.duration * 1000).toISOString().substr(11, 8)
                        : "Loading..."
                }</h3>

                <button id='shareMoment'>Share this moment</button>
            </div>
        );
    }
}

export default UnderVideo;
