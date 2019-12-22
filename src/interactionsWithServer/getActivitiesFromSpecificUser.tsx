export default function getActivitiesFromSpecificUser(id: number) {
    const url = `${process.env.SERVER_URL}api/actividades/usuario/${id}`;

    return fetch(url, {
        method: 'GET',
        credentials: 'include'
    }).then((res) => res.json());
}