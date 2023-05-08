import * as React from 'react';
import {Boxed} from '../boxed';

interface AdvancedDataCardProps {
    title?: string;
    'aria-label'?: string;
}

const AdvancedDataCard = React.forwardRef<HTMLDivElement, AdvancedDataCardProps>(
    ({title, 'aria-label': ariaLabel}, ref) => {
        return (
            <section aria-label={ariaLabel} style={{height: '100%', position: 'relative'}}>
                <Boxed dataAttributes={{'component-name': 'DataCard'}} ref={ref} width="100%" height="100%">
                    <div>
                        <h1>{title}</h1>
                    </div>
                </Boxed>
            </section>
        );
    }
);

export default AdvancedDataCard;
