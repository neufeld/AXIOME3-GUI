// Open URL in a new tab
export const openInNewTab = (URL) => {
	const win = window.open(URL, '_blank');
	if(win != null) {
		win.focus();
	}
}

// Convert buffer array to base-64
export const convertArrayBufferToBase64 = (arrayBuffer) => {
	const base64 = btoa(
		new Uint8Array(arrayBuffer).reduce( 
			(data, byte) => data + String.fromCharCode(byte), '' 
		)
	)

	return base64
}
