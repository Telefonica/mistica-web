// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=26711-3771
// source=src/menu.tsx
// component=Menu
import figma from 'figma';

// Menu is driven by the `renderTarget`/`renderMenu` render props in code; the Figma
// item toggles have no direct prop mapping, so a representative example is emitted.

export default {
    example: figma.code`
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
    `,
    imports: ['import {Menu, MenuItem} from "@telefonica/mistica";'],
    id: 'menu-mobile',
    metadata: {nestable: false},
};
