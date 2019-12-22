export default function login(credentials: any): Promise<void> {
	const url = `${process.env.SERVER_URL}api/usuario`;

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials),
        credentials: 'include'
    }).then((res) => res.json());
}
