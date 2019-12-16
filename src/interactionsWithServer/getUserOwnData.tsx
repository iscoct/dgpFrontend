export default function getUserOwnData(): Promise<void> {
    const url = `${process.env.SERVER_URL}api/usuario`;

	return fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'include'
	}).then((res) => res.json());
}