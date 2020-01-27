import React from 'react';
import { shallow } from 'enzyme';

import { FileBrowseItem } from '../../../src/Components/FileBrowse-Elements/FileBrowseItem';
import { simulateDir, simulateFile } from '../../../Utils/FileBrowse-Elements/utils'

const mockGetFiles = jest.fn();
const mockSelectFile = jest.fn();

const renderFileBrowseItem = (displayText, matchedFileName, file) => {
	// ID does not really matter in unit testing
	const id = 0;
	return(
		<FileBrowseItem 
			displayText={displayText}
			matchedFileName={matchedFileName}
			file={file}
			getFiles={mockGetFiles}
			selectFile={mockSelectFile}
			id={id}
		/>
	)
}

describe('FileBrowseItem renders', () => {
	let wrapper;
	const dir = simulateDir('/dir1', 'dir1');
	const file = simulateFile('file1', 'file1');

	it('Should render one div and one p', () => {
		const displayText = "testDisplay";
		const matchedFileName = "test";

		const wrapper = shallow(renderFileBrowseItem(displayText, matchedFileName, file));
		expect(wrapper.find('div')).toHaveLength(1);
		expect(wrapper.find('p')).toHaveLength(1);
	});

	it('Should render file icon if file.type === file', () => {
		const displayText = "testDisplay";
		const matchedFileName = "test";

		const wrapper = shallow(renderFileBrowseItem(displayText, matchedFileName, file));
		expect(wrapper.find('DescriptionTwoToneIcon'))
	});

	it('Should render dir icon if file.type === dir', () => {
		const displayText = "testDisplay";
		const matchedFileName = "test";

		const wrapper = shallow(renderFileBrowseItem(displayText, matchedFileName, dir));
		expect(wrapper.find('FolderTwoToneIcon'))
	});

	it('Should render correct text', () => {
		const displayText = "testDisplay";
		const matchedFileName = "test";

		const wrapper = shallow(renderFileBrowseItem(displayText, matchedFileName, dir));
		expect(wrapper.find('p').text()).toEqual('testDisplay');
	});

	it('Should render correct style for type===file if matching file name', () => {
		const displayText = "testDisplay";
		const matchedFileName = "file1";

		const wrapper = shallow(renderFileBrowseItem(displayText, matchedFileName, file));

		// This will only work with inline styling
		var containerStyle = wrapper.find(`[test-attr='clickForEvent']`).get(0).props.style;

		expect(containerStyle).toEqual({"background": "lightgray"})
	});

	it('Should render correct style for type===file if not matching file name', () => {
		const displayText = "testDisplay";
		const matchedFileName = "randomText";

		const wrapper = shallow(renderFileBrowseItem(displayText, matchedFileName, file));

		// This will only work with inline styling
		var containerStyle = wrapper.find(`[test-attr='clickForEvent']`).get(0).props.style;

		expect(containerStyle).toEqual({"background": "white"})
	});
});

describe('FileBrowseItem interaction', () => {
	let wrapper;
	const dir = simulateDir('/dir1', 'dir1');
	const file = simulateFile('file1', 'file1');

	afterEach(() => {
	  jest.clearAllMocks();
	});

	it('Should only call getFiles if file.type === dir', () => {
		const displayText = "testDisplay";
		const matchedFileName = "test";

		const wrapper = shallow(renderFileBrowseItem(displayText, matchedFileName, dir));
		wrapper.find(`[test-attr='clickForEvent']`).simulate('click');
		expect(mockGetFiles.mock.calls.length).toEqual(1);
		expect(mockSelectFile.mock.calls.length).toEqual(0);
	});

	it('Should only call selectFile if file.type === file', () => {
		const displayText = "testDisplay";
		const matchedFileName = "test";

		const wrapper = shallow(renderFileBrowseItem(displayText, matchedFileName, file));
		wrapper.find(`[test-attr='clickForEvent']`).simulate('click');
		expect(mockGetFiles.mock.calls.length).toEqual(0);
		expect(mockSelectFile.mock.calls.length).toEqual(1);
	});
});