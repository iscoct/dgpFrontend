//SUPONGO QUE EN URL HAY UNA VARIABLE COMO http://192.168.1.43/api/
// Respuesta 200 OK
// Respuesta 400 descrption : ... ---> si algo va mal

export default function Login({ email, password }: any): Promise<void> {
    const url = `${process.env.SERVER_URL}api/usuario`;

	return fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password }),
		credentials: 'include'
	}).then((res) => res.json());
}
