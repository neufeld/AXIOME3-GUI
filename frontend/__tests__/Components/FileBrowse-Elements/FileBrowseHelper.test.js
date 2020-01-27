import {
	selectFileById, 
	getSelectedFileName,
	getFileDisplayName
} 
from '../../../src/Components/FileBrowse-Elements/FileBrowseHelper';
import { simulateDir, simulateFile } from '../../../Utils/FileBrowse-Elements/utils'

const generateFiles = () => {
	const file1 = simulateFile('file1', 'file1');
	const file2 = simulateFile('file2', 'file2');
	const file3 = simulateFile('file3', 'file3');

	const files = [
		{
			selectedFile: file1,
			id: 0
		},
		{
			selectedFile: file2,
			id: 1
		},
		{
			selectedFile: file3,
			id: 2
		},
	];

	return files
};

describe('Testing selectFileById', () => {	

	it('Should return empty array if no matching ID', () => {
		const id = -1;
		const files = generateFiles();
		const filtered = selectFileById(id, files);

		expect(filtered).toHaveLength(0);
	});

	it('Should return array with one item if matching ID', () => {
		const id = 1;
		const files = generateFiles();
		const filtered = selectFileById(id, files);

		expect(filtered).toHaveLength(1);
		expect(filtered[0].id).toEqual(id);
	});
});

describe('Testing getSelectedFileName', () => {
	const selectedFile = 	simulateFile('file1', 'file1');
	const files = [{
		selectedFile: selectedFile,
		id: 0
	}];

	it('Should return empty string if empty array', () => {
		const id = -1;
		const name = getSelectedFileName([]);

		expect(name).toEqual('');
	});

	it('Should return file name if a valid item in an array', () => {
		const id = -1;
		const name = getSelectedFileName(files);
		const expectedName = 'file1';

		expect(name).toEqual(expectedName);
	});
});

describe('Testing getFileDisplayName', () => {
	const dir = simulateDir("/dir1", "dir1")
	const rootDir = simulateDir("/root", "root", true);
	const parentDir = simulateDir("/parent", "parent", false, true);
	const file = simulateFile("file1", "file1");

	it('Should return file name if file', () => {
		const displayName = getFileDisplayName(file);

		const expected = "file1";
		expect(displayName).toEqual(expected);
	});

	it('Should return dir name with slash if regular dir', () => {
		const displayName = getFileDisplayName(dir);

		const expected = "dir1/";
		expect(displayName).toEqual(expected);
	});

	it('Should return nothing if root dir', () => {
		const displayName = getFileDisplayName(rootDir);

		const expected = undefined;
		expect(displayName).toEqual(expected);
	});

	it('Should return ../ if parent dir', () => {
		const displayName = getFileDisplayName(parentDir);

		const expected = "../";
		expect(displayName).toEqual(expected);
	});
});