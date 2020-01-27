import React from 'react';
import { shallow } from 'enzyme';

import { CheckBox } from '../../../src/Components/FileBrowse-Elements/CheckBox';
import { simulateDir, simulateFile } from '../../../Utils/FileBrowse-Elements/utils'

const mockSelectFile = jest.fn();

const renderCheckBox = (matchedFileName, file) => {
	// ID does not really matter in unit testing
	const id = 0;
	return(
		<CheckBox 
			matchedFileName={matchedFileName}
			file={file}
			selectFile={mockSelectFile}
			id={id}
		/>
	)
}

describe('CheckBox renders', () => {
	let wrapper;
	const dir = simulateDir('/dir1', 'dir1');
	const file = simulateFile('file1', 'file1');

	it('Should render one div if type === dir', () => {
		const matchedFileName = "test2";

		wrapper = shallow(renderCheckBox(matchedFileName, dir));
		expect(wrapper.find('div')).toHaveLength(1);
		expect(wrapper.find('input')).toHaveLength(0);
	});

	it('Should render one div and one input if type === file', () => {
		const matchedFileName = "test2";

		wrapper = shallow(renderCheckBox(matchedFileName, file));
		expect(wrapper.find('div')).toHaveLength(1);
		expect(wrapper.find('input')).toHaveLength(1);
	});

	it('Should render input with proper value if type === file', () => {
		const matchedFileName = "file1";

		wrapper = shallow(renderCheckBox(matchedFileName, file));
		
		const expectedValue = "file1"
		var input = wrapper.find('input');
		expect(input.props().value).toEqual(expectedValue);
	});

	it('Should render input with checked=true if matching file name', () => {
		const matchedFileName = "file1";

		wrapper = shallow(renderCheckBox(matchedFileName, file));
		
		const expectedValue = true;
		var input = wrapper.find('input');
		expect(input.props().checked).toEqual(expectedValue);
	});

	it('Should render input with checked=false if not matching file name', () => {
		const matchedFileName = "randomText";

		wrapper = shallow(renderCheckBox(matchedFileName, file));
		
		const expectedValue = false;
		var input = wrapper.find('input');
		expect(input.props().checked).toEqual(expectedValue);
	});
});

describe('CheckBox interaction', () => {
	let wrapper;
	const dir = simulateDir('/dir1', 'dir1');
	const file = simulateFile('file1', 'file1');

	afterEach(() => {
	  jest.clearAllMocks();
	});

	it('Should call selectFile on change', () => {
		const matchedFileName = "file1";

		wrapper = shallow(renderCheckBox(matchedFileName, file));
		wrapper.find('input').simulate('change')
		expect(mockSelectFile.mock.calls.length).toEqual(1);
	});
})