import React from 'react';
import { shallow } from 'enzyme';

import { UploadedItemDisplay } from '../../../src/Components/Upload-Elements/UploadedItemDisplay'

const id1 = 0;
const id2 = 1;
const file1 = {name: "file1.txt", size: 100};
const file2 = {name: "file2.txt", size: 100};

const selectedFiles = [
	{
		selectedFile: file1,
		id: id1}, 
	{
		selectedFile: file2,
		id: id2}
];

describe('UploadedItemDisplay renders', () => {
	it('Should return one div if no props passed', () => {
		const wrapper = shallow(<UploadedItemDisplay />);
		
		expect(wrapper.find('p').exists()).toEqual(false);
		expect(wrapper.find('div')).toHaveLength(1);
	});

	it('Should return one div if no matching ID', () => {
		// If no props passed, ID will equal -1 by default
		let wrapper = shallow(<UploadedItemDisplay selectedFiles={selectedFiles}/>);

		expect(wrapper.find('p').exists()).toEqual(false);
		expect(wrapper.find('div')).toHaveLength(1);
	});

	it('Should return one div and one p with proper text if one matching ID', () => {
		let wrapper = shallow(<UploadedItemDisplay selectedFiles={selectedFiles} id={id1}/>);

		expect(wrapper.find('p')).toHaveLength(1);
		expect(wrapper.find('div')).toHaveLength(1);
		expect(wrapper.find('p').text()).toEqual("Uploaded: file1.txt")
	});
});