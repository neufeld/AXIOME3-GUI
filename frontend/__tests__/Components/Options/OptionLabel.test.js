import React from 'react';
import { shallow } from 'enzyme';

import OptionLabel from '../../../src/Components/Options/OptionLabel'

let wrapper;

describe('<OptionLabel /> render', () => {
	it('Should render one <span>', () => {
		wrapper = shallow(<OptionLabel />);
		expect(wrapper.find('span')).toHaveLength(1);
	});

	it('Renders default value when no props passed', () => {
		wrapper = shallow(<OptionLabel />);
		expect(wrapper.find('span').text()).toEqual('');
	})

	it('Renders properly when props passed', () => {
		wrapper = shallow(<OptionLabel label="Option 1" />);
		expect(wrapper.find('span').text()).toEqual('Option 1')
	})

});