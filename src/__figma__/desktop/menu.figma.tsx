import React from 'react';
import {Menu, MenuItem} from '../../menu';
import figma from '@figma/code-connect';

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
