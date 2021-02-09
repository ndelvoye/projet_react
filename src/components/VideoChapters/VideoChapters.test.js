import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import VideoChapters from './VideoChapters';

describe('<VideoChapters />', () => {
  test('it should mount', () => {
    render(<VideoChapters/>);

    const videoChapters = screen.getByTestId('VideoChapters');

    expect(videoChapters).toBeInTheDocument();
  });
});
