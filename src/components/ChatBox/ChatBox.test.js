import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ChatBox from './ChatBox';

describe('<ChatBox />', () => {
  test('it should mount', () => {
    render(<ChatBox/>);

    const chatBox = screen.getByTestId('ChatBox');

    expect(chatBox).toBeInTheDocument();
  });
});
