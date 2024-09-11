import * as React from 'react';
import {Grid, GridItem} from './grid';
import {Carousel} from './carousel';
import * as styles from './mosaic.css';

import type {DataAttributes} from './utils/types';

const GRID_GAP = {mobile: 8, desktop: 16} as const;

type HorizontalMosaicPageProps = {
    items: ReadonlyArray<React.ReactElement>;
    isEven: boolean;
};

const HorizontalMosaicPage = ({items, isEven}: HorizontalMosaicPageProps) => {
    return (
        <div className={items.length === 1 ? styles.singleItemRowContainer : styles.squareContainer}>
            <Grid gap={GRID_GAP} rows={2} columns={2} height="100%">
                {items.length === 3 ? (
                    <>
                        <GridItem columnSpan={isEven ? 2 : undefined}>{items[0]}</GridItem>
                        <GridItem>{items[1]}</GridItem>
                        <GridItem columnSpan={isEven ? undefined : 2}>{items[2]}</GridItem>
                    </>
                ) : (
                    items.map((item, itemIndex) => (
                        <GridItem
                            columnSpan={items.length === 4 ? undefined : 2}
                            rowSpan={items.length === 1 ? 2 : undefined}
                            key={itemIndex}
                        >
                            {item}
                        </GridItem>
                    ))
                )}
            </Grid>
        </div>
    );
};

type HorizontalMosaicProps = {
    items: ReadonlyArray<React.ReactElement>;
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
    const pages = Array.from({length: pagesCount}, () => [] as Array<React.ReactElement>);

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
    items: ReadonlyArray<React.ReactElement>;
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
                                {item}
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
                                {item}
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
                        <GridItem rowSpan={2}>{items[0]}</GridItem>
                        <GridItem>{items[1]}</GridItem>
                        <GridItem rowSpan={2}>{items[3]}</GridItem>
                        <GridItem>{items[2]}</GridItem>
                    </Grid>
                </div>
            );
    }
};

type VerticalMosaicProps = {
    items: ReadonlyArray<React.ReactElement>;
    dataAttributes?: DataAttributes;
};

export const VerticalMosaic = ({items, dataAttributes}: VerticalMosaicProps): JSX.Element => {
    const itemsCount = items.length;

    const pagesCount = Math.ceil(itemsCount / 4);
    const pages = Array.from({length: pagesCount}, () => [] as Array<React.ReactElement<any>>);

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
