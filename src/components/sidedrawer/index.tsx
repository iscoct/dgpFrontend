import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { NavigateNext } from '@material-ui/icons';

export default function({ opened, toggle, acciones }: any): JSX.Element {
    const list: JSX.Element = acciones ? (
        <List>
            {acciones.map((action: any) => (
                <ListItem onClick={action.onClick} key={action.text}>
                    <ListItemIcon><NavigateNext /></ListItemIcon>
                    <ListItemText primary={action.text} />
                </ListItem>
            ))}
        </List>
    ) : <React.Fragment></React.Fragment>;

    return (
        <Drawer open={opened} anchor='left' onClose={toggle}>
            {list}
        </Drawer>
    );
}