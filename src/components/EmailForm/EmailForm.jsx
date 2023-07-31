import React, { useState } from 'react';
import { AppButton, AppTypography, ContentContainer } from '../shared/styledComponents';
import { Alert, Button, Card, Input, Textarea } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { Toast } from 'src/utils';
import isEmpty from 'src/utils/isEmpty';
import { object } from 'prop-types';
import { useContactDoctor } from 'src/queries/queryHooks';
import { Loader } from '..';
import { IMAGES } from 'src/data';

const EmailForm = ({ contact }) => {
  const [err, setError] = useState({ e: false, message: '' });
  const { mutate, isLoading } = useContactDoctor();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm();

  const messageValue = watch('message');

  const onSubmit = (data) => {
    const payload = {
      ...data,
      doctorID: contact?.id
    };
    setError({
      e: false,
      message: ''
    });
    mutate(payload, {
      onSuccess: (response) => {
        reset({ subject: '', message: '' });
        Toast.fire({
          icon: 'success',
          title: response?.data?.message
        });
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
              label="Subject"
              name="subject"
              error={!isEmpty(errors.subject)}
              {...register('subject', {
                required: 'Kindly input the subject of this mail.'
              })}
            />
            {errors.subject && (
              <ContentContainer className="text-red-500 font-medium text-xs">
                {errors.subject.message}
              </ContentContainer>
            )}
          </ContentContainer>
          <ContentContainer>
            <Textarea
              rows={11}
              type="password"
              size="lg"
              label="Message"
              value={messageValue?.message}
              name="message"
              {...register('message', {
                required: 'Message content required'
              })}
              error={!isEmpty(errors.message)}
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
            {errors.message && (
              <ContentContainer className="text-red-500 font-medium text-xs">
                {errors.message.message}
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
        <ContentContainer row className="flex gap-4 justify-end mt-3">
          <Button
            size="sm"
            color="red"
            variant="text"
            className="rounded-md"
            onClick={() => reset({ subject: '', message: '' })}>
            Cancel
          </Button>
          {isLoading ? (
            <Loader size="sm" fullWidth={false} />
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
  contact: object
};

EmailForm.defaultProps = {
  contact: {}
};
