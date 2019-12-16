export default function newUser(user: any): Promise<void> {
    const url = `${process.env.SERVER_URL}api/usuario/nuevo`;

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
        credentials: 'include'
    }).then((res) => res.json());
}