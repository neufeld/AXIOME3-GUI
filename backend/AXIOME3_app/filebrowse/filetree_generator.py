import os
# Platform independent path package
import ntpath

def getFileTree(path):
	"""
	Returns a lits of dictionary with following keys
		1. "isRoot" ("Root" as in the current directory scope)
		2. "type" (either file or dir)
		3. "path" (absolute path of a file)
		4. "name" (file name without path)
		4. "isParent" (for identifying parent directory)
	"""
	files = [];
	# If the given path is file, return
	if(os.path.isfile(path)):
		print("It's a file!")
		return

	# If directory
	if(os.path.isdir(path)):
		current_dir = os.path.abspath(path)

		# Current directory
		tmp_file_obj = {}
		tmp_file_obj["path"] = current_dir
		tmp_file_obj["type"] = "dir"
		tmp_file_obj["name"] = ntpath.basename(current_dir)
		tmp_file_obj["isRoot"] = True

		# Add obj
		files.append(tmp_file_obj)

		# Parent directory
		parent_dir = os.path.dirname(current_dir)
		tmp_file_obj = {}
		tmp_file_obj["path"] = parent_dir
		tmp_file_obj["type"] = "dir"
		tmp_file_obj["name"] = ntpath.basename(parent_dir)
		tmp_file_obj["isParent"] = True

		# Add obj
		files.append(tmp_file_obj)

		# Iterate through items in the specified directory
		for f in os.listdir(path):
			abs_path = os.path.abspath(os.path.join(current_dir, f))

			tmp_file_obj = {}
			tmp_file_obj["path"] = abs_path
			tmp_file_obj["type"] = "dir" if os.path.isdir(abs_path) else "file"
			tmp_file_obj["name"] = ntpath.basename(abs_path)
			tmp_file_obj["misc"] = "from_server"

			# Add obj
			files.append(tmp_file_obj)

		return files

def sortFileTree(files):
	"""
	Sort the file tree as returned by getFileTree, by
	1. Directory, then Files
	2. Alphabetical

	Input:
		List of dictionaries
		[
			{
				path: file's absoluate path
				type: dir/file
				isRoot: boolean; is "root" directory
				isParent: boolean; is parent directory	
			}
		]

	Output:
		Sorted nested dictionary
	"""
	sortedList = sorted(files, key=lambda x: (x['type'], x['path']))

	return sortedList