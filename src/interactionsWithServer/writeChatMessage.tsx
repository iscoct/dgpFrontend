//SUPONGO QUE EN URL HAY UNA VARIABLE COMO http://192.168.1.43/api/
// Respuesta 200 OK
// Respuesta 400 descrption : ... ---> si algo va mal

fetch(url+'actividades/chat/'+id_actividad, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({contenido: contenido }),
    headers:{
        'Content-Type': 'application/json'
    }
}).then(() => onClickBack()).catch(() =>
    console.log('Ha habido algún error creando la actividad')
);

export default function Login({ id_actividad, contenido }: any): Promise<void> {
    return new Promise((resolver) => {
        return fetch ()
    });
}