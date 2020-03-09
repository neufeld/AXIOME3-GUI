import React from 'react';
import { shallow } from 'enzyme';

import { UploadElementsMain } from '../../../src/Components/Upload-Elements/UploadElementsMain'

const uploadField = [
	{id: 0, name: "test1", label: "test file1"},
	{id: 1, name: "test2", label: "test file2"}
];

describe('UploadElementsMain renders', () => {
	it('Should render one div and one form if empty list passed as props', () => {
		const wrapper = shallow(<UploadElementsMain uploadField={[]}/>);

		expect(wrapper.find('div')).toHaveLength(1);
	});

	it('Should render correctly when valid props passed', () => {
		const wrapper = shallow(<UploadElementsMain uploadField={uploadField}/>);

		expect(wrapper.find('.upload-outer')).toHaveLength(2);
		expect(wrapper.find('.upload-inner-left')).toHaveLength(2);
		expect(wrapper.find('.upload-inner-right')).toHaveLength(2);
		expect(wrapper.find('div')).toHaveLength(7);
	})

});