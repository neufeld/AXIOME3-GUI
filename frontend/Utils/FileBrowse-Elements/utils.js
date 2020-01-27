export const simulateFile = (path, name) => {
	return {
		type: "file",
		name: name,
		path: path
	}
}

export const simulateDir = (path, name, isRoot=false, isParent=false) => {
	return {
		isParent: isParent,
		isRoot: isRoot,
		type: "dir",
		name: name,
		path: path
	}
}