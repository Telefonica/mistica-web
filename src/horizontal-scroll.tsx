import classNames from 'classnames';
import * as React from 'react';
import * as styles from './horizontal-scroll.css';
import ResponsiveLayout, {ResetResponsiveLayout} from './responsive-layout';
import {sprinkles} from './sprinkles.css';

type Props = {
    children: React.ReactNode;
    noScrollbar?: boolean;
};

const HorizontalScroll = React.forwardRef<HTMLDivElement, Props>(({children, noScrollbar}: Props, ref) => {
    return (
        <ResetResponsiveLayout>
            <div className={classNames(styles.scroll, {[styles.noScrollbar]: noScrollbar})} ref={ref}>
                <div className={sprinkles({display: 'inline-flex'})}>
                    <ResponsiveLayout>{children}</ResponsiveLayout>
                </div>
            </div>
        </ResetResponsiveLayout>
    );
});

export default HorizontalScroll;
