import * as React from 'react';
import * as styles from './example-component.css';
import Box from '../box';

type Props = {
    children: React.ReactNode;
};

const ExampleComponent = (props: Props): JSX.Element => {
    return (
        <div className={styles.example}>
            <Box padding={16}>{props.children}</Box>
        </div>
    );
};

export default ExampleComponent;
