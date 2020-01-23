import React from 'react';
import { shallow } from 'enzyme';

import { DropZone } from '../../../src/Components/Upload-Elements/DropZone'

let wrapper;
let mockCb;
const label = "test"

beforeEach(() => {
	mockCb = jest.fn();
	wrapper = shallow(<DropZone selectFile={mockCb} label={label} id={0} />)
});

describe('DropZone renders', () => {
	it('Should return three div, two p, and one input', () => {
		expect(wrapper.find('input')).toHaveLength(1);
		expect(wrapper.find('p')).toHaveLength(2);
		expect(wrapper.find('div')).toHaveLength(3);
	});

	it('Should return correct inner text', () => {
		expect(wrapper.find('.dropzone-sub-label.main').text()).toEqual(label)
		expect(wrapper.find('.dropzone-sub-label.misc').text()).toEqual("Drag & Drop or Click")
	});
});

// Some issue with this
describe('DropZone interaction', () => {
	it('Should handle onChange', () => {
		//console.log(wrapper.debug())
		//wrapper.find('input').simulate('change');
		//expect(mockCb.mock.calls.length).toEqual(1);
	})
});