import React from "react";
import * as PropTypes from "prop-types";
import './UnderVideo.css'
import * as DateUtils from "../../utils/DateUtils";

export class UnderVideo extends React.Component {
    static defaultProps = {
        currentTime: 0
    };

    static propTypes = {
        // Static attributes
        filmTitle: PropTypes.string,
        synopsisUrl: PropTypes.string,
        onClick: PropTypes.func.isRequired,

        // Dynamic attribute
        currentTime: PropTypes.number
    };

    /**
     * Sends momentToShare to App component
     * @param momentToShare
     */
    handleClick(momentToShare) {
        this.props.onClick(this.props.currentTime);
    }

    render() {
        return (
            <div className="UnderVideo" data-testid="UnderVideo">
                {/* eslint-disable-next-line react/jsx-no-target-blank */}
                <h2>{this.props.filmTitle} <a href={this.props.synopsisUrl} target="_blank">
                    <button>Go to synopsis</button>
                </a></h2>
                <h3>Current : {DateUtils.timestampToHoursMinutesSeconds(this.props.currentTime)}</h3>

                <button id='shareMoment' onClick={() => this.handleClick(this.props.currentTime)}>Share this moment
                </button>
            </div>
        );
    }
}

export default UnderVideo;
