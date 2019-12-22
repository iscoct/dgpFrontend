export default function getFinishedActivities() {
    const url = `${process.env.SERVER_URL}api/actividades/terminadas`;

    return fetch(url, {
        method: 'GET',
        credentials: 'include'
    }).then((res) => res.json());
}