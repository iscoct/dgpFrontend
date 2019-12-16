export default function removeUser(user: any): Promise<void> {
	const url = `${process.env.SERVER_URL}api/usuario/${user.id}`;

	return fetch(url, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'include'
	}).then((res) => res.json());
}