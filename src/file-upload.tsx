'use client';
import * as React from 'react';
import Stack from './stack';
import {Text1, Text2, Text3} from './text';
import Inline from './inline';
import IconWarningRegular from './generated/mistica-icons/icon-warning-regular';
import {vars as skinVars} from './skins/skin-contract.css';
import {Boxed} from './boxed';
import Box from './box';
import {useTheme} from './hooks';
import {IconButton} from './icon-button';
import Image from './image';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import IconFilePdfRegular from './generated/mistica-icons/icon-file-pdf-regular';
import IconInvoicePlanFileRegular from './generated/mistica-icons/icon-invoice-plan-file-regular';
import IconFilePptRegular from './generated/mistica-icons/icon-file-ppt-regular';
import IconFileZipRegular from './generated/mistica-icons/icon-file-zip-regular';
import IconFileComressedRegular from './generated/mistica-icons/icon-file-compressed-regular';
import IconFileCssRegular from './generated/mistica-icons/icon-file-css-regular';
import IconFileHtmlRegular from './generated/mistica-icons/icon-file-html-regular';
import IconFileEnexRegular from './generated/mistica-icons/icon-file-enex-regular';
import IconFilePsdRegular from './generated/mistica-icons/icon-file-psd-regular';
import IconFileIllustratorRegular from './generated/mistica-icons/icon-file-illustrator-regular';
import IconFileMp4Regular from './generated/mistica-icons/icon-file-mp-4-regular';
import IconFileVideoRegular from './generated/mistica-icons/icon-video-regular';
import IconFileAviRegular from './generated/mistica-icons/icon-file-avi-regular';
import IconFileMp3Regular from './generated/mistica-icons/icon-file-mp-3-regular';
import IconFileMusicRegular from './generated/mistica-icons/icon-file-music-regular';
import IconClipRegular from './generated/mistica-icons/icon-clip-regular';
import * as styles from './file-upload.css';
import {ThemeVariant, useThemeVariant} from './theme-variant-context';

import type {DataAttributes, IconProps} from './utils/types';

const FileIcon = ({file}: {file: File}) => {
    if (file.type.startsWith('image/')) {
        return <Image src={URL.createObjectURL(file)} alt={file.name} width={40} height={40} />;
    }

    const fileExtensionToIconComponent: {[key: string]: (props: IconProps) => JSX.Element} = {
        pdf: IconFilePdfRegular,
        doc: IconInvoicePlanFileRegular,
        docx: IconInvoicePlanFileRegular,
        txt: IconInvoicePlanFileRegular,
        ppt: IconFilePptRegular,
        pptx: IconFilePptRegular,
        zip: IconFileZipRegular,
        rar: IconFileComressedRegular,
        css: IconFileCssRegular,
        html: IconFileHtmlRegular,
        enex: IconFileEnexRegular,
        pds: IconFilePsdRegular,
        ai: IconFileIllustratorRegular,
        mp4: IconFileMp4Regular,
        mov: IconFileVideoRegular,
        avi: IconFileAviRegular,
        mp3: IconFileMp3Regular,
        wav: IconFileMusicRegular,
    };

    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    const IconComponent = fileExtensionToIconComponent[extension] || IconClipRegular;

    return <IconComponent />;
};

const formatSize = (sizeInBytes: number, locale?: string): string => {
    if (sizeInBytes < 1024) {
        return `${sizeInBytes} B`;
    } else if (sizeInBytes < 1024 * 1024) {
        return `${Math.round(sizeInBytes / 1024).toLocaleString(locale)} KB`;
    } else {
        return `${(sizeInBytes / (1024 * 1024)).toLocaleString(locale, {minimumFractionDigits: 0, maximumFractionDigits: 2})} MB`;
    }
};

type Props = {
    id?: string;
    name?: string;
    accept?: string;
    capture?: boolean | 'user' | 'environment';
    multiple?: boolean;
    asset?: React.ReactNode;
    title?: string;
    description?: string;
    slot?: React.ReactNode;
    renderButton: (props: {onPress: () => void; small: boolean}) => React.ReactNode;
    withDropZone?: boolean;
    errorText?: string;
    /** When enabled, new files will be appended to the existing files instead of replacing them */
    allowAppend?: boolean;
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
};

const FileUpload = ({
    id: idProp,
    name,
    accept,
    capture,
    multiple,
    asset,
    title,
    description,
    slot,
    renderButton,
    withDropZone = false,
    errorText,
    allowAppend = false,
    dataAttributes,
}: Props): JSX.Element => {
    const {i18n} = useTheme();
    const generatedId = React.useId();
    const id = idProp || generatedId;
    const errorTextId = `${id}-error-text`;
    const [files, setFiles] = React.useState<FileList | null>(null);
    const [isDragActive, setIsDragActive] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const dragCounterRef = React.useRef(0);
    const outsideVariant = useThemeVariant();

    const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = event.target.files;
        if (!newFiles) {
            return;
        }

        if (allowAppend && files && files.length > 0) {
            // Append new files to existing files
            const dataTransfer = new DataTransfer();
            // Add existing files
            for (let i = 0; i < files.length; i++) {
                const existingFile = files.item(i);
                if (existingFile) {
                    dataTransfer.items.add(existingFile);
                }
            }
            // Add new files
            for (let i = 0; i < newFiles.length; i++) {
                const newFile = newFiles.item(i);
                if (newFile) {
                    dataTransfer.items.add(newFile);
                }
            }
            setFiles(dataTransfer.files);
        } else {
            setFiles(newFiles);
        }
    };

    const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        dragCounterRef.current++;
        if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
            setIsDragActive(true);
        }
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        dragCounterRef.current--;
        if (dragCounterRef.current === 0) {
            setIsDragActive(false);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragActive(false);
        dragCounterRef.current = 0;

        const droppedFiles = event.dataTransfer.files;
        if (droppedFiles && droppedFiles.length > 0) {
            const dataTransfer = new DataTransfer();

            if (allowAppend && files && files.length > 0) {
                // Append new files to existing files
                // Add existing files first
                for (let i = 0; i < files.length; i++) {
                    const existingFile = files.item(i);
                    if (existingFile) {
                        dataTransfer.items.add(existingFile);
                    }
                }
                // Add dropped files
                for (let i = 0; i < droppedFiles.length; i++) {
                    const droppedFile = droppedFiles.item(i);
                    if (droppedFile) {
                        dataTransfer.items.add(droppedFile);
                    }
                }
                setFiles(dataTransfer.files);
                if (inputRef.current) {
                    inputRef.current.files = dataTransfer.files;
                }
            } else if (!multiple && droppedFiles.length > 1) {
                // Only take the first file if multiple is not allowed
                dataTransfer.items.add(droppedFiles[0]);
                setFiles(dataTransfer.files);
                if (inputRef.current) {
                    inputRef.current.files = dataTransfer.files;
                }
            } else {
                setFiles(droppedFiles);
                if (inputRef.current) {
                    inputRef.current.files = droppedFiles;
                }
            }
        }
    };

    const removeFile = (file: File) => {
        const dataTransfer = new DataTransfer();
        if (files) {
            for (let i = 0; i < files.length; i++) {
                const existingFile = files.item(i);
                if (existingFile && existingFile !== file) {
                    dataTransfer.items.add(existingFile);
                }
            }
            setFiles(dataTransfer.files);
            if (inputRef.current) {
                inputRef.current.files = dataTransfer.files;
            }
        }
    };

    const handleButtonPress = () => {
        inputRef.current?.click();
    };

    const dropZoneHandlers = withDropZone
        ? {
              onDragEnter: handleDragEnter,
              onDragLeave: handleDragLeave,
              onDragOver: handleDragOver,
              onDrop: handleDrop,
          }
        : {};

    const contentClassName = withDropZone
        ? `${styles.dropZoneContainer} ${isDragActive ? styles.dropZoneActive : ''}`
        : '';

    const assetClassName = withDropZone && isDragActive ? styles.assetScaleActive : '';

    return (
        <Stack
            space={16}
            dataAttributes={{'component-name': 'FileUpload', testid: 'FileUpload', ...dataAttributes}}
        >
            <Stack space={4}>
                <div {...dropZoneHandlers}>
                    <div className={contentClassName}>
                        <ThemeVariant variant={withDropZone ? 'default' : outsideVariant}>
                            <Stack space={16}>
                                <div className={assetClassName}>{asset}</div>
                                <Stack space={4}>
                                    <Text3 regular as="div" dataAttributes={{testid: 'title'}}>
                                        <label htmlFor={id}>{title}</label>
                                    </Text3>
                                    {description && (
                                        <Text2
                                            regular
                                            as="div"
                                            color={skinVars.colors.textSecondary}
                                            dataAttributes={{testid: 'description'}}
                                        >
                                            {description}
                                        </Text2>
                                    )}
                                </Stack>
                                {slot}
                                {renderButton({onPress: handleButtonPress, small: true})}
                            </Stack>
                        </ThemeVariant>
                    </div>

                    <input
                        style={{display: 'none'}}
                        ref={inputRef}
                        type="file"
                        id={id}
                        name={name}
                        accept={accept}
                        capture={capture}
                        multiple={multiple}
                        onChange={handleFilesChange}
                        aria-describedby={errorText ? errorTextId : undefined}
                        aria-invalid={!!errorText}
                    />
                </div>
                {errorText && (
                    <Text1
                        regular
                        color={skinVars.colors.textError}
                        as="div"
                        id={errorTextId}
                        aria-live="assertive"
                        dataAttributes={{testid: 'error-text'}}
                    >
                        <Inline space={4}>
                            <IconWarningRegular size={16} color="currentColor" />
                            {errorText}
                        </Inline>
                    </Text1>
                )}
            </Stack>
            {files && files.length > 0 && (
                <Stack space={8} role="list">
                    {Array.from(files).map((file, index) => (
                        <Boxed key={index}>
                            <Box paddingX={8} paddingY={16}>
                                <Inline space="between" alignItems="center">
                                    <Inline space={8} alignItems="center">
                                        <FileIcon file={file} />
                                        <Text2 regular>{file.name}</Text2>
                                    </Inline>
                                    <Inline space={16} alignItems="center">
                                        <Text2 regular color={skinVars.colors.textSecondary}>
                                            {formatSize(file.size, i18n.locale)}
                                        </Text2>
                                        <IconButton
                                            Icon={IconCloseRegular}
                                            type="neutral"
                                            small
                                            onPress={() => removeFile(file)}
                                            aria-label={`Remove file ${file.name}`}
                                        />
                                    </Inline>
                                </Inline>
                            </Box>
                        </Boxed>
                    ))}
                </Stack>
            )}
        </Stack>
    );
};

export default FileUpload;
