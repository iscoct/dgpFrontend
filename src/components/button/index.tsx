import React from 'react';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';

import './button.scss';

export default function (props: any): JSX.Element {
    const variant: 'company' | 'secondary' = props.variant;
    const { children, endIcon, className, onClick } = props;
    const map = {
        'company': 'company--variant',
        'secondary': 'secondary--variant'
    };
    const finalClassName= classNames(map[variant], className);

    return (
        <Button
            fullWidth={true}
            size="large"
            variant="contained"
            color="primary"
            endIcon={endIcon}
            onClick={onClick}
            className={finalClassName}
        >
            {children}
        </Button>
    );
}