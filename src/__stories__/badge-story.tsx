import * as React from 'react';
import {StorySection} from './helpers';
import {Badge, IconButton, skinVars, IconBellFilled, IconShoppingCartFilled, IconStarFilled} from '..';

export default {
    title: 'Components/Badge',
};

export const Default: StoryComponent = () => {
    return (
        <>
            <StorySection title="Badge (non numeric)">
                <Badge>
                    <IconButton onPress={() => {}} aria-label="Read notifications">
                        <IconBellFilled />
                    </IconButton>
                </Badge>
            </StorySection>
            <StorySection title="Badge (numeric, value 0)">
                <Badge value={0}>
                    <IconButton onPress={() => {}} aria-label="No notifications">
                        <IconBellFilled />
                    </IconButton>
                </Badge>
            </StorySection>
            <StorySection title="Badge (numeric, value 2)">
                <Badge value={2}>
                    <IconButton onPress={() => {}} aria-label="Shopping Cart with 2 items">
                        <IconShoppingCartFilled />
                    </IconButton>
                </Badge>
            </StorySection>
            <StorySection title="Badge (numeric, value 2)">
                <Badge value={2}>
                    <IconButton onPress={() => {}} aria-label="Shopping Cart with 2 items">
                        <IconShoppingCartFilled />
                    </IconButton>
                </Badge>
            </StorySection>
            <StorySection title="Badge (numeric, value 14)">
                <Badge value={14}>
                    <IconButton onPress={() => {}} aria-label="Starred 14 times">
                        <IconStarFilled />
                    </IconButton>
                </Badge>
            </StorySection>
            <StorySection title="Badge (numeric, value 3) (Over inverse)">
                <div style={{padding: 20, background: skinVars.colors.backgroundBrand}}>
                    <Badge value={3}>
                        <IconButton onPress={() => {}} aria-label="3 notifications">
                            <IconBellFilled color="#fff" />
                        </IconButton>
                    </Badge>
                </div>
            </StorySection>
        </>
    );
};

Default.storyName = 'Badge';
