import React from 'react';
import './VideoChapters.css';

export class VideoChapters extends React.Component {
    render() {
        return (
            <div className="VideoChapters" data-testid="VideoChapters">
                <ul>
                    {this.props.chapters.map(chapter => (
                        <li key={chapter.posHeures + chapter.posMinutes + chapter.posSecondes + chapter.title}>
                            <div className="chapterTimeStamp">
                                {chapter.posHeures &&
                                <div>{chapter.posHeures}h </div>}
                                {chapter.posMinutes &&
                                <div>{chapter.posMinutes}m </div>}
                                {chapter.posSecondes &&
                                <div>{chapter.posSecondes}s </div>}
                            </div>
                            — {chapter.title}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default VideoChapters;
