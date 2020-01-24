import React from 'react';
import { shallow } from 'enzyme';

import OptionDetailsItem from '../../../src/Components/Options/OptionDetailsItem'

describe('<OptionDetailsItem /> render', () => {
	it('Should render two div and one of each container', () => {
		let wrapper = shallow(<OptionDetailsItem label={''}/>);
		expect(wrapper.find('.option-detail-item-container')).toHaveLength(1);
		expect(wrapper.find('.option-label-help-outer')).toHaveLength(1);
		expect(wrapper.find('div')).toHaveLength(2);
	});
});