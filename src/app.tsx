import React, { PureComponent } from 'react';
import { Button } from '@material-ui/core';

type State = {
    toggle: Boolean;
};

type Prop = {};

export default class App extends PureComponent<Prop, State> {
    constructor(props: Prop) {
        super(props);

        this.state = {
            toggle: false
        };

        this.toggle = this.toggle.bind(this);
    }

    render(): JSX.Element {
        const { toggle } = this.state;
        let toRender;

        if (toggle) {
            toRender = <Button onClick={this.toggle} variant="contained" color="primary">
                Hello World
            </Button>
        } else {
            toRender = <Button onClick={this.toggle} variant="contained" color="secondary">
                Another Hello World
            </Button>
        }
        return (
            <React.Fragment>
                {toRender}     
            </React.Fragment>
        );
    }

    toggle(event: any): void {
        this.setState({
            toggle: ! this.state.toggle
        });
    }
}