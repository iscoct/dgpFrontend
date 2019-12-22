import _ from 'lodash';

export default function endActivity({ fecha, localizacion, id_actividad }: any): Promise<void> {
    const url = `${process.env.SERVER_URL}api/actividades/cerrar/${id_actividad}`;

    return fetch(url, {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({fecha: fecha, localizacion: localizacion}),
        credentials: 'include'
    }).then((res) => res.json());
}