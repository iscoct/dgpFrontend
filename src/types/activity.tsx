import User from './user';

type Activity = {
    id: number;
    nombre: string;
    fecha: Date;
    localizacion: string;
    descripcion: string;
    cerrada: boolean;
    imagen: string;
    id_creador: number;
    etiquetas: string[];
    participantes: User[];
};

export default Activity;