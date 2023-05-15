import * as React from 'react';
import Inline from './inline';
import {Text2, Text8} from './text';
import {vars} from './skins/skin-contract.css';
import Box from './box';
import ProgressBar from './progress-bar';
import Image from './image';

interface AdvancedProdutoProps {
    title?: string;
    image?: string;

    progressPercent?: number;

    value: string;
    text: string;
}

const AdvancedProduto = React.forwardRef<HTMLDivElement, AdvancedProdutoProps>(
    ({title, image, progressPercent, value, text}) => {
        return (
            <div>
                {progressPercent && (
                    <div>
                        {title && (
                            <Box paddingBottom={8}>
                                <Inline space="between" alignItems="flex-end">
                                    <div style={{paddingRight: '32px'}}>
                                        <Text2 medium>{title}</Text2>
                                    </div>
                                    {image && <Image height={40} src={image} />}
                                </Inline>
                            </Box>
                        )}
                        <ProgressBar progressPercent={progressPercent} reverse={false} />
                    </div>
                )}
                <Box paddingTop={8}>
                    <Inline space={8} alignItems="flex-end">
                        <Text8 color={vars.colors.brand}>{value}</Text8>
                        <Text2 regular color={vars.colors.textSecondary}>
                            {text}
                        </Text2>
                    </Inline>
                </Box>
            </div>
        );
    }
);

export default AdvancedProduto;
