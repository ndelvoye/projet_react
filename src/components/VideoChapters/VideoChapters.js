import React from 'react';
import './VideoChapters.css';
import * as PropTypes from "prop-types";

export class VideoChapters extends React.Component {
    static propTypes = {
        onClick: PropTypes.func.isRequired
    };

    handleClick(desiredTimestamp) {
        this.props.onClick(desiredTimestamp);
    }

    render() {
        return (
            <div className="VideoChapters" data-testid="VideoChapters">
                <ul>
                    {this.props.chapters.map(chapter => (
                        <li key={chapter.pos + chapter.title}
                            onClick={() => this.handleClick(chapter.pos)}>
                            <div className="chapterTimestamp">{chapter.formattedTimestamp}</div>
                            <div className="chapterTitle">{chapter.title}</div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default VideoChapters;
