export default function voteActivity({ rating, activity }: any): Promise<void> {
    const { id_actividad } = activity;
    const url = `${process.env.SERVER_URL}api/actividades/valorar/${id_actividad}`;

    return fetch(url, {
        method: 'PUT',
        body: JSON.stringify({ puntuacion: rating, texto_valoracion: '' }),
        credentials: 'include',
        headers:{
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json());
}