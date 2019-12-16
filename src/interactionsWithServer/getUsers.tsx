export default function getUsers(): Promise<void> {
	const url = `${process.env.SERVER_URL}api/usuarios`;

    return fetch(url, {
		method: 'GET',
		credentials: 'include'
	}).then((res) => res.json());
}