export default function login({ email, password }: any): Promise<void> {
    const url = `${process.env.SERVER_URL}api/login`;

	return fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password }),
		credentials: 'include'
	}).then((res) => res.json());
}
