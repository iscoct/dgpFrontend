/* function createActivity() {
    if (fileInput && fileInput.current && fileInput.current.files) {
        const url = 'http://localhost:8000/api/actividades';
        const file = fileInput.current.files[0];
        const formData = new FormData();
        
        formData.append('nombre', eventName);
        formData.append('descripcion', eventDescription);
        formData.append('imagen', file, file.name);

        fetch(url, {
            method: 'POST',
            body: formData,
            credentials: 'include'
        }).then(() => onClickBack()).catch(() =>
            console.log('Ha habido algún error creando la actividad')
        );
    }
} */

export default function CreateActivity({ email, password }: any): Promise<void> {
    return new Promise((resolver) => {
        resolver();
    });
}