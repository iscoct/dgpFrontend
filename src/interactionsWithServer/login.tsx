import { Md5 } from 'ts-md5/dist/md5';

export default function login(credentials: any): Promise<void> {
    const url = `${process.env.SERVER_URL}api/usuario`;
    const { email } = credentials;
    let { password } = credentials;

    password = Md5.hashStr(password);

    console.log(`Password: ${password}`);

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password,
            email
        }),
        credentials: 'include'
    }).then((res) => res.json());
}
