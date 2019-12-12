import React from 'react';
import { TextField } from '@material-ui/core';

import './textField.scss';

export default function({ label, value, setter, type = "text" }: any) {
    return (
        <TextField
            type={type}
            label={label}
            variant="outlined"
            onChange={(event: any) => setter(event.target.value)}
            value={value}
            className="text--input"
        />
    );
}