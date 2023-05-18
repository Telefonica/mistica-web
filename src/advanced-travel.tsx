import * as React from 'react';
import Inline from './inline';
import { Text2 } from './text';
import { vars } from './skins/skin-contract.css';
import Box from './box';
import Avatar from './avatar';



interface AdvancedProdutoProps {
    title?: string;
    image?: string;
    description: string;
}

const AdvancedTravel = React.forwardRef<HTMLDivElement, AdvancedProdutoProps>(
    ({ title, image, description }) => {

        const width = description ? 271 : 263

        return (

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}>
                {(title || image || description) && (
                    <>
                        {image && (
                            <>
                                {title && (
                                    <Box width={width} paddingRight={32}>
                                        <Text2 medium>{title}</Text2>
                                    </Box>
                                )}
                                <Box >
                                    <Inline space={-12} >
                                        {Array.from({ length: 3 }, (_, i) => (
                                            <Avatar key={i} size={32} border src={image} />
                                        ))}

                                    </Inline>
                                </Box>

                            </>
                        )}
                        {description && !image && (
                            <>
                                {title && (
                                    <Box width={263} paddingRight={32}>
                                        <Text2 medium as='div'>{title}</Text2>
                                    </Box>
                                )}
                                <Box width={72}>
                                    <Text2 medium color={vars.colors.textSecondary}>{description}</Text2>
                                </Box>
                            </>
                        )}
                    </>
                )
                }
            </div>
        )
    }
);

export default AdvancedTravel;