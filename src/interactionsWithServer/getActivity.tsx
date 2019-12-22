export default function getActivity(id: number) {
    const url = `${process.env.SERVER_URL}api/actividades/${id}`;

    return fetch(url, {
        method: 'GET',
        credentials: 'include'
    }).then((res) => res.json());
}