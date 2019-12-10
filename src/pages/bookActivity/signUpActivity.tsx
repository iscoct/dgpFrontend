import React from 'react';
import { Grid } from '@material-ui/core';
import { Button } from '../../components';

export default function signingIntoActivity(onClickBook: any): JSX.Element {
    return (
        <Grid item className='book__activity--section'>
            <Button
                onClick={onClickBook}
                className='book__activity'
            >
                Apuntarse
            </Button>
        </Grid>
    );
}