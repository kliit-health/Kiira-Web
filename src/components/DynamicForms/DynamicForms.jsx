import React, { useState } from 'react';
import { useBookingForms } from 'src/queries/queryHooks';
import { ThreeDots } from 'react-loader-spinner';
import isEmpty from 'src/utils/isEmpty';
import { AppTypography, ContentContainer } from '../shared/styledComponents';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Checkbox,
  Collapse,
  Input
} from '@material-tailwind/react';
import { truncate } from 'src/utils/truncate';
import { useForm } from 'react-hook-form';

const DynamicForms = ({ appointmentFormIDs, setFieldValues }) => {
  const { data: fData, isLoading: loadingForms, error } = useBookingForms();
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((cur) => !cur);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const formsData = fData?.data.forms;
  const [formValues, setFormValues] = useState([]);
  console.log('\n 🚀 ~ file: DynamicForms.jsx:23 ~ formValues:', [...new Set(formValues)]);

  const filteredFormData = formsData?.filter((elem) =>
    appointmentFormIDs?.find((id) => elem.id === id)
  );

  const handleInputChange = (event, data) => {
    console.log('\n 🚀 ~ file: DynamicForms.jsx:38 ~ handleInputChange ~ data:', data);
    event?.preventDefault();
    const { id } = data;
    let newArray = [];

    console.log(
      '\n 🚀 ~ file: DynamicForms.jsx:30 ~ handleInputChange ~ event:',
      event?.target?.value
    );

    if (data.type === 'checkbox') {
      formValues[id] = { id: id, value: event?.target?.value };
      newArray.push(formValues[id]);
      setFormValues([...new Set(newArray)]);
      return;
    }

    newArray.push({ id: id, value: event?.target?.value });
    setFormValues([...new Set(newArray)]);
  };

  const customAnimation = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 }
  };

  return (
    <>
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

      {!isEmpty(filteredFormData) ? (
        <form onSubmit={handleSubmit(handleInputChange)}>
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
                        <Accordion open={open} animate={customAnimation}>
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

                  {fields?.map((inputs, index) => {
                    const { id: fid, name: fname, required, type, options, lines } = inputs;
                    const val = formValues.filter((val) => val.id === fid);
                    console.log('\n 🚀 ~ file: DynamicForms.jsx:123 ~ fields?.map ~:', val[0]?.value);
                    // if (isEmpty(val)) return;

                    if (type === 'checkbox') {
                      return (
                        <ContentContainer key={index?.toString()} className="flex flex-col gap-1">
                          <ContentContainer className="flex flex-row flex-nowrap items-center -ml-2.5 -mt-2.5">
                            <Checkbox
                              name={fid}
                              value={val[0]?.value || false}
                              color="orange"
                              iconProps={{ size: 'xs' }}
                              labelProps={{ className: 'py-0.5 rounded' }}
                              checked={val[0]?.value || false}
                              className="p-1"
                              required={required}
                              onChange={(event) => handleInputChange(event, inputs)}
                            />
                            <span
                              className={[
                                false
                                  ? 'text-xs text-orange-400  font-bold uppercase'
                                  : 'text-xs font-bold uppercase text-kiiraBlue bg-[#E2EDFF]  px-4 py-2 rounded-lg'
                              ]}>
                              {fname}
                            </span>
                          </ContentContainer>
                        </ContentContainer>
                      );
                    }

                    return (
                      <ContentContainer key={index?.toString()} className="flex flex-col gap-1">
                        <div className="flex flex-col gap-5">
                          <Input
                            variant="outlined"
                            autoFocus
                            // placeholder={fname}
                            label={fname}
                            size="lg"
                            className="ring-transparent ring-0"
                            onChange={(event) => handleInputChange(event, inputs)}
                            error={!isEmpty(errors[fid]?.message)}
                          />
                          {errors[fid]?.message && (
                            <ContentContainer className="text-red-500 font-medium text-xs -mt-4 mb-2">
                              {errors[fid]?.message}
                            </ContentContainer>
                          )}
                        </div>
                        {/* <Input type={type} id={id} name={id} onChange={handleInputChange} /> */}
                      </ContentContainer>
                    );
                  })}
                </ContentContainer>
              );
            })}
            <button type="submit">Submit</button>
          </ContentContainer>
        </form>
      ) : null}
    </>
  );
};

export default DynamicForms;
