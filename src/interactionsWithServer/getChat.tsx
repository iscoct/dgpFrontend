//SUPONGO QUE EN URL HAY UNA VARIABLE COMO http://192.168.1.43/api/
// Respuesta 200 chat
// Respuesta 400 descrption : ... ---> si algo va mal
// El chat tiene el formato:
/*
{
    "chat": [
        {
            "id_mensaje": 2,
            "id_actividad": 51,
            "id_participante": 3,
            "nombre": "voluntario",
            "apellido1": "voluntarioApellido1",
            "apellido2": "voluntarioApellido2",
            "fecha": "2019-11-29 17:26:54",
            "tipo": "texto",
            "contenido": "mensaje del socio"
        },
        {
            "id_mensaje": 7,
            "id_actividad": 51,
            "id_participante": 1,
            "nombre": "socio",
            "apellido1": "socioapellido1",
            "apellido2": "socioapellido2",
            "fecha": "2019-12-04 15:14:54",
            "tipo": "texto",
            "contenido": "Mensaje chat desde Android"
        }
    ]
}
*/
fetch(url+'actividades/chat/'+id_actividad, {
    method: 'GET',
    credentials: 'include',
}).then(() => onClickBack()).catch(() =>
    console.log('Ha habido algún error creando la actividad')
);

export default function GetActivities({ id_actividad }: any): Promise<void> {
    return new Promise((resolver) => {
        resolver();
    });
}
