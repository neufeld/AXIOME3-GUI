import React from 'react';
import { shallow } from 'enzyme';

import { OptionDetails } from '../../../src/Components/Options/OptionDetails'

const DenoiseOption = {
	optionList: {
		entities: {
			basicOptions: {
				id: "basicOptions",
				summaryText: "Basic Options",
				defaultExpanded: true
			},
			advancedOptions: {
				id: "advancedOptions",
				summaryText: "Advanced Options",
				defaultExpanded: false
			}
		},
		keys: ["basicOptions", "advancedOptions"]
	},
	basicOptions: {
		entities: {
			basicOption1: {
				id: "basicOption1",
				label: "trunc-len-f"
			},
			basicOption2: {
				id: "basicOption2",
				label: "trunc-len-r"
			}
		},
		keys: ["basicOption1", "basicOption2"]
	},
	advancedOptions: {
		entities: {
			advancedOption1: {
				id: "advancedOption1",
				label: "Some advanced option"
			}
		},
		keys: ["advancedOption1"]
	}
}

describe('<OptionDetails /> render', () => {
	it('Should render one div if no options specified', () => {
		let wrapper;
		wrapper = shallow(<OptionDetails optionType={"basicOptions"} options={{}}/>);

		expect(wrapper.find('div')).toHaveLength(1);
	});

	it('Should render 2 OptionDetailsItem if optionType is basicOptions', () => {
		let wrapper;
		wrapper = shallow(<OptionDetails optionType={"basicOptions"} options={DenoiseOption}/>);

		expect(wrapper.find('OptionDetailsItem')).toHaveLength(2);
	});

	it('Should render 4 OptionDetailsItem if optionType is advancedOptions', () => {
		let wrapper;
		wrapper = shallow(<OptionDetails optionType={"advancedOptions"} options={DenoiseOption}/>);

		expect(wrapper.find('OptionDetailsItem')).toHaveLength(1);
	});
});