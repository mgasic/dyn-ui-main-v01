import React, { useRef, useState, useCallback, useId, useEffect } from 'react';
import classNames from 'classnames';
import { DynUploadProps, DynUploadFile } from './DynUpload.types';
import styles from './DynUpload.module.css';

export const DynUpload: React.FC<DynUploadProps> = ({
    onUpload,
    accept,
    multiple = false,
    maxSize,
    label = 'Click to upload or drag and drop',
    description = 'SVG, PNG, JPG or GIF (max. 800x400px)',
    disabled = false,
    showFileList = true,
    fileList: controlledFileList,
    onFileListChange,
    className,
    error,
    ...props
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragActive, setIsDragActive] = useState(false);
    const [internalFileList, setInternalFileList] = useState<DynUploadFile[]>([]);
    const id = useId();

    const fileList = controlledFileList || internalFileList;

    useEffect(() => {
        // Cleanup object URLs to avoid memory leaks
        return () => {
            fileList.forEach(file => {
                if (file.preview) {
                    URL.revokeObjectURL(file.preview);
                }
            });
        };
    }, [fileList]);

    const handleFiles = useCallback((files: FileList | null) => {
        if (!files) return;

        const newFiles: DynUploadFile[] = Array.from(files)
            .filter(file => {
                if (maxSize && file.size > maxSize) {
                    alert(`File ${file.name} is too large. Max size is ${maxSize} bytes.`);
                    return false;
                }
                return true;
            })
            .map(file => ({
                file,
                id: Math.random().toString(36).substr(2, 9),
                preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
            }));

        if (newFiles.length === 0) return;

        const updatedList = multiple ? [...fileList, ...newFiles] : newFiles;

        if (controlledFileList === undefined) {
            setInternalFileList(updatedList);
        }

        onFileListChange?.(updatedList);
        onUpload?.(newFiles.map(f => f.file));
    }, [maxSize, multiple, fileList, controlledFileList, onFileListChange, onUpload]);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setIsDragActive(true);
        } else if (e.type === 'dragleave') {
            setIsDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        if (!disabled && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    }, [disabled, handleFiles]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        handleFiles(e.target.files);
        // Reset input value to allow selecting the same file again
        if (inputRef.current) inputRef.current.value = '';
    }, [handleFiles]);

    const handleRemove = useCallback((fileId: string) => {
        const updatedList = fileList.filter(f => f.id !== fileId);

        if (controlledFileList === undefined) {
            setInternalFileList(updatedList);
        }
        onFileListChange?.(updatedList);
    }, [fileList, controlledFileList, onFileListChange]);

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className={classNames(styles.container, className)}>
            <div
                className={classNames(styles.dropZone, {
                    [styles.dropZoneActive]: isDragActive,
                    [styles.dropZoneDisabled]: disabled,
                    [styles.dropZoneError]: error,
                })}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => !disabled && inputRef.current?.click()}
                role="button"
                tabIndex={disabled ? -1 : 0}
                onKeyDown={(e) => {
                    if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        inputRef.current?.click();
                    }
                }}
            >
                <input
                    {...props}
                    ref={inputRef}
                    id={id}
                    type="file"
                    className={styles.input}
                    onChange={handleChange}
                    accept={accept}
                    multiple={multiple}
                    disabled={disabled}
                    aria-hidden="true"
                />

                <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>

                <div className={styles.label}>{label}</div>
                {description && <div className={styles.description}>{description}</div>}
            </div>

            {showFileList && fileList.length > 0 && (
                <div className={styles.fileList}>
                    {fileList.map((file) => (
                        <div key={file.id} className={styles.fileItem}>
                            {file.preview ? (
                                <img src={file.preview} alt="Preview" className={styles.fileItemPreview} />
                            ) : (
                                <div className={styles.fileItemIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            )}
                            <div className={styles.fileItemInfo}>
                                <div className={styles.fileName} title={file.file.name}>{file.file.name}</div>
                                <div className={styles.fileSize}>{formatSize(file.file.size)}</div>
                            </div>
                            {!disabled && (
                                <button
                                    type="button"
                                    className={styles.removeButton}
                                    onClick={() => handleRemove(file.id)}
                                    aria-label={`Remove ${file.file.name}`}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

DynUpload.displayName = 'DynUpload';
