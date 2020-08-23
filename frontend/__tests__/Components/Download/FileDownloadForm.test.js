import React from 'react';
import { shallow, mount } from 'enzyme';

import { FileDownloadForm } from '../../../src/Components/Download/FileDownloadForm';

const mockResetDownloadPath = jest.fn();

describe('test FileDownloadForm mount', () => {
	it('Should dispatch resetDownloadPath action once', () => {
		const downloadPath = ""
		const inputField = [{
			name: 'uid',
			value: '1234'

		}];

		// need to use mount since im testing ComponentDidMount lifecycle method
		const wrapper = mount(
			<FileDownloadForm
				downloadPath={downloadPath}
				inputField={inputField}
				resetDownloadPath={mockResetDownloadPath
			}/>
		)
		expect(mockResetDownloadPath.mock.calls.length).toEqual(1);
	});
});