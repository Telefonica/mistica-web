import * as React from 'react';
import {Text2} from './text';
import {vars} from './skins/skin-contract.css';
import Image from './image';
import {sprinkles} from './sprinkles.css';

interface AdvancedAssinaturaProps {
    image?: string;
    description?: string;
}

const AdvancedAssinatura = React.forwardRef<HTMLDivElement, AdvancedAssinaturaProps>(
    ({image, description}) => {
        return (
            <div>
                <div
                    className={sprinkles({
                        display: 'flex',
                        alignItems: 'center',
                        height: 40,
                    })}
                >
                    {image && (
                        <div
                            className={sprinkles({
                                paddingRight: 16,
                            })}
                        >
                            <Image height={40} src={image} />
                        </div>
                    )}

                    <Text2 regular color={vars.colors.textSecondary}>
                        {description}
                    </Text2>
                </div>
            </div>
        );
    }
);

export default AdvancedAssinatura;
