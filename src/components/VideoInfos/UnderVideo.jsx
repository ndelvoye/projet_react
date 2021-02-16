import React from "react";
import * as PropTypes from "prop-types";
import './UnderVideo.css'
import * as DateUtils from "../../utils/DateUtils";

export class UnderVideo extends React.Component {
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
                <h2>{this.props.filmTitle}</h2>

                <h3>Current : {
                    this.props.currentTime && this.props.currentTime > -1 ?
                        DateUtils.timestampToHoursMinutesSeconds(this.props.currentTime)
                        : "Loading..."
                }</h3>

                <button id='shareMoment' onClick={() => this.handleClick(this.props.currentTime)}>Share this moment
                </button>
            </div>
        );
    }
}

export default UnderVideo;
