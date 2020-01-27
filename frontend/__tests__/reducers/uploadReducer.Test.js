import uploadReducer from '../../src/redux/reducers/uploadReducer';
import { GET_FILES, GET_UPLOAD_FIELD, SELECT_FILE } from '../../src/redux/actions/types'

describe('Upload Reducer', () => {
	describe('Checking default state', () => {
		let newState;

		beforeAll(() => {
			newState = uploadReducer(undefined, {});
		});

		it('Should return default state for uploadField', () => {
			expect(newState.uploadField).toEqual([]);
		});

		it('Should return default state for files', () => {
			expect(newState.files).toEqual([]);
		});

		it('Should return default state for selectedFiles', () => {
			expect(newState.selectedFiles).toEqual([]);
		});
	});

	describe('Checking state update', () => {
		it('Should update uploadField', () => {
			const uploadField = [
				{id: 0, name: "test 1", label: "label 1"},
				{id: 1, name: "test 2", label: "label 2"}
			];

			const action = {
				type: GET_UPLOAD_FIELD,
				payload: {
					uploadField: uploadField
				}
			};

			const newState = uploadReducer(undefined, action);

			expect(newState.uploadField).toEqual(uploadField);
		});

		it('Should update selectedFiles', () => {
			const selectedFiles = [
				{selectedFile: {}, id: 0},
				{selectedFile: {}, id: 1}
			]

			const action = {
				type: SELECT_FILE,
				payload: {
					selectedFiles: selectedFiles
				}
			};

			const newState = uploadReducer(undefined, action);

			expect(newState.selectedFiles).toEqual(selectedFiles);
		});

		// It depends on API call
		// Redo this one
		it('Should update getFiles', () => {
			const files = {}

			const action = {
				type: GET_FILES,
				payload: {
					id: 0,
					files: files
				}
			};

			const newState = uploadReducer(undefined, action);

			expect(newState.files).toEqual(files);
		});

	});

})