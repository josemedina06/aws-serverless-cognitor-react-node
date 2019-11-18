import React from 'react';
import { Alignment, Navbar, NavbarGroup, NavbarHeading} from '@blueprintjs/core';

export default function nav() {
    return (
        <Navbar className = 'nav_bar'>
            <NavbarGroup align = { Alignment.LEFT }>
                <NavbarHeading>Welcome Back! It's a Beautiful Day Aayushi</NavbarHeading>
            </NavbarGroup>
        </Navbar>
    )
}

