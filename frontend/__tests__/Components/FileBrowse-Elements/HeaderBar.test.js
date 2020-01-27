import React from 'react';
import { shallow } from 'enzyme';

import { HeaderBar } from '../../../src/Components/FileBrowse-Elements/HeaderBar';
import { simulateDir, simulateFile } from '../../../Utils/FileBrowse-Elements/utils'

describe('HeaderBar renders', () => {
	const rootDir = simulateDir('/root', 'root', true);
	const dir1 = simulateDir('/dir1', 'dir1');
	const file1 = simulateFile('file1', 'file1');
	const file2 = simulateFile('file2', 'file2');

	const files = [
		rootDir,
		dir1,
		file1,
		file2
	];

	it('Should render one div if no props passed', () => {
		const wrapper = shallow(<HeaderBar />);

		expect(wrapper.find('div')).toHaveLength(1);
	});

	it('Should render one p tag if valid props passed', () => {
		const wrapper = shallow(<HeaderBar files={files} />);

		expect(wrapper.find('p')).toHaveLength(1);
	});

	it('Should have rootdirs path as text', () => {
		const wrapper = shallow(<HeaderBar files={files} />);

		expect(wrapper.find('p').text()).toEqual('/root');
	});
});