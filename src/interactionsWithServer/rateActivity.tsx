//SUPONGO QUE EN URL HAY UNA VARIABLE COMO http://192.168.1.43/api/
// Respuesta 200 description : OK -----> todo correcto
// Respuesta 400 descrption : ... ---> si algo va mal
fetch(url+'actividades/valorar/'+id_actividad, {
    method: 'PUT',
    body: JSON.stringify({puntuacio: puntuacion, texto_valoracion: texto_valoracion}),
    credentials: 'include',
    headers:{
        'Content-Type': 'application/json'
    }
}).then(() => onClickBack()).catch(() =>
    console.log('Ha habido algún error creando la actividad')
);

export default function RateActivity({ id_actividad,puntuacion, texto_valoracion }: any): Promise<void> {
    return new Promise((resolver) => {
        resolver();
    });
}