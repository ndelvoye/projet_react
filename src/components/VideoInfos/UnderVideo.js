import React from "react";
import * as PropTypes from "prop-types";
import './UnderVideo.css'

export class UnderVideo extends React.Component {
    static propTypes = {
        filmTitle: PropTypes.string.isRequired
    };

    render() {
        return (
            <div className="UnderVideo" data-testid="UnderVideo">
                <h2>{this.props.filmTitle}</h2>
                <h3>{this.props.duration}</h3>
            </div>
        );
    }
}

export default UnderVideo;
