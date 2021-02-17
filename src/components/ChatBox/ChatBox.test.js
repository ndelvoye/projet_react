import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ChatBox from './ChatBox';
import {configure} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('props check', () => {
  test('should display "Loading chat..." if no isWsReady', () => {
    const container = render(<ChatBox isWsReady={false} onClick={() => alert('test')}/>);
    expect(container.getByTestId('ChatBox').innerHTML).toBe('<p>Loading chat...</p>');
  });

  // Test clicking on a timestamp from a message in the chat calls onClick
});
