import React from 'react';
import {Menu, MenuItem} from '../menu';
import figma from '@figma/code-connect';

// Desktop
figma.connect(
    Menu,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=12719%3A342',
    {
        props: {},
        example: () => (
            <Menu
                renderTarget={({ref, onPress, isMenuOpen}) => (
                    <button ref={ref} onClick={onPress}>
                        Menu
                    </button>
                )}
                renderMenu={({ref, className}) => (
                    <div ref={ref} className={className}>
                        <MenuItem label="Option 1" onPress={() => {}} />
                        <MenuItem label="Option 2" onPress={() => {}} />
                    </div>
                )}
            />
        ),
    }
);

// Mobile
figma.connect(
    Menu,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=26711%3A3771',
    {
        props: {},
        example: () => (
            <Menu
                renderTarget={({ref, onPress, isMenuOpen}) => (
                    <button ref={ref} onClick={onPress}>
                        Menu
                    </button>
                )}
                renderMenu={({ref, className}) => (
                    <div ref={ref} className={className}>
                        <MenuItem label="Option 1" onPress={() => {}} />
                        <MenuItem label="Option 2" onPress={() => {}} />
                    </div>
                )}
            />
        ),
    }
);
