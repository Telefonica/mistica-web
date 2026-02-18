'use client';
import * as React from 'react';
import classnames from 'classnames';
import Stack from './stack';
import {Text1, Text2, Text3} from './text';
import Inline from './inline';
import IconWarningRegular from './generated/mistica-icons/icon-warning-regular';
import {vars as skinVars} from './skins/skin-contract.css';
import {Boxed} from './boxed';
import Box from './box';
import {useTheme} from './hooks';
import * as textTokens from './text-tokens';
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
import {useThemeVariant} from './theme-variant-context';
import {getPrefixedDataAttributes} from './utils/dom';

import type {DataAttributes, IconProps} from './utils/types';
import type {ExclusifyUnion} from './utils/utility-types';

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

const updateInputFiles = (input: HTMLInputElement | null, files: FileList | null) => {
    if (!input) {
        return;
    }
    if (files && files.length > 0) {
        input.files = files;
    } else {
        const dataTransfer = new DataTransfer();
        input.value = '';
        input.files = dataTransfer.files;
    }
};

type UseFileUploadProps = {
    id?: string;
    name?: string;
    accept?: string;
    capture?: boolean | 'user' | 'environment';
    multiple?: boolean;
    disabled?: boolean;
    errorText?: string;
    /** When enabled, new files will be appended to the existing files instead of replacing them */
    allowAppend?: boolean;
    files?: FileList | null;
    defaultFiles?: FileList | null;
    onFilesChange?: (files: FileList | null) => void;
};

type UseFileUploadReturn = {
    id: string;
    files: FileList | null;
    setFiles: (files: FileList | null) => void;
    inputProps: {
        ref: React.RefObject<HTMLInputElement | null>;
        type: 'file';
        id: string;
        name?: string;
        accept?: string;
        capture?: boolean | 'user' | 'environment';
        multiple?: boolean;
        disabled?: boolean;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        'aria-describedby'?: string;
        'aria-invalid'?: boolean;
    };
    dropZoneProps: {
        onDragEnter: (event: React.DragEvent<HTMLDivElement>) => void;
        onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
        onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
        onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
        onClick: (event: React.MouseEvent<HTMLElement>) => void;
    };
    isDragActive: boolean;
    openFileDialog: () => void;
    removeFile: (file: File) => void;
    errorTextId: string;
};

const useFileUpload = ({
    id: idProp,
    name,
    accept,
    capture,
    multiple,
    disabled = false,
    errorText,
    allowAppend = false,
    files: filesProp,
    defaultFiles = null,
    onFilesChange,
}: UseFileUploadProps): UseFileUploadReturn => {
    const generatedId = React.useId();
    const id = idProp || generatedId;
    const errorTextId = `${id}-error-text`;
    const [filesState, setFilesState] = React.useState<FileList | null>(defaultFiles);
    const [isDragActive, setIsDragActive] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const dragCounterRef = React.useRef(0);
    const isControlled = typeof filesProp !== 'undefined';
    const files = isControlled ? filesProp : filesState;

    const setFiles = (nextFiles: FileList | null) => {
        if (!isControlled) {
            setFilesState(nextFiles);
        }
        onFilesChange?.(nextFiles);
        updateInputFiles(inputRef.current, nextFiles);
    };

    const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) {
            return;
        }
        const newFiles = event.target.files;
        if (!newFiles) {
            return;
        }

        if (allowAppend && files && files.length > 0) {
            const dataTransfer = new DataTransfer();
            for (let i = 0; i < files.length; i++) {
                const existingFile = files.item(i);
                if (existingFile) {
                    dataTransfer.items.add(existingFile);
                }
            }
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
        if (disabled) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        dragCounterRef.current++;
        if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
            setIsDragActive(true);
        }
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        if (disabled) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        dragCounterRef.current--;
        if (dragCounterRef.current === 0) {
            setIsDragActive(false);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        if (disabled) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        if (disabled) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        setIsDragActive(false);
        dragCounterRef.current = 0;

        const droppedFiles = event.dataTransfer.files;
        if (droppedFiles && droppedFiles.length > 0) {
            const dataTransfer = new DataTransfer();

            if (allowAppend && files && files.length > 0) {
                for (let i = 0; i < files.length; i++) {
                    const existingFile = files.item(i);
                    if (existingFile) {
                        dataTransfer.items.add(existingFile);
                    }
                }
                for (let i = 0; i < droppedFiles.length; i++) {
                    const droppedFile = droppedFiles.item(i);
                    if (droppedFile) {
                        dataTransfer.items.add(droppedFile);
                    }
                }
                setFiles(dataTransfer.files);
            } else if (!multiple && droppedFiles.length > 1) {
                dataTransfer.items.add(droppedFiles[0]);
                setFiles(dataTransfer.files);
            } else {
                setFiles(droppedFiles);
            }
        }
    };

    const removeFile = (file: File) => {
        if (disabled) {
            return;
        }
        const dataTransfer = new DataTransfer();
        if (files) {
            for (let i = 0; i < files.length; i++) {
                const existingFile = files.item(i);
                if (existingFile && existingFile !== file) {
                    dataTransfer.items.add(existingFile);
                }
            }
            setFiles(dataTransfer.files);
        }
    };

    const openFileDialog = () => {
        if (disabled) {
            return;
        }
        inputRef.current?.click();
    };

    const handleDropZoneClick = (event: React.MouseEvent<HTMLElement>) => {
        if (disabled) {
            return;
        }
        if (event.defaultPrevented) {
            return;
        }

        const target = event.target instanceof HTMLElement ? event.target : null;
        // Ignore clicks on interactive descendants to avoid reopening the dialog.
        if (target?.closest('button, a, input, select, textarea, [role="button"]')) {
            return;
        }

        openFileDialog();
    };

    React.useEffect(() => {
        updateInputFiles(inputRef.current, files ?? null);
    }, [files]);

    return {
        id,
        files,
        setFiles,
        inputProps: {
            ref: inputRef,
            type: 'file' as const,
            id,
            name,
            accept,
            capture,
            multiple,
            disabled,
            onChange: handleFilesChange,
            'aria-describedby': errorText ? errorTextId : undefined,
            'aria-invalid': !!errorText,
        },
        dropZoneProps: {
            onDragEnter: handleDragEnter,
            onDragLeave: handleDragLeave,
            onDragOver: handleDragOver,
            onDrop: handleDrop,
            onClick: handleDropZoneClick,
        },
        isDragActive,
        openFileDialog,
        removeFile,
        errorTextId,
    };
};

type FileItemProps = {
    file: File;
    onRemove: (file: File) => void;
    formatSize?: (sizeInBytes: number) => string;
    removeLabel?: string;
};

export const FileItem = ({file, onRemove, removeLabel}: FileItemProps): JSX.Element => {
    const {i18n, t, texts} = useTheme();

    return (
        <Boxed>
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
                            onPress={() => onRemove(file)}
                            aria-label={
                                removeLabel ??
                                texts.fileUploadRemoveFile ??
                                t(textTokens.fileUploadRemoveFile, file.name)
                            }
                        />
                    </Inline>
                </Inline>
            </Box>
        </Boxed>
    );
};

type Props = {
    id?: string;
    name?: string;
    accept?: string;
    capture?: boolean | 'user' | 'environment';
    multiple?: boolean;
    disabled?: boolean;
    errorText?: string;
    /** When enabled, new files will be appended to the existing files instead of replacing them */
    allowAppend?: boolean;
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
} & ExclusifyUnion<
    | {
          render: (props: {
              id: string;
              files: FileList | null;
              setFiles: (files: FileList | null) => void;
              dropZoneProps: {
                  onDragEnter: (event: React.DragEvent<HTMLDivElement>) => void;
                  onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
                  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
                  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
                  onClick: (event: React.MouseEvent<HTMLElement>) => void;
              };
              isDragActive: boolean;
              openFileDialog: () => void;
              removeFile: (file: File) => void;
              errorTextId: string;
              disabled: boolean;
          }) => React.ReactNode;
      }
    | {
          asset?: React.ReactNode;
          title?: string;
          description?: string;
          slot?: React.ReactNode;
          renderButton: (props: {onPress: () => void; small: boolean; disabled: boolean}) => React.ReactNode;
          renderFiles?: (props: {
              files: FileList | null;
              removeFile: (file: File) => void;
          }) => React.ReactNode;
          withDropZone?: boolean;
      }
>;

const FileUpload = (props: Props): JSX.Element => {
    const {
        id: idProp,
        name,
        accept,
        capture,
        multiple,
        disabled = false,
        errorText,
        allowAppend = false,
        dataAttributes,
    } = props;
    const {texts, t} = useTheme();
    const outsideVariant = useThemeVariant();
    const {
        id,
        files,
        setFiles,
        inputProps,
        dropZoneProps,
        isDragActive,
        openFileDialog,
        removeFile,
        errorTextId,
    } = useFileUpload({
        id: idProp,
        name,
        accept,
        capture,
        multiple,
        disabled,
        errorText,
        allowAppend,
    });

    if (props.render) {
        return (
            <div
                {...getPrefixedDataAttributes({
                    'component-name': 'FileUpload',
                    testid: 'FileUpload',
                    ...dataAttributes,
                })}
            >
                {props.render({
                    id,
                    files,
                    setFiles,
                    dropZoneProps,
                    isDragActive,
                    openFileDialog,
                    removeFile,
                    errorTextId,
                    disabled,
                })}
                <input style={{display: 'none'}} {...inputProps} />
            </div>
        );
    }

    const {asset, title, description, slot, renderButton, renderFiles, withDropZone = false} = props;

    const dropZoneHandlers = withDropZone && !disabled ? dropZoneProps : {};

    const isBrandVariant = outsideVariant === 'brand';
    const contentClassName = classnames({
        [styles.dropZoneContainerBrand]: withDropZone && isBrandVariant,
        [styles.dropZoneContainer]: withDropZone && !isBrandVariant,
        [styles.dropZoneActiveBrand]: withDropZone && isDragActive && isBrandVariant,
        [styles.dropZoneActive]: withDropZone && isDragActive && !isBrandVariant,
        [styles.disabled]: disabled,
    });

    const assetClassName = withDropZone && isDragActive ? styles.assetScaleActive : '';

    return (
        <Stack
            space={16}
            dataAttributes={{'component-name': 'FileUpload', testid: 'FileUpload', ...dataAttributes}}
        >
            <Stack space={4}>
                <div {...dropZoneHandlers}>
                    <div className={contentClassName}>
                        <Stack space={8}>
                            {asset && (
                                <div
                                    className={assetClassName}
                                    style={{
                                        color: isBrandVariant
                                            ? skinVars.colors.neutralHighBrand
                                            : skinVars.colors.brand,
                                    }}
                                >
                                    {asset}
                                </div>
                            )}
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
                        </Stack>
                        {slot}
                        <Box paddingTop={16}>
                            {withDropZone ? (
                                <div className={styles.centeredButton}>
                                    {renderButton({onPress: openFileDialog, small: true, disabled})}
                                </div>
                            ) : (
                                renderButton({onPress: openFileDialog, small: true, disabled})
                            )}
                        </Box>
                    </div>

                    <input style={{display: 'none'}} {...inputProps} />
                </div>
                {errorText && (
                    <div className={disabled ? styles.disabled : ''}>
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
                    </div>
                )}
            </Stack>
            {renderFiles
                ? renderFiles({files, removeFile})
                : files &&
                  files.length > 0 && (
                      <Stack
                          space={8}
                          role="list"
                          aria-label={texts.fileUploadListLabel ?? t(textTokens.fileUploadListLabel)}
                      >
                          {Array.from(files).map((file, index) => (
                              <FileItem key={index} file={file} onRemove={removeFile} />
                          ))}
                      </Stack>
                  )}
        </Stack>
    );
};

export default FileUpload;
