import { Button, Dialog, DialogBody } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { DoctorsCard, EmailForm, Empty, SearchInput } from 'src/components';
import { AppTypography, ContentContainer } from 'src/components/shared/styledComponents';
import { MainLayout } from 'src/layouts';
import { useAppointmentTypes, useDoctorsCalendars } from 'src/queries/queryHooks';
import isEmpty from 'src/utils/isEmpty';
import { searchFilter } from 'src/utils/searchFilter';
import { BookAppointment } from '..';

const Doctors = () => {
  const { data, isLoading } = useDoctorsCalendars();
  const doctors = data?.data?.calendars ?? [];

  const [searchText, setSearchText] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);

  useEffect(() => {
    if (isEmpty(doctors)) return;
    setFilteredDoctors(doctors);
  }, [doctors]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const handleSearch = (text) => {
    setSearchText(text);
    searchFilter(text, 'name', setSearchText, doctors, setFilteredDoctors);
  };

  const { data: appointmentTypes } = useAppointmentTypes();
  const appointment_types = appointmentTypes?.data?.appointment_types ?? [];
  const [docAppointmentType, setDocAppointmentType] = useState([]);

  const [selectedDoctor, setSelectedDoctor] = useState({});

  return (
    <MainLayout>
      <ContentContainer
        width="100%"
        height="100%"
        className="h-full min-h-[50vh] w-full  p-4 lg:px-10 lg:py-4 gap-4 overflow-hidden overflow-y-auto ">
        <ContentContainer className="flex flex-row w-full items-center justify-between flex-wrap xl:flex-nowrap gap-2">
          <ContentContainer className="w-full flex flex-row items-center gap-2 flex-wrap md:flex-nowrap">
            <AppTypography
              variant="small"
              className="text-kiiraText text-[0.6rem] uppercase font-medium">
              STATUS
            </AppTypography>
            <div className="relative h-8 min-w-[60px]">
              <select
                disabled={true}
                className="peer h-full w-full rounded-[7px] border border-[#E4E7F3] bg-kiiraBg2 px-2 py-2 font-sans text-[0.65rem] font-medium text-kiiraText outline outline-0 transition-all  placeholder-shown:border-kiiraText empty:!bg-red-500 focus:border focus:border-kiiraBlue focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                <option value="brazil" className="text-kiiraText text-xs">
                  Online
                </option>
                <option value="bucharest">Away</option>
                <option value="bucharest">Busy</option>
                <option value="bucharest">Unavailable</option>
                <option value="bucharest">11:00 - 17:00</option>
              </select>
            </div>
            <ContentContainer className="w-full lg:w-3/5">
              <SearchInput
                label="Find doctors by name or title"
                value={searchText}
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
              />
            </ContentContainer>
          </ContentContainer>
        </ContentContainer>
        <ContentContainer>
          <div className="grid grid-flow-row md:grid-flow-row-dense md:grid-cols-2 lg:grid-cols-4 grid-col-1 gap-4 ">
            {isLoading
              ? Array.apply(null, Array(8)).map((doctor, index) => {
                  return <DoctorsCard doctor={doctor} key={index.toString()} loading={true} />;
                })
              : null}

            {!isLoading
              ? filteredDoctors?.map((doctor, index) => {
                  return (
                    <DoctorsCard
                      doctor={doctor}
                      key={index.toString()}
                      loading={isLoading}
                      disabled={isLoading}
                      selected={true}
                      setSelected={(doc) => {
                        setSelectedDoctor(doc);
                        if (isEmpty(appointment_types)) return;
                        const filteredDocAppointment = appointment_types?.filter((elem) =>
                          elem?.calendarIDs?.find((id) => doc?.id === id)
                        );
                        setDocAppointmentType(filteredDocAppointment);
                        setOpen(true);
                      }}
                    />
                  );
                })
              : null}
          </div>
        </ContentContainer>

        {isEmpty(filteredDoctors) && !isLoading ? (
          <ContentContainer className="h-40 w-full">
            <Empty />
          </ContentContainer>
        ) : null}

        <Dialog
          open={open}
          handler={handleOpen}
          size="xxl"
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 }
          }}>
          <DialogBody className="min-h-[65vh] h-full p-0">
            <ContentContainer
              column
              width="100%"
              height="100%"
              margin="auto"
              padding="0"
              className="xl:max-w-screen-2xl lg:relative">
              <ContentContainer className="w-full p-2 text-center font-poppins flex-row items-center justify-center gap-2 flex-wrap">
                <Button
                  size="sm"
                  variant="text"
                  className="lg:absolute lg:left-4 max-w-max text-orange-900 hover:bg-gray-100 capitalize gap-1 inline-flex items-center"
                  onClick={() => {
                    setSelectedDoctor({});
                    setDocAppointmentType([]);
                    handleOpen();
                  }}>
                  <i className="fa fa-long-arrow-left" aria-hidden="true"></i>Go Back
                </Button>
                <ContentContainer className="py-2 text-center font-poppins flex-row items-center justify-center flex-wrap">
                  <AppTypography variant="h4" className="text-md text-kiiraText">
                    Book an appointment type with{' '}
                  </AppTypography>
                  <span className="max-w-max text-kiiraBlue p-0 pl-2 font-bold text-md">
                    {selectedDoctor?.name}
                  </span>
                </ContentContainer>
              </ContentContainer>
              {isEmpty(docAppointmentType) ? (
                <ContentContainer className="w-full gap-4 items-center justify-center p-4 overflow-hidden overflow-y-auto">
                  <AppTypography
                    variant="h6"
                    className="font-semibold text-sm text-orange-900 text-center">
                    No appointment available for {selectedDoctor?.name} at this time
                  </AppTypography>
                  <AppTypography
                    variant="small"
                    className="text-kiiraText font-semibold text-center">
                    Would you like to contact doctor via email instead?
                  </AppTypography>
                  <EmailForm contact={selectedDoctor} onSuccessCallback={handleOpen} />
                </ContentContainer>
              ) : (
                <BookAppointment
                  docAppointmentType={docAppointmentType}
                  appointedDoctor={selectedDoctor}
                />
              )}
            </ContentContainer>
          </DialogBody>
        </Dialog>
      </ContentContainer>
    </MainLayout>
  );
};

Doctors.propTypes = {};

export default Doctors;
