import * as React from 'react';
import {Grid, GridItem} from './grid';
import {Carousel} from './carousel';
import * as styles from './mosaic.css';

import type {DataAttributes} from './utils/types';

const GRID_GAP = {mobile: 8, desktop: 16} as const;

type MosaicItemGridMode = 'horizontal' | 'square' | 'vertical';

type MosaicItem = React.ReactElement | ((config: {gridMode: MosaicItemGridMode}) => React.ReactElement);

type HorizontalMosaicPageProps = {
    items: ReadonlyArray<MosaicItem>;
    isEven: boolean;
};

const renderItem = (item: MosaicItem, gridMode: MosaicItemGridMode) => {
    return typeof item === 'function' ? item({gridMode}) : item;
};

const HorizontalMosaicPage = ({items, isEven}: HorizontalMosaicPageProps) => {
    return (
        <div className={items.length === 1 ? styles.singleItemRowContainer : styles.squareContainer}>
            <Grid gap={GRID_GAP} rows={2} columns={2} height="100%">
                {items.length === 3 ? (
                    <>
                        <GridItem columnSpan={isEven ? 2 : undefined}>
                            {renderItem(items[0], isEven ? 'horizontal' : 'square')}
                        </GridItem>
                        <GridItem>{renderItem(items[1], 'square')}</GridItem>
                        <GridItem columnSpan={isEven ? undefined : 2}>
                            {renderItem(items[2], isEven ? 'square' : 'horizontal')}
                        </GridItem>
                    </>
                ) : (
                    items.map((item, itemIndex) => (
                        <GridItem
                            columnSpan={items.length === 4 ? undefined : 2}
                            rowSpan={items.length === 1 ? 2 : undefined}
                            key={itemIndex}
                        >
                            {renderItem(item, items.length === 4 ? 'square' : 'horizontal')}
                        </GridItem>
                    ))
                )}
            </Grid>
        </div>
    );
};

type HorizontalMosaicProps = {
    items: ReadonlyArray<MosaicItem>;
    withBullets?: boolean;
    free?: boolean;
    dataAttributes?: DataAttributes;
};

export const HorizontalMosaic = ({
    items,
    withBullets,
    free,
    dataAttributes,
}: HorizontalMosaicProps): JSX.Element => {
    const itemsCount = items.length;

    const pagesCount = itemsCount < 5 ? Math.min(itemsCount, 1) : Math.floor((itemsCount + 1) / 3);
    const pages = Array.from({length: pagesCount}, () => [] as Array<MosaicItem>);

    items.forEach((item, index) => {
        const itemPageIndex = Math.min(pagesCount - 1, Math.floor(index / 3));
        pages[itemPageIndex].push(item);
    });

    return (
        <Carousel
            dataAttributes={{...dataAttributes, 'component-name': 'HorizontalMosaic'}}
            items={pages.map((items, index) => (
                <Grid>
                    <HorizontalMosaicPage items={items} isEven={index % 2 === 0} key={index} />
                </Grid>
            ))}
            withBullets={withBullets}
            free={free}
        />
    );
};

type VerticalMosaicPageProps = {
    items: ReadonlyArray<MosaicItem>;
};

const VerticalMosaicPage = ({items}: VerticalMosaicPageProps) => {
    switch (items.length) {
        case 1:
        case 2:
            return (
                <div className={styles.singleItemRowContainer}>
                    <Grid gap={GRID_GAP} columns={2} height="100%">
                        {items.map((item, itemIndex) => (
                            <GridItem columnSpan={items.length === 2 ? undefined : 2} key={itemIndex}>
                                {renderItem(item, items.length === 2 ? 'square' : 'horizontal')}
                            </GridItem>
                        ))}
                    </Grid>
                </div>
            );

        case 3:
            return (
                <div className={styles.squareContainer}>
                    <Grid gap={GRID_GAP} columns={2} flow="column" height="100%">
                        {items.map((item, itemIndex) => (
                            <GridItem rowSpan={itemIndex === 0 ? 2 : undefined} key={itemIndex}>
                                {renderItem(item, itemIndex === 0 ? 'vertical' : 'square')}
                            </GridItem>
                        ))}
                    </Grid>
                </div>
            );

        case 4:
        default:
            return (
                <div className={styles.fourItemsContainer}>
                    <Grid gap={GRID_GAP} rows={3} columns={2} height="100%">
                        <GridItem rowSpan={2}>{renderItem(items[0], 'vertical')}</GridItem>
                        <GridItem>{renderItem(items[1], 'square')}</GridItem>
                        <GridItem rowSpan={2}>{renderItem(items[3], 'vertical')}</GridItem>
                        <GridItem>{renderItem(items[2], 'square')}</GridItem>
                    </Grid>
                </div>
            );
    }
};

type VerticalMosaicProps = {
    items: ReadonlyArray<MosaicItem>;
    dataAttributes?: DataAttributes;
};

export const VerticalMosaic = ({items, dataAttributes}: VerticalMosaicProps): JSX.Element => {
    const itemsCount = items.length;

    const pagesCount = Math.ceil(itemsCount / 4);
    const pages = Array.from({length: pagesCount}, () => [] as Array<MosaicItem>);

    items.forEach((item, index) => {
        const itemPageIndex = Math.floor(index / 4);
        pages[itemPageIndex].push(item);
    });

    return (
        <Grid
            rows={1}
            gap={GRID_GAP}
            dataAttributes={{...dataAttributes, 'component-name': 'VerticalMosaic'}}
        >
            {pages.map((items, index) => (
                <VerticalMosaicPage items={items} key={index} />
            ))}
        </Grid>
    );
};
