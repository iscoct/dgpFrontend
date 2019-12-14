//SUPONGO QUE EN URL HAY UNA VARIABLE COMO http://192.168.1.43/api/
// Respuesta 200 actividades 
// Respuesta 400 descrption : ... ---> si algo va mal

fetch(url+'actividades/'+id_actividad, {
    method: 'GET',
    credentials: 'include',
}).then(() => onClickBack()).catch(() =>
    console.log('Ha habido algún error creando la actividad')
);

export default function GetActivityById({ id_actividad }: any): Promise<void> {
    return new Promise((resolver) => {
        resolver();
    });
}