import React from 'react';
import Header from '../../components/header';
import { Grid, Typography } from '@material-ui/core';
import Pages from '../index';
import SignUp from './signUpActivity';

import './bookActivity.scss';

export default function({ title, description, onClickBack, onClickBook, date, time, location, phase = 'signing' }: any): JSX.Element {
	let subpage: JSX.Element = <></>;

	switch(phase) {
		case Pages.signUpIntoActivity: {
			subpage = <SignUp onClickBook={onClickBook} />;
            break;
        }
	}

    return (
        <React.Fragment>
            <Header
                title={title}
                icon='arrow_back'
                onIconClick={onClickBack}
            />
            <Grid className='book__activity--body' container justify='center'>
                <Grid container justify='center' item>
                    <Typography style={{ color: 'white' }}>
                        {description}
                    </Typography>
                </Grid>
                {subpage}
            </Grid>
        </React.Fragment>
    );
}
