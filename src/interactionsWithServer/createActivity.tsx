import _ from 'lodash';

export default function createActivity({ nombre, descripcion, tipo, localizacion, fecha, imagen, etiquetas }: any): Promise<void> {
    const url = `${process.env.SERVER_URL}api/actividades`;
    const file = imagen.current.files[0];
    const formData = new FormData();
    const notEmptyLabels: any = _.remove(Array.from(etiquetas), (label) => {
        return Boolean(label);
    });

    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('imagen', file, file.name);
    formData.append('tipo', tipo);
    formData.append('localizacion', localizacion);
    formData.append('fecha', fecha);
    formData.append('etiquetas', notEmptyLabels);

    return fetch(url, {
        method: 'POST',
        body: formData,
        credentials: 'include'
    }).then((res) => res.json());
}