// Respuesta 200 description : OK -----> todo correcto
// Respuesta 400 descrption : ... ---> si algo va mal

function createUser() {
    if (fileInput && fileInput.current && fileInput.current.files) {
        const url = 'http://localhost:8000/api/usuario/nuevo';
        const file = fileInput.current.files[0];
        const formData = new FormData();
        
        formData.append('nombre', eventName);
        formData.append('apellido1', apellido1);
        formData.append('apellido2', apellido2);
        formData.append('DNI', dni);
        formData.append('fecha_nacimiento', fecha_nacimiento);
        formData.append('localidad', localidad);
        formData.append('email', email);
        formData.append('telefono', email);
        formData.append('aspiraciones', aspiraciones);
        formData.append('observaciones', observaciones);
        formData.append('password', password);
        formData.append('imagen', file, file.name);

        fetch(url, {
            method: 'POST',
            body: formData,
            credentials: 'include'
        }).then(() => onClickBack()).catch(() =>
            console.log('Ha habido algún error creando la actividad')
        );
    }
}

export default function CreateActivity({ /* No tengo muy claro que va */}: any): Promise<void> {
    return new Promise((resolver) => {
        resolver();
    });
}