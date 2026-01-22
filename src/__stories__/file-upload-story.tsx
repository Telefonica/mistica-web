import * as React from 'react';
import {
    FileUpload,
    ButtonPrimary,
    ButtonSecondary,
    IconExportRegular,
    skinVars,
    ResponsiveLayout,
    Box,
    Placeholder,
} from '..';

import type {Variant} from '../theme-variant-context';

export default {
    title: 'Components/FileUpload',
    parameters: {fullScreen: true},
    argTypes: {
        withDropZone: {
            control: {type: 'boolean'},
        },
        multiple: {
            control: {type: 'boolean'},
        },
        allowAppend: {
            control: {type: 'boolean'},
        },
        accept: {
            control: {type: 'text'},
        },
        withAsset: {
            control: {type: 'boolean'},
        },
        withSlot: {
            control: {type: 'boolean'},
        },
        errorText: {
            control: {type: 'text'},
        },
        buttonType: {
            options: ['primary', 'secondary'],
            control: {type: 'select'},
        },
        title: {
            control: {type: 'text'},
        },
        description: {
            control: {type: 'text'},
        },
        variantOutside: {
            options: ['default', 'brand', 'alternative'],
            control: {type: 'select'},
        },
    },
};

type Args = {
    withDropZone: boolean;
    multiple: boolean;
    allowAppend: boolean;
    accept: string;
    withAsset: boolean;
    withSlot: boolean;
    errorText: string;
    buttonType: 'primary' | 'secondary';
    title: string;
    description: string;
    variantOutside: Variant;
};

export const Default: StoryComponent<Args> = ({
    withDropZone,
    multiple,
    allowAppend,
    accept,
    withAsset,
    withSlot,
    errorText,
    buttonType,
    title,
    description,
    variantOutside,
}) => {
    return (
        <ResponsiveLayout variant={variantOutside} fullWidth>
            <Box padding={16}>
                <FileUpload
                    name="file-upload"
                    accept={accept || undefined}
                    multiple={multiple}
                    allowAppend={allowAppend}
                    withDropZone={withDropZone}
                    asset={withAsset ? <IconExportRegular color={skinVars.colors.brand} /> : undefined}
                    title={title}
                    description={description}
                    slot={withSlot ? <Placeholder /> : undefined}
                    errorText={errorText || undefined}
                    renderButton={({onPress, small}) =>
                        buttonType === 'primary' ? (
                            <ButtonPrimary small={small} onPress={onPress}>
                                Choose file
                            </ButtonPrimary>
                        ) : (
                            <ButtonSecondary small={small} onPress={onPress}>
                                Choose file
                            </ButtonSecondary>
                        )
                    }
                />
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'FileUpload';
Default.args = {
    withDropZone: true,
    multiple: false,
    allowAppend: false,
    accept: '',
    withAsset: true,
    withSlot: true,
    errorText: '',
    buttonType: 'primary',
    title: 'Drag or upload your file',
    description: 'File can be up to 50Mb',
    variantOutside: 'default',
};
