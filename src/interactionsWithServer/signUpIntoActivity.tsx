export default function signUpIntoActivity(id: number) {
    const url = `${process.env.SERVER_URL}api/actividades/apuntarse/${id}`;

    return fetch(url, {
        method: 'PUT',
        credentials: 'include'
    }).then((res) => res.json());
}