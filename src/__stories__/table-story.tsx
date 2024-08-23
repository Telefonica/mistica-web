import * as React from 'react';
import {ResponsiveLayout, Box, Table, Tag, IconLightningRegular} from '..';

export default {
    title: 'Components/Table',
    parameters: {fullScreen: true},
};

const foodList = [
    ['Slice of pizza', '450', '95%', '5,00€', <Tag>Common</Tag>, '8/10'],
    ['Hamburger', '350', '87%', '3,50€', <Tag>Common</Tag>, '7.5/10'],
    ['Salad', '150', '70%', '4,00€', <Tag>Common</Tag>, '6/10'],
    ['Sushi', '200', '90%', '12,00€', <Tag type="warning">Rare</Tag>, '9/10'],
    ['Ice cream', '350', '95%', '3,00€', <Tag>Common</Tag>, '8/10'],
    ['Cake', '500', '90%', '5,00€', <Tag>Common</Tag>, '8/10'],
    ['Pasta', '300', '80%', '6,00€', <Tag>Common</Tag>, '7/10'],
    ['Fries', '250', '85%', '2,50€', <Tag>Common</Tag>, '7/10'],
    ['Hot dog', '400', '80%', '4,00€', <Tag>Common</Tag>, '7/10'],
    ['Steak', '600', '95%', '15,00€', <Tag type="warning">Rare</Tag>, '9/10'],
    ['Ramen', '400', '85%', '10,00€', <Tag type="warning">Rare</Tag>, '8/10'],
    ['Pancakes', '350', '90%', '4,00€', <Tag>Common</Tag>, '8/10'],
    ['Tacos', '300', '85%', '8,00€', <Tag>Common</Tag>, '7/10'],
    ['Donuts', '300', '95%', '2,00€', <Tag>Common</Tag>, '8/10'],
    ['Soup', '200', '80%', '3,00€', <Tag>Common</Tag>, '6/10'],
    ['Curry', '400', '90%', '9,00€', <Tag>Common</Tag>, '8/10'],
    ['Fish and chips', '500', '85%', '7,00€', <Tag>Common</Tag>, '7/10'],
    ['Burger', '350', '85%', '4,00€', <Tag>Common</Tag>, '7/10'],
    ['Kebab', '500', '90%', '6,00€', <Tag>Common</Tag>, '8/10'],
    ['Waffles', '400', '95%', '5,00€', <Tag>Common</Tag>, '8/10'],
    ['Pretzel', '300', '85%', '2,50€', <Tag>Common</Tag>, '7/10'],
    ['Cheeseburger', '450', '85%', '5,00€', <Tag>Common</Tag>, '7/10'],
    ['Nachos', '300', '80%', '3,00€', <Tag>Common</Tag>, '6/10'],
    ['Lasagna', '500', '90%', '8,00€', <Tag>Common</Tag>, '8/10'],
];

type Args = {
    inverse: boolean;
    boxed: boolean;
    responsive: 'scroll' | 'collapse-rows';
    fullWidth: boolean;
    scrollOverResponsiveLayout: boolean;
    maxHeight: string | undefined;
    numItems: number;
    emptyCase: string;
    columnTextAlign: Array<'left' | 'right' | 'center'>;
    rowVerticalAlign: 'top' | 'middle';
    columnWidth: Array<number | string>;
    actions: boolean;
    hideHeaders: 'true' | 'false' | 'mobile' | 'desktop';
    rowHeader: boolean;
    rowHeaderIndex: number;
};

export const Default: StoryComponent<Args> = ({
    inverse,
    boxed,
    responsive,
    fullWidth,
    scrollOverResponsiveLayout,
    maxHeight,
    numItems,
    emptyCase,
    columnTextAlign,
    rowVerticalAlign,
    columnWidth,
    actions,
    hideHeaders,
    rowHeader,
    rowHeaderIndex,
}) => {
    return (
        <ResponsiveLayout isInverse={inverse}>
            <Box paddingY={24}>
                <Table
                    fullWidth={fullWidth}
                    maxHeight={maxHeight}
                    responsive={responsive}
                    boxed={boxed}
                    heading={[
                        'Type of food',
                        'Calories',
                        'Tasty Factor',
                        'Average Price',
                        'Rarity',
                        'Average Rating',
                    ]}
                    columnTextAlign={columnTextAlign}
                    columnWidth={columnWidth}
                    rowVerticalAlign={rowVerticalAlign}
                    rowHeaderIndex={rowHeader ? rowHeaderIndex : undefined}
                    content={foodList.slice(0, numItems).map((row, index) => {
                        const actionsCount = actions ? (index + 1) % 3 : 0;
                        return actionsCount === 0
                            ? row
                            : {
                                  cells: row,
                                  actions: Array.from({length: actionsCount}, (_, id) => ({
                                      onPress: () => {},
                                      Icon: IconLightningRegular,
                                      label: `row-${index}-action-${id}`,
                                  })),
                              };
                    })}
                    emptyCase={emptyCase}
                    scrollOverResponsiveLayout={scrollOverResponsiveLayout}
                    hideHeaders={
                        hideHeaders === 'true' || hideHeaders === 'false'
                            ? hideHeaders === 'true'
                            : hideHeaders
                    }
                />
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Table';
Default.args = {
    inverse: false,
    boxed: false,
    responsive: 'scroll',
    fullWidth: true,
    scrollOverResponsiveLayout: true,
    maxHeight: undefined,
    numItems: 5,
    emptyCase: 'No food items found',
    columnTextAlign: ['left', 'right', 'right', 'right', 'center', 'right'],
    rowVerticalAlign: 'middle',
    columnWidth: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
    actions: false,
    hideHeaders: 'false',
    rowHeader: false,
    rowHeaderIndex: 0,
};
Default.argTypes = {
    responsive: {
        options: ['scroll', 'collapse-rows'],
        control: {type: 'select'},
    },
    maxHeight: {
        control: {type: 'text'},
    },
    numItems: {
        control: {type: 'range', min: 0, max: foodList.length, step: 1},
    },
    rowVerticalAlign: {
        options: ['top', 'middle'],
        control: {type: 'select'},
    },
    hideHeaders: {
        options: ['false', 'true', 'mobile', 'desktop'],
        control: {type: 'select'},
    },
    rowHeaderIndex: {if: {arg: 'rowHeader'}},
};
