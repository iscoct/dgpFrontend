//SUPONGO QUE EN URL HAY UNA VARIABLE COMO http://192.168.1.43/api/
// Respuesta 200 actividades 
// Respuesta 400 descrption : ... ---> si algo va mal
/*
Las actividades tienen el siguiente formato: (casi todo nulo, valoracion nula indica que aun no se ha valorado)
Realmente de cada usuario solo devuelde id, rol, nombre, apellido1, apellido2
Los mensajes de chat nunca los devuelve porque los consideramos privados
"actividades": [
    {
        "id_actividad": 50,
        "nombre": "actividad grupal",
        "fecha": null,
        "localizacion": null,
        "descripcion": "esto es una actividad grupal",
        "cerrada": 0,
        "imagen": null,
        "id_creador": 3,
        "etiquetas": [
            "Cine"
        ],
        "participantes": [
            {
                "id": 1,
                "rol": "socio",
                "nombre": "socio",
                "apellido1": "socioapellido1",
                "apellido2": "socioapellido2",
                "DNI": null,
                "fecha_nacimiento": null,
                "localidad": null,
                "email": null,
                "password": null,
                "telefono": null,
                "aspiraciones": null,
                "observaciones": null,
                "imagen": null,
                "gustos": []
            },
            {
                "id": 3,
                "rol": "voluntario",
                "nombre": "voluntario",
                "apellido1": "voluntarioApellido1",
                "apellido2": "voluntarioApellido2",
                "DNI": null,
                "fecha_nacimiento": null,
                "localidad": null,
                "email": null,
                "password": null,
                "telefono": null,
                "aspiraciones": null,
                "observaciones": null,
                "imagen": null,
                "gustos": []
            }
        ],
        "mensajes_chat": [],
        "valoraciones": [
            {
                "id_participante": 1,
                "puntuacion": null,
                "texto_valoracion": null
            },
            {
                "id_participante": 3,
                "puntuacion": null,
                "texto_valoracion": null
            }
        ],
        "tipo": "grupal"
    },
*/

fetch(url+'actividades/usuario/'+id_usuario, {
    method: 'GET',
    credentials: 'include',
}).then(() => onClickBack()).catch(() =>
    console.log('Ha habido algún error creando la actividad')
);

export default function GetActivitiesByUserId({ id_usuario }: any): Promise<void> {
    return new Promise((resolver) => {
        resolver();
    });
}