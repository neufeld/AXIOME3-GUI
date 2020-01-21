import React from 'react';
import { shallow } from 'enzyme';

import OptionInputField from '../../../src/Components/Options/OptionInputField'

describe('<OptionInputField /> render', () => {
	it('Should render one <input>', () => {
		let wrapper = shallow(<OptionInputField />);
		expect(wrapper.children('input')).toHaveLength(1);
	});
});