export const openInNewTab = (URL) => {
	const win = window.open(URL, '_blank');
	if(win != null) {
		win.focus();
	}
}