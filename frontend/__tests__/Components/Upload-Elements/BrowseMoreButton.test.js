import React from 'react';
import { shallow } from 'enzyme';

import { BrowseMoreButton } from '../../../src/Components/Upload-Elements/BrowseMoreButton'

let wrapper;
let mockCallback;

beforeEach(() => {
	mockCallback = jest.fn();
	wrapper = shallow(<BrowseMoreButton getFiles={mockCallback}/>);
});

describe('BrowseMoreButton renders', () => {
	it('Should render one div and one p', () => {
		expect(wrapper.find('div')).toHaveLength(1);
		expect(wrapper.find('p')).toHaveLength(1);
	});

	it('Should have proper inner text', () => {
		expect(wrapper.find('p').text()).toEqual('Click here to browse from the server');
	});
});

describe('BrowseMoreButton interaction', () => {
	it('Should invoke function on click', () => {
		wrapper.find('.clickable').simulate('click');
		expect(mockCallback.mock.calls.length).toEqual(1);
	});
});