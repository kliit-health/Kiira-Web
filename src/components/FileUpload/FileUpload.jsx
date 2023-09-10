import React, { useEffect, useState } from 'react';
import Auth from 'src/middleware/storage';
import { Mixpanel } from 'src/utils/mixpanelUtil';
import { bool, func, string } from 'prop-types';
import {
  AppTypography,
  ContentContainer,
  CustomInput,
  FileInput
} from '../shared/styledComponents';
import { Avatar, Button, Progress } from '@material-tailwind/react';
import { IMAGES } from 'src/data';
import { PenIcon } from '../shared/AppIcons/AppIcons';
import { useUploadMediaFile } from 'src/queries/queryHooks';
import { Toast } from 'src/utils';
import isEmpty from 'src/utils/isEmpty';

export const FileUpload = ({ setFileData, disabled, usePhotoPicker, label, acceptedFormat }) => {
  const { mutate, isLoading } = useUploadMediaFile();
  const user = Auth.getUser();

  const [file, setFile] = useState({});
  const [fileUrl, setFileUrl] = useState('');
  useEffect(() => {}, [file, fileUrl]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      Toast.fire({
        icon: 'warning',
        title: 'Please select a valid file to upload'
      });
      return;
    }

    const formData = new FormData();
    formData.append('name', file?.name);
    formData.append('media', file);

    mutate(formData, {
      onSuccess: (response) => {
        setFileUrl(response?.data?.media?.url);
        setFileData(response?.data?.media);
      },
      onError: (error) => {
        import.meta.env.DEV &&
          console.log('\n 🚀 ~ file: FileUpload.jsx:57 ~ handleUpload ~ error:', error);
        Toast.fire({
          icon: 'error',
          title: error
        });
        Mixpanel.track('Error: FileUpload ~ handleUpload ~ error: ->', {
          data: {
            message: !isEmpty(error.response?.data?.message)
              ? error.response?.data?.message
              : error?.message,
            url: error?.response?.config?.url
          }
        });
      }
    });
  };

  return (
    <ContentContainer className="gap-2 overflow-hidden">
      {usePhotoPicker ? (
        <>
          <ContentContainer col cursor="pointer" className="items-center gap-2 mt-4 ">
            <ContentContainer className={`relative hover:opacity-80`}>
              <Avatar
                src={fileUrl || IMAGES?.dummyProfilePhoto}
                alt={user?.last_name}
                variant="circular"
                size="xxl"
                className={`${
                  isLoading ? 'animate-pulse' : ''
                } rounded-full bg-kiiraBg3/80 border-2 md:border-4 border-kiiraBlue w-28 h-28 md:w-40 md:h-40 flex items-center justify-center`}
              />
              <FileInput
                type="file"
                onChange={handleFileChange}
                placeholder={label}
                accept={acceptedFormat}
                disabled={disabled || isLoading}
                className="z-10"
              />
              <PenIcon className=" absolute bottom-1.5 md:bottom-2 text-white right-1.5 md:right-4 p-1.5 bg-kiiraBlue w-7 h-7 flex items-center justify-center rounded-full" />
            </ContentContainer>
          </ContentContainer>
        </>
      ) : (
        <CustomInput
          type="file"
          onChange={handleFileChange}
          placeholder={label}
          accept={acceptedFormat}
          disabled={disabled || isLoading}
        />
      )}

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

          <Button size="sm" disabled={disabled || isLoading} onClick={handleUpload} color="blue">
            {isLoading ? 'Uploading' : 'Update'}
          </Button>
        </>
      ) : null}
    </ContentContainer>
  );
};

export default FileUpload;

FileUpload.propTypes = {
  setFileData: func,
  usePhotoPicker: bool,
  label: string,
  acceptedFormat: string,
  disabled: bool
};

FileUpload.defaultPropTypes = {
  setFileData: () => {},
  usePhotoPicker: true,
  label: 'No file chosen',
  acceptedFormat: '/image/*',
  disabled: false
};
