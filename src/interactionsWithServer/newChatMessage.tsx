export default function newChatMessage({ id_actividad, contenido }: any) {
    const url = `${process.env.SERVER_URL}api/actividades/chat/${id_actividad}`;

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ contenido }),
        credentials: 'include'
    }).then((res) => res.json());
}