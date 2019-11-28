import React from 'react';
import { Drawer } from '@material-ui/core';
import { Nav } from 'react-bootstrap';
import './sidedrawer.scss';

export default function({ opened, toggle, acciones }: any): JSX.Element {
    const list: JSX.Element = acciones ? (
        <Nav className='flex-column'>
            {acciones.map((action: any, index: number) => (
                <Nav.Link eventKey={index} onClick={action.onClick}>{action.text}</Nav.Link>
            ))}
        </Nav>
    ) : <React.Fragment></React.Fragment>;

    return (
        <Drawer open={opened} anchor='left' onClose={toggle}>
            {list}
        </Drawer>
    );
}
