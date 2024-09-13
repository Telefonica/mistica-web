import * as React from 'react';
import {
    Accordion,
    AccordionItem,
    Avatar,
    Box,
    BoxedAccordion,
    BoxedAccordionItem,
    Circle,
    IconThumbUpFilled,
    IconMobileDeviceRegular,
    Image,
    Placeholder,
    ResponsiveLayout,
    skinVars,
} from '..';
import usingVrImg from './images/using-vr.jpg';
import laptopImg from './images/laptop.jpg';
import avatarImg from './images/avatar.jpg';
import touchImg from './images/touch.jpg';
import personPortraitImg from './images/person-portrait.jpg';

export default {
    title: 'Components/Accordions',
    parameters: {fullScreen: true},
};

type Args = {title: string; subtitle: string; singleOpen: boolean; inverse: boolean};

const Template: StoryComponent<Args & {type?: 'boxed'}> = ({title, subtitle, singleOpen, inverse, type}) => {
    const content = <Placeholder height={100} />;

    const AccordionComponent = type === 'boxed' ? BoxedAccordion : Accordion;
    const ItemComponent = type === 'boxed' ? BoxedAccordionItem : AccordionItem;

    return (
        <ResponsiveLayout fullWidth isInverse={inverse}>
            <Box padding={16}>
                <AccordionComponent singleOpen={singleOpen} dataAttributes={{testid: 'accordion'}}>
                    <ItemComponent
                        title={title}
                        subtitle={subtitle}
                        content={content}
                        {...(type === 'boxed' && {isInverse: inverse})}
                        dataAttributes={{testid: 'accordion-item-1'}}
                    />
                    <ItemComponent
                        title={title}
                        subtitle={subtitle}
                        content={content}
                        asset={<IconThumbUpFilled size={24} />}
                        {...(type === 'boxed' && {isInverse: inverse})}
                        dataAttributes={{testid: 'accordion-item-2'}}
                    />
                    <ItemComponent
                        title={title}
                        subtitle={subtitle}
                        content={content}
                        asset={
                            <Circle backgroundColor={skinVars.colors.brandLow} size={40}>
                                <IconMobileDeviceRegular color={skinVars.colors.brand} />
                            </Circle>
                        }
                        {...(type === 'boxed' && {isInverse: inverse})}
                        dataAttributes={{testid: 'accordion-item-3'}}
                    />

                    <ItemComponent
                        title={title}
                        subtitle={subtitle}
                        content={content}
                        asset={<Circle size={40} backgroundImage={laptopImg} />}
                        {...(type === 'boxed' && {isInverse: inverse})}
                        dataAttributes={{testid: 'accordion-item-4'}}
                    />

                    <ItemComponent
                        title={title}
                        subtitle={subtitle}
                        content={content}
                        asset={<Image src={usingVrImg} height={80} aspectRatio="16:9" />}
                        {...(type === 'boxed' && {isInverse: inverse})}
                        dataAttributes={{testid: 'accordion-item-5'}}
                    />

                    <ItemComponent
                        title={title}
                        subtitle={subtitle}
                        content={content}
                        asset={<Image src={personPortraitImg} width={80} aspectRatio="7:10" />}
                        {...(type === 'boxed' && {isInverse: inverse})}
                        dataAttributes={{testid: 'accordion-item-6'}}
                    />

                    <ItemComponent
                        title={title}
                        subtitle={subtitle}
                        content={content}
                        asset={<Image src={touchImg} width={80} aspectRatio="1:1" />}
                        {...(type === 'boxed' && {isInverse: inverse})}
                        dataAttributes={{testid: 'accordion-item-7'}}
                    />

                    <ItemComponent
                        title={title}
                        subtitle={subtitle}
                        content={content}
                        asset={<Avatar size={40} src={avatarImg} />}
                        {...(type === 'boxed' && {isInverse: inverse})}
                        dataAttributes={{testid: 'accordion-item-8'}}
                    />

                    <ItemComponent
                        title={title}
                        subtitle={subtitle}
                        content={content}
                        asset={<Avatar size={40} initials="MS" />}
                        {...(type === 'boxed' && {isInverse: inverse})}
                        dataAttributes={{testid: 'accordion-item-9'}}
                    />
                </AccordionComponent>
            </Box>
        </ResponsiveLayout>
    );
};

const defaultArgs = {
    title: 'Title',
    subtitle: 'Subtitle',
    singleOpen: false,
    inverse: false,
};

export const AccordionStory: StoryComponent<Args> = (args) => <Template {...args} />;
AccordionStory.storyName = 'Accordion';
AccordionStory.args = defaultArgs;

export const BoxedAccordionStory: StoryComponent<Args> = (args) => <Template type="boxed" {...args} />;
BoxedAccordionStory.storyName = 'BoxedAccordion';
BoxedAccordionStory.args = defaultArgs;
