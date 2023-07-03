import React, { useEffect, useState } from 'react';
import { useBookingForms, useProfile } from 'src/queries/queryHooks';
import { ThreeDots } from 'react-loader-spinner';
import isEmpty from 'src/utils/isEmpty';
import { AppTypography, ContentContainer } from '../shared/styledComponents';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Checkbox,
  Input,
  Option,
  Radio,
  Select,
  input
} from '@material-tailwind/react';
import { truncate } from 'src/utils/truncate';
import { INPUT_NAMES, INPUT_TYPES } from 'src/data';
import { Empty } from '..';
import { array, bool, func, object } from 'prop-types';

const DefaultFormInput = ({
  appointmentFormIDs,
  setFormResult,
  bookingFormError,
  formsData,
  loadingForms,
  formValues
}) => {
  const { data: userProfile } = useProfile();
  const profile = userProfile?.data?.user;

  const filteredFormData = formsData?.filter((elem) =>
    appointmentFormIDs?.find((id) => elem.id === id)
  );

  const [fieldValues, setFieldValues] = useState(formValues);

  useEffect(() => {
    if (isEmpty(fieldValues) && !isEmpty(formValues)) {
      setFieldValues(formValues);
      return;
    }
  }, [formValues]);

  const [selectedInput, setSelectedInput] = useState({});
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((cur) => !cur);

  const handleInputChange = (event) => {
    if (selectedInput?.type === INPUT_TYPES.DROPDOWN) {
      setFieldValues({ ...fieldValues, [selectedInput?.id]: event });
      return;
    }

    event?.preventDefault();

    if (selectedInput?.type === INPUT_TYPES.CHECKBOX) {
      setFieldValues({ ...fieldValues, [event.target.name]: event.target.checked });
    } else if (selectedInput?.type === INPUT_TYPES.FILE) {
      setFieldValues({ ...fieldValues, [event.target.name]: event.target.files[0] });
    } else if (selectedInput?.type === INPUT_TYPES.DROPDOWN) {
      setFieldValues({ ...fieldValues, [event.target.name]: event.target.selected });
    } else {
      if (selectedInput?.name === INPUT_NAMES.full_name) {
        setFieldValues({
          ...fieldValues,
          [event.target.name]: `${profile?.first_name} ${profile?.last_name}`
        });
        return;
      }
      if (selectedInput?.name === INPUT_NAMES.email) {
        setFieldValues({
          ...fieldValues,
          [event.target.name]: profile?.email
        });
        return;
      }
      setFieldValues({ ...fieldValues, [event.target.name]: event.target.value });
    }
  };

  useEffect(() => {
    if (isEmpty(fieldValues)) {
      return;
    }
    setFormResult(fieldValues);
  }, [fieldValues]);

  return (
    <>
      {!isEmpty(filteredFormData) && !loadingForms ? (
        <form>
          <ContentContainer className="min-h-[50px] gap-10">
            {filteredFormData?.map((field, index) => {
              const { id, description, hidden, name, fields } = field;
              if (hidden) return;

              return (
                <ContentContainer
                  className="flex gap-4 flex-col w-full flex-wrap lg:flex-nowrap"
                  key={index?.toString()}>
                  <ContentContainer>
                    <AppTypography
                      variant="h6"
                      className="text-kiiraBlackishGreen font-semibold text-lg">
                      {name}
                    </AppTypography>

                    {!isEmpty(description) ? (
                      <>
                        <Accordion
                          open={open}
                          animate={{
                            mount: { scale: 1 },
                            unmount: { scale: 0.85 }
                          }}>
                          <AccordionHeader className="border-b-0 text-sm text-kiiraBlackishGreen/75  w-full font-montserrat font-semibold whitespace-pre-wrap">
                            <AppTypography
                              variant="lead"
                              className="text-sm text-kiiraBlackishGreen/75  w-full font-montserrat font-normal whitespace-pre-wrap">
                              {truncate(description, 805)}
                            </AppTypography>
                          </AccordionHeader>
                          <AccordionBody className="text-sm text-kiiraBlackishGreen/75  w-full font-montserrat font-semibold whitespace-pre-wrap">
                            <AppTypography
                              variant="lead"
                              className="text-sm text-kiiraBlackishGreen/75  w-full font-montserrat font-normal whitespace-pre-wrap">
                              {description?.slice(805)}
                            </AppTypography>
                          </AccordionBody>
                        </Accordion>
                      </>
                    ) : null}

                    {description?.length > 805 ? (
                      <Button
                        onClick={toggleOpen}
                        variant="text"
                        size="sm"
                        className="font-poppins text-kiiraBlue capitalize font-medium text-sm max-w-max px-2 -mt-4">
                        {!open ? 'Read more' : 'See less'}
                      </Button>
                    ) : null}
                  </ContentContainer>

                  {!isEmpty(fieldValues) &&
                    fields?.map((inputs, index) => {
                      const { id, name: fname, required, type, options, lines } = inputs;

                      const fid = id?.toString();
                      const disabled =
                        inputs?.name === INPUT_NAMES.email ||
                        inputs?.name === INPUT_NAMES.full_name;

                      if (type === INPUT_TYPES.CHECKBOX) {
                        return (
                          <ContentContainer
                            key={index?.toString()}
                            className="flex flex-col gap-1"
                            onClick={() => setSelectedInput(inputs)}>
                            <ContentContainer className="flex flex-row flex-nowrap items-center -ml-2.5">
                              <Checkbox
                                key={fid?.toString()}
                                name={fid}
                                color="orange"
                                checked={fieldValues[fid]}
                                iconProps={{ size: 'xs' }}
                                required={required}
                                className="p-1"
                                onChange={(e) => {
                                  setFieldValues({
                                    ...fieldValues,
                                    [e.target.name]: !fieldValues[fid]
                                  });
                                }}
                              />

                              <span
                                className={[
                                  fieldValues[fid]
                                    ? 'text-xs text-orange-400  font-bold uppercase'
                                    : 'text-xs font-bold uppercase text-kiiraBlue bg-[#E2EDFF]  px-4 py-2 rounded-lg'
                                ]}>
                                {fname}{' '}
                                {required ? <span className="text-red-500 text-xs">*</span> : null}
                              </span>
                            </ContentContainer>
                          </ContentContainer>
                        );
                      }

                      if (type === INPUT_TYPES.YESNO) {
                        return (
                          <ContentContainer
                            key={index?.toString()}
                            className="flex gap-1 mb-2"
                            onClick={() => setSelectedInput(inputs)}>
                            <ContentContainer className="flex-row gap-0.5">
                              {fname}{' '}
                              {required ? <span className="text-red-500 text-xs">*</span> : null}{' '}
                            </ContentContainer>
                            <ContentContainer className="flex flex-row flex-nowrap items-center">
                              <Radio
                                name={fid}
                                color="orange"
                                label="Yes"
                                value={true}
                                className="p-1"
                                onChange={(e) => {
                                  setFieldValues({
                                    ...fieldValues,
                                    [e.target.name]: true
                                  });
                                }}
                              />
                              <Radio
                                name={fid}
                                color="orange"
                                label="No"
                                value={false}
                                className="p-1"
                                onChange={(e) => {
                                  setFieldValues({
                                    ...fieldValues,
                                    [e.target.name]: false
                                  });
                                }}
                              />
                            </ContentContainer>
                          </ContentContainer>
                        );
                      }

                      if (type === INPUT_TYPES.DROPDOWN) {
                        return (
                          <ContentContainer
                            key={index?.toString()}
                            className="flex flex-col"
                            onClick={() => setSelectedInput(inputs)}>
                            <ContentContainer className="flex flex-row flex-nowrap items-center">
                              <Select
                                size="lg"
                                color="orange"
                                label={fname}
                                required={required}
                                className=""
                                labelProps={{
                                  className: 'overflow-hidden truncate'
                                }}
                                onChange={handleInputChange}
                                animate={{
                                  mount: { y: 0 },
                                  unmount: { y: 25 }
                                }}
                                selected={(element) =>
                                  element &&
                                  React.cloneElement(element, {
                                    className: 'flex items-center px-0 gap-2 pointer-events-none'
                                  })
                                }>
                                {!isEmpty(options) ? (
                                  options?.map((opt, i) => {
                                    return (
                                      <Option key={i?.toString()} name={fid} value={opt}>
                                        {opt}
                                      </Option>
                                    );
                                  })
                                ) : (
                                  <Option value=""></Option>
                                )}
                              </Select>
                            </ContentContainer>
                          </ContentContainer>
                        );
                      }

                      if (type === INPUT_TYPES.FILE) {
                        return (
                          <ContentContainer
                            key={index?.toString()}
                            className="flex flex-col gap-1"
                            onClick={() => setSelectedInput(inputs)}>
                            <ContentContainer className="flex flex-row flex-nowrap items-center -ml-2.5">
                              <Input
                                variant="static"
                                type="file"
                                name={fid}
                                required={required}
                                label={fname}
                                labelProps={{
                                  className: 'overflow-hidden truncate text-xs md:text-base'
                                }}
                                className="p-4 border-b-0"
                                onChange={handleInputChange}
                              />
                            </ContentContainer>
                          </ContentContainer>
                        );
                      }

                      if (type === INPUT_TYPES.CHECKBOXLIST) {
                        return (
                          <ContentContainer
                            key={index?.toString()}
                            className="flex flex-col gap-1 my-4"
                            onClick={() => setSelectedInput(inputs)}>
                            <ContentContainer className={['w-auto rounded-lg flex-row gap-0.5']}>
                              {fname}{' '}
                              {required ? <span className="text-red-500 text-xs">*</span> : null}
                            </ContentContainer>

                            <ContentContainer className="flex flex-col flex-nowrap -ml-2.5 max-h-[35vh] overflow-hidden overflow-y-scroll bg-white rounded ">
                              {options?.map((option, i) => {
                                return (
                                  <ContentContainer
                                    key={i?.toString()}
                                    className="flex flex-row flex-nowrap items-center mx-5">
                                    <Checkbox
                                      name={fid}
                                      color="orange"
                                      required={required}
                                      checked={fieldValues[fid] === option}
                                      iconProps={{ size: 'xs' }}
                                      labelProps={{ className: 'overflow-hidden' }}
                                      className=""
                                      onChange={(e) => {
                                        setFieldValues({
                                          ...fieldValues,
                                          [fid]: option
                                        });
                                      }}
                                    />
                                    <span className={['text-sm uppercase']}>{option}</span>
                                  </ContentContainer>
                                );
                              })}
                            </ContentContainer>
                          </ContentContainer>
                        );
                      }

                      return (
                        <ContentContainer
                          key={index?.toString()}
                          className="flex flex-col gap-1 mt-2"
                          onClick={() => setSelectedInput(inputs)}>
                          <div className="flex flex-col gap-5">
                            <Input
                              type="text"
                              variant="outlined"
                              disabled={disabled}
                              name={fid}
                              required={
                                inputs?.name === INPUT_NAMES.email ||
                                inputs?.name === INPUT_NAMES.full_name
                                  ? false
                                  : required
                              }
                              labelProps={{ className: 'overflow-hidden truncate text-xs' }}
                              label={fname}
                              value={
                                inputs?.name === INPUT_NAMES.email
                                  ? profile?.email
                                  : inputs?.name === INPUT_NAMES.full_name
                                  ? `${profile?.first_name} ${profile?.last_name}`
                                  : fieldValues[fid]
                              }
                              size="lg"
                              className="ring-transparent ring-0 "
                              onChange={handleInputChange}
                            />
                          </div>
                        </ContentContainer>
                      );
                    })}
                </ContentContainer>
              );
            })}
          </ContentContainer>
        </form>
      ) : null}

      {loadingForms ? (
        <ContentContainer className="flex h-full w-full min-h-[100px] items-center justify-center">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#005eff"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </ContentContainer>
      ) : null}

      {!loadingForms && !isEmpty(bookingFormError) ? (
        <Empty
          label={
            <AppTypography className="text-center text-red-800 w-full">
              <i className="fa fa-exclamation-triangle text-red-500" aria-hidden="true"></i> Error
              fetching booking forms <br />
              <span className="text-red-400 font-bold">{bookingFormError?.message}</span>
            </AppTypography>
          }
        />
      ) : null}
    </>
  );
};

export default DefaultFormInput;

DefaultFormInput.propTypes = {
  setFormResult: func,
  appointmentFormIDs: array,
  bookingFormError: object,
  formsData: array,
  loadingForms: bool,
  formValues: object
};

DefaultFormInput.defaultProps = {
  setFormResult: () => {},
  appointmentFormIDs: [],
  formsData: []
};
