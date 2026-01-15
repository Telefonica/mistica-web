'use client';
import * as React from 'react';
import Stack from './stack';
import {IconWarningRegular, Inline, Text1, Text3} from '../dist';
import {Text2} from './text';
import {vars as skinVars} from './skins/skin-contract.css';

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
    button: React.ReactNode;
    errorText?: string;
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
    button,
    errorText,
}: Props): JSX.Element => {
    const generatedId = React.useId();
    const id = idProp || generatedId;
    const errorTextId = `${id}-error-text`;
    const [files, setFiles] = React.useState<FileList | null>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFiles(event.target.files);
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

    return (
        <Stack space={16}>
            <Stack space={4}>
                <div>
                    <Stack space={16}>
                        <div>
                            <Stack space={8}>
                                {asset}
                                <Stack space={4}>
                                    <Text3 regular as="div">
                                        <label htmlFor={id}>{title}</label>
                                    </Text3>
                                    {description && (
                                        <Text2 regular as="div" color={skinVars.colors.textSecondary}>
                                            {description}
                                        </Text2>
                                    )}
                                </Stack>
                            </Stack>
                            {slot}
                        </div>
                        {button}
                    </Stack>

                    <input
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
                    >
                        <Inline space={4}>
                            <IconWarningRegular color="currentColor" />
                            {errorText}
                        </Inline>
                    </Text1>
                )}
            </Stack>
            {files && files.length > 0 && (
                <ul>
                    {Array.from(files).map((file, index) => (
                        <li key={index}>
                            {file.name} {file.size} bytes{' '}
                            <button type="button" onClick={() => removeFile(file)}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </Stack>
    );
};

export default FileUpload;
