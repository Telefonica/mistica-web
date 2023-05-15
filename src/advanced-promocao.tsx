import * as React from 'react';
import Stack from './stack';
import Inline from './inline';
import {Text2, Text3, Text8} from './text';
import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';

import type Tag from './tag';
import type {RendersNullableElement} from './utils/renders-element';

interface AdvancedPromocaoProps {
    tag?: RendersNullableElement<typeof Tag>;

    value1?: 'string';
    text1?: 'string';

    value2?: 'string';
    text2?: 'string';

    value3?: 'string';

    title?: 'string';
    subtitle?: 'string';
    description?: 'string';
}

const AdvancedPromocao = React.forwardRef<HTMLDivElement, AdvancedPromocaoProps>(
    ({tag, value1, text1, value2, text2, value3, title, subtitle, description}) => {
        return (
            <div>
                {tag && (
                    <div
                        className={sprinkles({
                            paddingBottom: 24,
                        })}
                    >
                        {tag}
                    </div>
                )}

                <Stack space={2}>
                    <Inline space={8} alignItems="flex-end">
                        <Text8 color={vars.colors.brand}>{value1}</Text8>
                        <Text2 regular color={vars.colors.textSecondary}>
                            {text1}
                        </Text2>
                    </Inline>
                    {value2 && (
                        <Inline space={8} alignItems="flex-end">
                            <Text8 color={vars.colors.brand}>{value2}</Text8>
                            <Text2 regular color={vars.colors.textSecondary}>
                                {text2}
                            </Text2>
                        </Inline>
                    )}
                    {value3 && <Text8 color={vars.colors.textSecondary}>{value3}</Text8>}
                </Stack>
                <div
                    className={sprinkles({
                        paddingTop: 8,
                    })}
                >
                    <Stack space={0}>
                        {title && (
                            <Text3 regular color={vars.colors.textSecondary}>
                                {title}
                            </Text3>
                        )}
                        {subtitle && (
                            <Text2 regular color={vars.colors.textSecondary}>
                                {subtitle}
                            </Text2>
                        )}
                        {description && (
                            <Text2 regular color={vars.colors.textSecondary}>
                                {description}
                            </Text2>
                        )}
                    </Stack>
                </div>
            </div>
        );
    }
);

export default AdvancedPromocao;
