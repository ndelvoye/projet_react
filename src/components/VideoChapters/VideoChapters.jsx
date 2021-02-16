import React from 'react';
import './VideoChapters.css';
import * as PropTypes from "prop-types";

export class VideoChapters extends React.Component {
    static propTypes = {
        isDataLoaded: PropTypes.bool.isRequired,
        chapters: PropTypes.array.isRequired,
        onClick: PropTypes.func.isRequired
    };

    /**
     * Sends desiredTimestamp to App component
     * @param desiredTimestamp
     */
    handleClick(desiredTimestamp) {
        this.props.onClick(desiredTimestamp);
    }

    render() {
        if (this.props.isDataLoaded) {
            return (
                <div className="VideoChapters" data-testid="VideoChapters">
                    <ul>
                        {this.props.chapters.map((chapter, index) => (
                            <li key={index}
                                onClick={() => this.handleClick(chapter.pos)}>
                                <div className="chapterTimestamp">{chapter.formattedTimestamp}</div>
                                <div className="chapterTitle">{chapter.title}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        } else {
            return (
                <div className="VideoChapters" data-testid="VideoChapters">
                    <p>Loading chapters...</p>
                </div>
            )
        }
    }
}

export default VideoChapters;
