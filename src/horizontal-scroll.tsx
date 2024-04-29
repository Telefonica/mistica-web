import classNames from 'classnames';
import * as React from 'react';
import * as styles from './horizontal-scroll.css';

type Props = {
    children: React.ReactNode;
    noScrollbar?: boolean;
};

const HorizontalScroll = React.forwardRef<HTMLDivElement, Props>(({children, noScrollbar}: Props, ref) => {
    return (
        <div className={classNames(styles.scroll, {[styles.noScrollbar]: noScrollbar})} ref={ref}>
            {children}
        </div>
    );
});

export default HorizontalScroll;
