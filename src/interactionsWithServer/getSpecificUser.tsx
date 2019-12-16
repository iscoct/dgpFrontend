export default function getSpecificUser({ id }: any): Promise<void> {
    const url = `${process.env.SERVER_URL}api/usuario/${id}`;

    return fetch(url, {
        method: 'GET',
        credentials: 'include'
    }).then((res) => res.json());
}