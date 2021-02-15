import React from "react";
import * as PropTypes from "prop-types";
import './UnderVideo.css'


export class UnderVideo extends React.Component {
    static propTypes = {
        filmTitle: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
    };

    render() {
        return (
            <div className="UnderVideo" data-testid="UnderVideo">
                <h2>{this.props.filmTitle}</h2>
                <h3>{new Date(this.props.duration * 1000).toISOString().substr(11, 8)}</h3>
            </div>
        );
    }
}

export default UnderVideo;
