import React, { PureComponent } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import { Person, Lock, Send } from '@material-ui/icons';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

type State = {
    toggle: Boolean;
};

type Prop = {};

export default class App extends PureComponent<Prop, State> {
    render(): JSX.Element {
        return(
            <React.Fragment>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid spacing={1} alignItems="flex-end" container item>
                        <Grid item>
                            <Person />
                        </Grid>
                        <Grid item>
                            <TextField label="Usuario" />
                        </Grid>    
                    </Grid>
                    <Grid spacing={1} alignItems="flex-end" container item>
                        <Grid item>
                            <Lock />
                        </Grid>
                        <Grid item>
                            <TextField label="Password" />
                        </Grid>
                    </Grid>
                    <Grid container item>
                        <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            startIcon={<Send />}
                        >
                            Enviar
                        </Button>
                    </Grid>
                </Grid>

                <hr/>

                <Grid container>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="contained" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Grid>
            </React.Fragment>
        );
    }
}