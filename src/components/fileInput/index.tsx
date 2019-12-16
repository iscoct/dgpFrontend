import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { AddAPhoto } from '@material-ui/icons';

import './fileInput.scss';

export default function FileInput(props: any): JSX.Element {
    const [fileName, setFileName] = useState<string>('');
    const { id, fileInput } = props;

    function onFileChange(event: any) {
        const files = event.target.files;
        let newFilesName = '';

        for (let i = 0; i < files.length; ++i) {
            newFilesName += files[i].name;
        }

        setFileName(newFilesName);
    }

    return (
        <Container>
            <Row className="add-photo--section">
                <label className="add-photo--label" htmlFor={id}>
                    <AddAPhoto className="add-photo--icon" />                    
                </label>
                <input
                    ref={fileInput}
                    id={id}
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    className="add-photo--input"
                    onChange={onFileChange}
                />
            </Row>
            <Row className="filesname--section">
                {fileName}
            </Row>
        </Container>
    );
}