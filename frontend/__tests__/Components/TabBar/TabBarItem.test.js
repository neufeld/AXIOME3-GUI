import React from 'react';
import { shallow } from 'enzyme';

import { TabBarItem } from '../../../src/Components/TabBar/TabBarItem'

const navBarField = [
	{id: 0, label: "test1", value: "/"},
	{id: 1, label: "test2", value: "/test2"},
	{id: 2, label: "test3", value: "/test3"}
]

// Create dummy history props for the sake of unit testing
// More thorough test to be done in integration test
const history = {
	location: {
		pathname: '/'
	}
}

describe('TabBarItem renders', () => {
	let wrapper;

	beforeAll(() => {
		wrapper = shallow(<TabBarItem navBarField={navBarField} history={history}/>)
	});

	it('Should render one Tabs and three Tab components', () => {
		expect(wrapper.find('WithStyles(ForwardRef(Tabs))')).toHaveLength(1);
		expect(wrapper.find('WithStyles(ForwardRef(Tab))')).toHaveLength(3);
	});
});