import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import VideoTags from './VideoTags';

describe('<VideoTags />', () => {
    test('it should mount', () => {
        render(<VideoTags/>);

        const videoTags = screen.getByTestId('VideoTags');

        expect(videoTags).toBeInTheDocument();
    });
});
