export default function getChat(id_actividad: any) {
    const url = `${process.env.SERVER_URL}api/actividades/chat/${id_actividad}`;

    return fetch(url, {
        method: 'GET',
        credentials: 'include'
    }).then((res) => res.json());
}