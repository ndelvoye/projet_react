import React from 'react';
import './VideoChapters.css';

export class VideoChapters extends React.Component {
    render() {
        return (
            <div className="VideoChapters" data-testid="VideoChapters">
                <ul>
                    {this.props.chapters.map(chapter => (
                        <li key={chapter.timestamp + chapter.title}>
                            <div className="chapterTimeStamp">{chapter.timestamp}</div>
                            <div className="chapterTitle">{chapter.title}</div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default VideoChapters;
