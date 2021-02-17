import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UnderVideo from './UnderVideo';

describe('<UnderVideo />', () => {
  test('it should mount', () => {
    render(<UnderVideo/>);

    const underVideo = screen.getByTestId('UnderVideo');

    expect(underVideo).toBeInTheDocument();
  });
});
