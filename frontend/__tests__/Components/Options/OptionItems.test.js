import React from 'react';
import { shallow } from 'enzyme';
import { createShallow } from '@material-ui/core/test-utils';

import { OptionItems } from '../../../src/Components/Options/OptionItems'

const options = {
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

describe('<OptionItems /> render', () => {
	it('Should render nothing if no options specified', () => {
		const wrapper = shallow(<OptionItems options={{}}/>);

		// There should be 1 React.Fragment and nothing else
		expect(wrapper.find('Fragment')).toHaveLength(1);
		expect(wrapper.find('ExpansionPanel')).toHaveLength(0);
		expect(wrapper.find('ExpansionPanelSummary')).toHaveLength(0);
		expect(wrapper.find('ExpansionPanelDetails')).toHaveLength(0);
		expect(wrapper.find('p')).toHaveLength(0);
	});

	it('Should render two expansion panels if options specified', () => {
		const wrapper = shallow(<OptionItems options={options}/>);

		expect(wrapper).toMatchSnapshot();

	});
});