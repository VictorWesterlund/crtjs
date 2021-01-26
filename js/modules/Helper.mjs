export async function fetchJSON(url) {
	const response = await fetch(url);
	return response.json();
}
