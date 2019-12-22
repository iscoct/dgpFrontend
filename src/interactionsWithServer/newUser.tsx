export default function newUser({ nombre, apellido1, apellido2, DNI, fecha_nacimiento,
        localidad, email, telefono, aspiraciones, observaciones, password, rol, id, imagen, gustos }: any): Promise<void> {
    const url = `${process.env.SERVER_URL}api/usuario/nuevo`;
    const uniqueImage = imagen.current.files[0];
    const formData = new FormData();

    formData.append('nombre', nombre);
    formData.append('apellido1', apellido1);
    formData.append('apellido2', apellido2);
    formData.append('DNI', DNI);
    formData.append('fecha_nacimiento', fecha_nacimiento);
    formData.append('localidad', localidad);
    formData.append('email', email);
    formData.append('telefono', telefono);
    formData.append('aspiraciones', aspiraciones);
    formData.append('observaciones', observaciones);
    formData.append('password', password);
    formData.append('rol', rol);
    formData.append('id', id);
    formData.append('gustos', gustos);

    if (uniqueImage) {
        formData.append('imagen', uniqueImage, uniqueImage.name);
        formData.append('imagen', uniqueImage.name);    
    }

    return fetch(url, {
        method: 'POST',
        body: formData,
        credentials: 'include'
    }).then((res) => res.json());
}