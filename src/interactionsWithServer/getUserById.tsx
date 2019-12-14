//SUPONGO QUE EN URL HAY UNA VARIABLE COMO http://192.168.1.43/api/
// Respuesta 200 usuario
// Respuesta 400 descrption : ... ---> si algo va mal
//Usuario tiene el siguiente formato:
/*
{
    "usuario": {
        "id": 1,
        "rol": "socio",
        "nombre": "socio",
        "apellido1": "socioapellido1",
        "apellido2": "socioapellido2",
        "DNI": "77348546H",
        "fecha_nacimiento": "2019-10-10",
        "localidad": "granada",
        "email": "socio@socio.com",
        "password": "1234",
        "telefono": 123412345,
        "aspiraciones": "asdfasdf",
        "observaciones": "asdfasdfadsf",
        "imagen": "whoisthis.png",
        "gustos": [
            "Cine"
        ]
    }
}
*/
fetch(url+'usuario/'+id_usuario, {
    method: 'GET',
    credentials: 'include',
}).then(() => onClickBack()).catch(() =>
    console.log('Ha habido algún error creando la actividad')
);

export default function GetUserById({ id_usuario }: any): Promise<void> {
    return new Promise((resolver) => {
        resolver();
    });
}