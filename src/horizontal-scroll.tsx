import * as React from 'react';
import * as styles from './horizontal-scroll.css';

type Props = {
    children: React.ReactNode;
};

const HorizontalScroll = React.forwardRef<HTMLDivElement, Props>(({children}: Props, ref) => {
    return (
        <div className={styles.scroll} ref={ref}>
            {children}
        </div>
    );
});

export default HorizontalScroll;
