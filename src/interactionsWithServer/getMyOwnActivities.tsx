export default function getMyOwnActivities() {
    const url = `${process.env.SERVER_URL}api/actividades`;

    return fetch(url, {
        method: 'GET',
        credentials: 'include'
    }).then((res) => res.json());
}