import * as React from 'react';
import {skinVars} from '..';
import {ThemeVariant} from '../theme-variant-context';
import StackingGroup from '../stacking-group';
import Image from '../image';
import img from './images/avatar.jpg';

export default {
    title: 'Components/StackingGroup',
    parameters: {
        fullScreen: true,
    },
};

type Args = {
    stacked?: boolean;
    type: 'circle' | 'square';
    size: number;
    maxItems?: number;
    children?: React.ReactNode;
    itemsToInclude: number;
    inverse: boolean;
};

export const Default: StoryComponent<Args> = ({
    stacked,
    size,
    type,
    maxItems,
    itemsToInclude,
    inverse = false,
}) => {
    return (
        <ThemeVariant isInverse={inverse}>
            <div
                style={{
                    padding: 16,
                    width: 'fit-content',
                    background: inverse ? skinVars.colors.backgroundBrand : skinVars.colors.background,
                    lineHeight: 0,
                }}
                data-testid="stacking-group"
            >
                <StackingGroup stacked={stacked} maxItems={maxItems} moreItemsStyle={{type, size}}>
                    {Array.from({length: itemsToInclude}, () => (
                        <Image height={size} src={img} aspectRatio="1:1" border />
                    ))}
                </StackingGroup>
            </div>
        </ThemeVariant>
    );
};

Default.storyName = 'Stacking Group';
Default.argTypes = {
    size: {
        control: {type: 'range', min: 24, max: 128, step: 4},
    },
    type: {
        options: ['circle', 'square'],
        control: {type: 'select'},
    },
    itemsToInclude: {
        control: {type: 'range', min: 1, max: 8, step: 1},
    },
};

Default.args = {
    itemsToInclude: 5,
    type: 'circle',
    size: 64,
    maxItems: 4,
    stacked: false,
    inverse: false,
};
