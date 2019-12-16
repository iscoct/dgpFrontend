import RolUsuario from './rolUsuario';

type User = {
    id: number;
    rol: RolUsuario;
    nombre: string;
    apellido1: string;
    apellido2: string;
    DNI: string;
    fecha_nacimiento: string;
    localidad: string;
    email: string;
    password: string;
    telefono: number;
    aspiraciones: string;
    observaciones: string;
    imagen: string;
    gustos: Array<string>;
};

export default User;