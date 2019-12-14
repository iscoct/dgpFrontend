//SUPONGO QUE EN URL HAY UNA VARIABLE COMO http://192.168.1.43/api/
// Respuesta 200 description : OK -----> todo correcto
// Respuesta 400 descrption : ... ---> si algo va mal
fetch(url+'actividades/apuntarse/'+id_actividad, {
    method: 'PUT',
    credentials: 'include',
}).then(() => onClickBack()).catch(() =>
    console.log('Ha habido algún error creando la actividad')
);

export default function SignUpActivity({ id_actividad }: any): Promise<void> {
    return new Promise((resolver) => {
        resolver();
    });
}