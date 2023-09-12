import React, { useEffect, useRef, useState } from 'react';
import Auth from 'src/middleware/storage';
import { Mixpanel } from 'src/utils/mixpanelUtil';
import { bool, func, string } from 'prop-types';
import {
  AppTypography,
  ContentContainer,
  CustomInput,
  FileInput
} from '../shared/styledComponents';
import { Avatar, Button, IconButton } from '@material-tailwind/react';
import { PenIcon } from '../shared/AppIcons/AppIcons';
import { useUploadMediaFile } from 'src/queries/queryHooks';
import { Toast } from 'src/utils';
import isEmpty from 'src/utils/isEmpty';
import { ProfilePicture } from '..';
import { useLocalStore } from 'src/store';

export const FileUpload = ({
  defaultUrl,
  setFileUrl,
  disabled,
  onUploadSuccess,
  usePhotoPicker,
  label,
  acceptedFormat,
  required,
  className,
  loading
}) => {
  const inputRef = useRef(null);
  const { mutate, isLoading } = useUploadMediaFile();
  const setUploading = useLocalStore((state) => state.setIsLoading);

  const [file, setFile] = useState({});
  const [url, setUrl] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);

  const resetFileInput = () => {
    if (!inputRef.current) return;
    // 👇️ reset input value
    inputRef.current.value = null;
    setUrl('');
    setFileUrl('');
    setFile({});
    setIsUploaded(false);
    setUploading({ isLoading: false });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);

    if (usePhotoPicker) return;
    handleUpload(e.target.files[0]);
  };

  const handleUpload = (data) => {
    if (!file) {
      Toast.fire({
        icon: 'warning',
        title: 'Please select a valid file to upload'
      });
      return;
    }
    setUploading({ isLoading: true });
    const formData = new FormData();
    formData.append('name', usePhotoPicker ? file?.name : data?.name);
    formData.append('media', usePhotoPicker ? file : data);

    mutate(formData, {
      onSuccess: (response) => {
        import.meta.env.DEV &&
          console.log('\n 🚀 ~ file: FileUpload.jsx:45 ~ handleUpload ~ response:', response);

        setUrl(response?.data?.media?.url);
        setFileUrl(response?.data?.media?.url);
        setFile({});
        setIsUploaded(true);
        onUploadSuccess && onUploadSuccess(response?.data?.media?.url);
        setUploading({ isLoading: false });
      },
      onError: (error) => {
        import.meta.env.DEV &&
          console.log('\n 🚀 ~ file: FileUpload.jsx:57 ~ handleUpload ~ error:', error);
        Toast.fire({
          icon: 'error',
          title: error
        });
        setIsUploaded(false);
        Mixpanel.track('Error: FileUpload ~ handleUpload ~ error: ->', {
          data: {
            message: !isEmpty(error.response?.data?.message)
              ? error.response?.data?.message
              : error?.message,
            url: error?.response?.config?.url
          }
        });
        setUploading({ isLoading: false });
      }
    });
  };

  return (
    <ContentContainer className="gap-2 overflow-hidden">
      {usePhotoPicker ? (
        <>
          <ContentContainer col className="items-center gap-2 mt-4 ">
            <ContentContainer className={`relative`}>
              <ProfilePicture
                imgSrc={url || defaultUrl}
                size="xxl"
                className={`${
                  isLoading || loading ? 'animate-pulse' : ''
                } rounded-full bg-kiiraBg3/80 border-2 md:border-4 border-kiiraBlue w-28 h-28 md:w-40 md:h-40 flex items-center justify-center`}
              />
              <ContentContainer
                cursor="pointer"
                className="absolute right-1.5 md:right-4  bottom-1.5 md:bottom-2 bg-kiiraBlue h-7 w-7 flex items-center justify-center rounded-full">
                <FileInput
                  title="Upload picture"
                  type="file"
                  onChange={handleFileChange}
                  placeholder={label}
                  accept={acceptedFormat}
                  disabled={disabled || isLoading || loading}
                  className={`z-10 min-w-[20px] cursor-pointer ${className}}`}
                  required={required}
                />
                <IconButton variant="text">
                  <PenIcon className="text-white p-1.5  w-7 h-7" />
                </IconButton>
              </ContentContainer>
            </ContentContainer>
          </ContentContainer>
          {!isEmpty(file?.type) ? (
            <>
              <AppTypography variant="small" className="text-center text-xs">
                {file?.name}
              </AppTypography>
              {/* {percent > 0 ? (
                <Progress
                  value={percent}
                  color="blue"
                  size="sm"
                  label={percent < 99 ? 'uploading' : 'uploading'}
                  className="max-w-xs"
                />
              ) : null} */}

              <Button
                size="sm"
                disabled={disabled || isLoading || loading}
                onClick={handleUpload}
                color="blue">
                {isLoading || loading ? 'Processing' : 'Update'}
              </Button>
            </>
          ) : null}
        </>
      ) : (
        <ContentContainer row className="gap-1 items-center">
          <CustomInput
            ref={inputRef}
            type="file"
            onChange={handleFileChange}
            placeholder={label}
            accept={acceptedFormat}
            disabled={
              disabled
              // || isLoading
            }
            className={`border-none ${className}}`}
            required={required}
          />
          {!isEmpty(file?.type) && isLoading ? (
            <>
              <IconButton variant="text" size="sm" className="hover:bg-transparent opacity-100">
                <i className="fa-solid fa-spinner fa-spin text-blue-700 text-xl"></i>
              </IconButton>
            </>
          ) : null}

          {!isEmpty(url) || !isEmpty(file?.type) ? (
            // && isUploaded
            <ContentContainer row className="gap-1">
              <IconButton
                variant="text"
                size="sm"
                className="hover:bg-transparent opacity-100"
                onClick={resetFileInput}>
                <i title="remove" class="fa-solid fa-xmark text-red-900 text-sm"></i>
              </IconButton>
            </ContentContainer>
          ) : null}

          {isLoading && !isEmpty(file) ? (
            <ContentContainer row className="gap-1">
              <Button
                variant="text"
                size="sm"
                className="flex flex-row items-center gap-1 hover:bg-transparent opacity-100 text-xs"
                onClick={resetFileInput}>
                Cancel <i title="remove" class="fa-solid fa-xmark text-red-900 text-sm"></i>
              </Button>{' '}
            </ContentContainer>
          ) : null}

          {!isEmpty(file?.type) && !isLoading && !isUploaded ? (
            <IconButton variant="text" size="sm" className="hover:bg-transparent opacity-100">
              <i class="fa-solid fa-file-circle-exclamation text-red-600 text-lg"></i>
            </IconButton>
          ) : null}
        </ContentContainer>
      )}
    </ContentContainer>
  );
};

export default FileUpload;

FileUpload.propTypes = {
  setFileUrl: func,
  usePhotoPicker: bool,
  label: string,
  acceptedFormat: string,
  disabled: bool,
  defaultUrl: string,
  required: bool,
  className: string,
  onUploadSuccess: func,
  loading: bool
};

FileUpload.defaultPropTypes = {
  setFileUrl: () => {},
  usePhotoPicker: true,
  label: 'No file chosen',
  acceptedFormat: '/image/*',
  disabled: false,
  defaultUrl: '',
  required: false,
  className: '',
  onUploadSuccess: () => {},
  loading: false
};
