export default function getUserOwnData(): Promise<void> {
    const url = `${process.env.SERVER_URL}api/usuario/`;

	return fetch(url, {
		method: 'GET',
		credentials: 'include'
	}).then((res) => res.json());
}