import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { Form } from 'react-bootstrap';
import { TextField, Button } from '../../components';

export default function ProposeDate({ onClickBook }: any): JSX.Element {
    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [location, setLocation] = useState<string>('');

    return (
        <Grid className='book__activity--section' container justify='center'>
            <Form>
                <TextField
                    type="date"
                    label="Fecha"
                    setter={setDate}
                />
                <TextField
                    type="time"
                    label="Hora"
                    setter={setTime}
                />
                <TextField
                    label="Localización"
                    value={location}
                    setter={setLocation}
                />
                <Grid xs={12} justify='center' container item>
                    <Button 
                        onClick={() => onClickBook(
                            {
                                date, time, location
                            }
                        )}
                        className='book__activity'
                    >
                        Proponer
                    </Button>
                </Grid>
            </Form>
        </Grid>
    );
}