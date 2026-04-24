import * as React from 'react';
import {
    FileUpload,
    ButtonPrimary,
    ButtonSecondary,
    ResponsiveLayout,
    Box,
    Placeholder,
    Stack,
    Inline,
    Text2,
    Text3,
    Grid,
    Image,
    Icon,
    IconButton,
    IconCloseRegular,
} from '..';
import {vars as skinVars} from '../skins/skin-contract.css';
import beachImg from './images/beach.jpg';

import type {Variant} from '../theme-variant-context';

export default {
    title: 'Components/Input fields/FileUpload',
    parameters: {fullScreen: true},
};

type Args = {
    variantOutside: Variant;
    withDropZone: boolean;
    multiple: boolean;
    allowAppend: boolean;
    accept: string;
    disabled: boolean;
    withAsset: boolean;
    title: string;
    description: string;
    withSlot: boolean;
    buttonType: 'primary' | 'secondary' | 'icon';
    errorText: string;
};

export const Default: StoryComponent<Args> = ({
    withDropZone,
    multiple,
    allowAppend,
    accept,
    withAsset,
    withSlot,
    errorText,
    disabled,
    buttonType,
    title,
    description,
    variantOutside,
}) => {
    return (
        <div
            style={{
                backgroundImage: variantOutside === 'media' ? `url(${beachImg})` : undefined,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            }}
        >
            <ResponsiveLayout variant={variantOutside}>
                <Box padding={16}>
                    <FileUpload
                        name="file-upload"
                        accept={accept || undefined}
                        multiple={multiple}
                        allowAppend={allowAppend}
                        withDropZone={withDropZone}
                        disabled={disabled}
                        asset={withAsset ? <Icon name="export-regular" color="currentColor" /> : undefined}
                        title={title}
                        description={description}
                        slot={withSlot ? <Placeholder /> : undefined}
                        errorText={errorText || undefined}
                        renderButton={(buttonProps) => {
                            switch (buttonType) {
                                case 'primary':
                                    return <ButtonPrimary {...buttonProps}>Choose file</ButtonPrimary>;
                                case 'secondary':
                                    return <ButtonSecondary {...buttonProps}>Choose file</ButtonSecondary>;
                                case 'icon':
                                    return (
                                        <IconButton
                                            {...buttonProps}
                                            Icon={() => <Icon name="export-regular" />}
                                            backgroundType="solid"
                                            aria-label="Choose file"
                                        />
                                    );
                                default:
                                    return null;
                            }
                        }}
                    />
                </Box>
            </ResponsiveLayout>
        </div>
    );
};

Default.storyName = 'FileUpload';
Default.args = {
    variantOutside: 'default',
    withDropZone: true,
    multiple: false,
    allowAppend: false,
    accept: '',
    disabled: false,
    withAsset: true,
    title: 'Drag or upload your file',
    description: 'File can be up to 50Mb',
    withSlot: true,
    buttonType: 'primary',
    errorText: '',
};
Default.argTypes = {
    variantOutside: {
        options: ['default', 'brand', 'alternative', 'negative', 'media'],
        control: {type: 'select'},
    },
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
    disabled: {
        control: {type: 'boolean'},
    },
    withAsset: {
        control: {type: 'boolean'},
    },
    title: {
        control: {type: 'text'},
    },
    description: {
        control: {type: 'text'},
    },
    withSlot: {
        control: {type: 'boolean'},
    },
    buttonType: {
        options: ['primary', 'secondary', 'icon'],
        control: {type: 'select'},
    },
    errorText: {
        control: {type: 'text'},
    },
};

export const CustomFilesList: StoryComponent = () => {
    return (
        <ResponsiveLayout>
            <Box padding={16}>
                <FileUpload
                    name="files-list-upload"
                    multiple
                    allowAppend
                    title="Upload documents"
                    description="PDF, DOCX or TXT"
                    renderButton={(buttonProps) => (
                        <ButtonPrimary {...buttonProps}>Choose files</ButtonPrimary>
                    )}
                    renderFiles={({files, removeFile}) => {
                        const filesArray = Array.from(files ?? []);
                        if (filesArray.length === 0) {
                            return null;
                        }

                        return (
                            <Stack space={8} role="list">
                                {filesArray.map((file, index) => (
                                    <Inline key={`${file.name}-${index}`} space={8} alignItems="center">
                                        <Text2 regular>{file.name}</Text2>
                                        <ButtonSecondary small onPress={() => removeFile(file)}>
                                            Remove
                                        </ButtonSecondary>
                                    </Inline>
                                ))}
                            </Stack>
                        );
                    }}
                />
            </Box>
        </ResponsiveLayout>
    );
};

export const CustomGallery: StoryComponent = () => {
    return (
        <ResponsiveLayout>
            <Box padding={16}>
                <FileUpload
                    name="gallery-upload"
                    accept="image/*"
                    multiple
                    allowAppend
                    render={({id, files, dropZoneProps, isDragActive, openFileDialog, removeFile}) => {
                        const filesArray = files ? Array.from(files) : [];
                        return (
                            <Stack space={16}>
                                <Inline space="between" alignItems="center">
                                    <Text3 regular as="div">
                                        <label htmlFor={id}>Gallery</label>
                                    </Text3>
                                    <ButtonSecondary small onPress={openFileDialog}>
                                        Add photos
                                    </ButtonSecondary>
                                </Inline>
                                <div
                                    {...dropZoneProps}
                                    style={{
                                        border: `1px dashed ${skinVars.colors.inputBorder}`,
                                        borderRadius: 12,
                                        padding: 16,
                                        backgroundColor: isDragActive
                                            ? skinVars.colors.backgroundDropZoneDragover
                                            : skinVars.colors.backgroundContainer,
                                    }}
                                >
                                    {filesArray.length === 0 && (
                                        <Text2 regular color={skinVars.colors.textSecondary}>
                                            Drop images here or click Add photos
                                        </Text2>
                                    )}
                                    {filesArray.length > 0 && (
                                        <Grid columns={{minSize: 120}} gap={16}>
                                            {filesArray.map((file, index) => {
                                                return (
                                                    <div
                                                        key={`${file.name}-${index}`}
                                                        style={{
                                                            position: 'relative',
                                                            width: 120,
                                                            height: 120,
                                                        }}
                                                    >
                                                        <Image
                                                            src={URL.createObjectURL(file)}
                                                            alt={file.name}
                                                            width={120}
                                                            height={120}
                                                        />
                                                        <div style={{position: 'absolute', top: 8, right: 8}}>
                                                            <IconButton
                                                                Icon={IconCloseRegular}
                                                                type="danger"
                                                                backgroundType="solid"
                                                                small
                                                                onPress={() => removeFile(file)}
                                                                aria-label={`Remove ${file.name}`}
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </Grid>
                                    )}
                                </div>
                            </Stack>
                        );
                    }}
                />
            </Box>
        </ResponsiveLayout>
    );
};

CustomGallery.storyName = 'Custom gallery';
