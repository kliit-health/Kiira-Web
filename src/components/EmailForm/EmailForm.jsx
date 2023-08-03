import React, { useState } from 'react';
import { AppButton, AppTypography, ContentContainer } from '../shared/styledComponents';
import { Alert, Button, Card, Input, Textarea } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { Toast } from 'src/utils';
import isEmpty from 'src/utils/isEmpty';
import { func, object } from 'prop-types';
import { useContactDoctor } from 'src/queries/queryHooks';
import { Loader } from '..';
import { InfinitySpin } from 'react-loader-spinner';

const EmailForm = ({ contact, onSuccessCallback }) => {
  const [err, setError] = useState({ e: false, message: '' });
  const [message, setMessage] = useState({ show: false, description: '' });
  const { mutate, isLoading } = useContactDoctor();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm();

  const messageValue = watch('content');

  const onSubmit = (data) => {
    const payload = {
      ...data,
      calendarID: contact?.id
    };
    setError({
      e: false,
      message: ''
    });
    mutate(payload, {
      onSuccess: (response) => {
        reset({ title: '', content: '' });
        setMessage({
          show: true,
          description: `Email was sent successfully.`
        });
        setTimeout(() => {
          Toast.fire({
            icon: 'success',
            title: `Email sent successfully.`
          });
        }, 1500);
        onSuccessCallback();
      },
      onError: (error) => {
        console.log('\n 🚀 ~ file: EmailForm.jsx:38 ~ onSubmit ~ error:', error);
        setError({
          e: true,
          message: error.response?.data?.message || 'An error occurred, please try again later.'
        });
      }
    });
  };

  return (
    <ContentContainer
      className="bg-kiiraBg2/50 p-5 pb-1 h-full overflow-hidden overflow-y-auto rounded-2xl shadow-md"
      hideScroll>
      <form className=" w-full sm:w-96 lg:max-w-screen-2xl" onSubmit={handleSubmit(onSubmit)}>
        <ContentContainer className="flex flex-col gap-6">
          <ContentContainer>
            <Input
              required
              size="lg"
              label="Title"
              name="title"
              error={!isEmpty(errors.title)}
              {...register('title', {
                required: 'Kindly input the subject of this mail.'
              })}
            />
            {errors.title && (
              <ContentContainer className="text-red-500 font-medium text-xs">
                {errors.title.message}
              </ContentContainer>
            )}
          </ContentContainer>
          <ContentContainer>
            <Textarea
              rows={11}
              size="lg"
              label="Message"
              value={messageValue?.content}
              name="content"
              {...register('content', {
                required: 'Message content required'
              })}
              error={!isEmpty(errors.content)}
            />
            {messageValue?.length > 0 ? (
              <AppTypography
                variant="small"
                className={
                  messageValue?.length > 650
                    ? 'text-[10px] font-semibold text-orange-700 text-right'
                    : 'text-[10px] font-semibold text-kiiraText text-right'
                }>
                {messageValue?.length}/650
              </AppTypography>
            ) : null}
            {errors.content && (
              <ContentContainer className="text-red-500 font-medium text-xs">
                {errors.content.message}
              </ContentContainer>
            )}
          </ContentContainer>
        </ContentContainer>

        <Alert
          open={err.e}
          className="text-white flex items-center font-medium text-sm"
          color="red"
          icon={<i className="fa-solid fa-triangle-exclamation h-6 w-6 text-white"></i>}
          action={
            <Button
              variant="text"
              color="white"
              size="sm"
              className="!absolute top-3 right-3 p-1"
              onClick={() => setError({ ...err, e: false })}>
              <i className="fa-regular fa-circle-xmark text-white text-xl"></i>
            </Button>
          }>
          {err.message}
        </Alert>
        <Alert
          open={message?.show}
          className="text-white flex items-center font-bold text-sm"
          color="green"
          icon={<i className="fa-solid fa-envelope-circle-check text-xl/"></i>}>
          {message.description}
        </Alert>
        <ContentContainer row className="flex gap-4 justify-end mt-3">
          <Button
            size="sm"
            color="red"
            variant="text"
            className="rounded-md"
            onClick={() => {
              reset({ title: '', content: '' });
              setError({ e: false, message: '' });
              setMessage({ show: false, description: '' });
            }}>
            Clear all
          </Button>
          {isLoading ? (
            <Loader
              spinner={<InfinitySpin color="#fff" />}
              size="sm"
              fullWidth={false}
              className="w-28 h-8 px-4 py-2"
            />
          ) : (
            <AppButton size="sm" className="px-12" type="submit">
              Send
            </AppButton>
          )}
        </ContentContainer>
      </form>

      <AppTypography variant="small" className="text-center text-[10px] mt-5 mb-1">
        I agree to all the <span className="text-kiiraBlue">Terms</span> and
        <span className="text-kiiraBlue"> Privacy Policies</span>
      </AppTypography>
    </ContentContainer>
  );
};

export default EmailForm;

EmailForm.propTypes = {
  contact: object,
  onSuccessCallback: func
};

EmailForm.defaultProps = {
  contact: {},
  onSuccessCallback: () => {}
};
