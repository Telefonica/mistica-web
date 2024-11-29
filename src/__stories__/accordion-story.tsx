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

type Args = {
    title: string;
    subtitle: string;
    detail: string;
    right: boolean;
    singleOpen: boolean;
    overInverse: boolean;
};

type BoxedArgs = Args & {inverse: boolean};

const Template: StoryComponent<BoxedArgs & {type?: 'boxed'}> = ({
    title,
    subtitle,
    detail,
    right,
    singleOpen,
    inverse,
    overInverse,
    type,
}) => {
    const content = <Placeholder height={100} />;

    const AccordionComponent = type === 'boxed' ? BoxedAccordion : Accordion;
    const ItemComponent = type === 'boxed' ? BoxedAccordionItem : AccordionItem;

    const getAccordionItemContentProps = () => {
        return {
            title,
            subtitle,
            content,
            detail,
            right: right ? (
                <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
                    <div style={{width: 32, height: 32, borderRadius: '50%', background: 'pink'}} />
                </div>
            ) : undefined,
            ...(type === 'boxed' && {isInverse: inverse}),
        };
    };

    return (
        <ResponsiveLayout fullWidth variant={overInverse ? 'inverse' : 'default'}>
            <Box padding={16}>
                <AccordionComponent singleOpen={singleOpen} dataAttributes={{testid: 'accordion'}}>
                    <ItemComponent
                        {...getAccordionItemContentProps()}
                        dataAttributes={{testid: 'accordion-item-1'}}
                    />
                    <ItemComponent
                        {...getAccordionItemContentProps()}
                        asset={<IconThumbUpFilled size={24} />}
                        dataAttributes={{testid: 'accordion-item-2'}}
                    />
                    <ItemComponent
                        {...getAccordionItemContentProps()}
                        asset={
                            <Circle backgroundColor={skinVars.colors.brandLow} size={40}>
                                <IconMobileDeviceRegular color={skinVars.colors.brand} />
                            </Circle>
                        }
                        dataAttributes={{testid: 'accordion-item-3'}}
                    />

                    <ItemComponent
                        {...getAccordionItemContentProps()}
                        asset={<Circle size={40} backgroundImage={laptopImg} />}
                        dataAttributes={{testid: 'accordion-item-4'}}
                    />

                    <ItemComponent
                        {...getAccordionItemContentProps()}
                        asset={<Image src={usingVrImg} height={80} aspectRatio="16:9" />}
                        dataAttributes={{testid: 'accordion-item-5'}}
                    />

                    <ItemComponent
                        {...getAccordionItemContentProps()}
                        asset={<Image src={personPortraitImg} width={80} aspectRatio="7:10" />}
                        dataAttributes={{testid: 'accordion-item-6'}}
                    />

                    <ItemComponent
                        {...getAccordionItemContentProps()}
                        asset={<Image src={touchImg} width={80} aspectRatio="1:1" />}
                        dataAttributes={{testid: 'accordion-item-7'}}
                    />

                    <ItemComponent
                        {...getAccordionItemContentProps()}
                        asset={<Avatar size={40} src={avatarImg} />}
                        dataAttributes={{testid: 'accordion-item-8'}}
                    />

                    <ItemComponent
                        {...getAccordionItemContentProps()}
                        asset={<Avatar size={40} initials="MS" />}
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
    detail: '',
    right: false,
    singleOpen: false,
    overInverse: false,
};

export const AccordionStory: StoryComponent<Args> = (args) => <Template inverse={false} {...args} />;
AccordionStory.storyName = 'Accordion';
AccordionStory.args = defaultArgs;

export const BoxedAccordionStory: StoryComponent<BoxedArgs> = (args) => <Template type="boxed" {...args} />;
BoxedAccordionStory.storyName = 'BoxedAccordion';
BoxedAccordionStory.args = {...defaultArgs, inverse: false};
