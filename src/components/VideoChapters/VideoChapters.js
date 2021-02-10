import React from 'react';
import './VideoChapters.css';

export class VideoChapters extends React.Component {
    render() {
        return (
            <div className="VideoChapters" data-testid="VideoChapters">
                <ul>
                    {this.props.chapters.map(chapter => (
                        <li key={chapter.pos + chapter.title}>{chapter.pos} {chapter.title}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default VideoChapters;
