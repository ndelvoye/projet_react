import React from "react";
import * as PropTypes from "prop-types";
import './UnderVideo.css'
import * as DateUtils from "../../utils/DateUtils";

export class UnderVideo extends React.Component {
    static defaultProps = {
        filmTitle: "Loading title...",
        synopsisUrl: "#",
        keywords: [],
        currentTime: 0
    };

    static propTypes = {
        // Static attributes
        filmTitle: PropTypes.string,
        synopsisUrl: PropTypes.string,
        keywords: PropTypes.array,
        onClick: PropTypes.func.isRequired,

        // Dynamic attribute
        currentTime: PropTypes.number
    }

    /**
     * Sends momentToShare to App component
     * @param momentToShare
     */
    handleClick(momentToShare) {
        this.props.onClick(this.props.currentTime);
    }

    render() {
        if (this.props.isDataLoaded) {
            const potentialKeywords = this.props.keywords.filter(keyword => keyword.pos < this.props.currentTime);

            // Get most pertinents keywords
            // = Max pos in keywords before currentTime
            const mostRecentKeyword = Math.max.apply(Math, potentialKeywords.map(function (k) {
                return k.pos;
            }));

            // String & number are not same type, == is enough check
            const currentKeywords = this.props.keywords.filter(keyword => keyword.pos == mostRecentKeyword);
            return (
                <div className="UnderVideo" data-testid="UnderVideo">
                    <div id='filmInfos'>
                        <h2>{this.props.filmTitle}</h2>
                        {/* eslint-disable-next-line react/jsx-no-target-blank */}
                        <a href={this.props.synopsisUrl} target="_blank">
                            <button id='goToSynopsisButton'>Go to synopsis</button>
                        </a>
                    </div>

                    <div id='currentTime'>
                        <h3>Current : {DateUtils.timestampToHoursMinutesSeconds(this.props.currentTime)}</h3>
                        <button id='shareMomentButton' onClick={() => this.handleClick(this.props.currentTime)}>
                            Share this moment
                        </button>
                    </div>

                    <div id='associatedTags'>
                        {currentKeywords.length === 0 && "No tag associated to that timestamp"}
                        {currentKeywords.length > 0 && currentKeywords.map(keyword => (
                            keyword.data.map((tag, index) => (
                                // eslint-disable-next-line react/jsx-no-target-blank
                                <a href={tag.url} target="_blank" key={tag + index}>
                                    <div className='videoTag'>{tag.title}</div>
                                </a>
                            ))
                        ))}
                    </div>

                </div>
            )
        } else {
            return <p>Loading...</p>
        }
    }
}

export default UnderVideo;
