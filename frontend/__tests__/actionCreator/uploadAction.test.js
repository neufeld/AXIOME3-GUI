import { updateSelectedFiles } from '../../src/redux/actions/actionHelper'

describe("Upload Actions", () => {
	describe("Testing selectFile", () => {
		it("Should return empty array if empty file object", () => {
			const id = 0;
			const file = {};
			const prevSelectedFiles = [];

			const expected = [];
			const observed = updateSelectedFiles(id, file, prevSelectedFiles);

			expect(observed).toEqual(expected);
		});

		it("Should return empty array if file is undefined", () => {
			const id = 0;
			let file;
			const prevSelectedFiles = [];

			const expected = [];
			const observed = updateSelectedFiles(id, file, prevSelectedFiles);

			expect(observed).toEqual(expected);
		});

		it("Should return one item if adding to empty array", () => {
			const id = 0;
			const file = {name: "file1.txt", size: 100};
			const prevSelectedFiles = [];

			const expected = [{
				selectedFile: file,
				id: 0
			}];
			const observed = updateSelectedFiles(id, file, prevSelectedFiles);

			expect(observed).toEqual(expected);
		});

		it("Should update existing item if same id", () => {
			const id = 0;
			const prevFile = {name: "file1.txt", size: 100};
			const expectedFile = {name: "file2.txt", size: 100};

			const prevSelectedFiles = [{
				selectedFile: prevFile,
				id: 0
			}];

			const expected = [{
				selectedFile: expectedFile,
				id: 0
			}];
			const observed = updateSelectedFiles(id, expectedFile, prevSelectedFiles);

			expect(observed).toEqual(expected);
		});

		it("Should add an item if different id", () => {
			const id1 = 0
			const id2 = 1;
			const file1 = {name: "file1.txt", size: 100};
			const file2 = {name: "file2.txt", size: 100};

			const prevSelectedFiles = [{
				selectedFile: file1,
				id: id1
			}];

			const expected = [
				{
					selectedFile: file1,
					id: id1}, 
				{
					selectedFile: file2,
					id: id2}
			];
			const observed = updateSelectedFiles(id2, file2, prevSelectedFiles);

			expect(observed).toEqual(expected);
		});
	});

});