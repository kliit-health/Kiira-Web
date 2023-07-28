import {
  Button,
  Card,
  Dialog,
  DialogBody,
  IconButton,
  Popover,
  PopoverContent,
  PopoverHandler,
  Radio
} from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { AppTypography, ContentContainer } from '../shared/styledComponents';
import { AddButton, PaymentCard } from '..';
import { useLocalStore } from 'src/store';
import { Toast } from 'src/utils';
import isEmpty from 'src/utils/isEmpty';
import { useDeleteUserCard, useViewSavedCards } from 'src/queries/queryHooks';
import { ThreeDots } from 'react-loader-spinner';
import KEYS from 'src/queries/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { ROUTES } from 'src/routes/Paths';

const SavedCards = () => {
  const location = useLocation();
  const { pathname } = location;
  const queryClient = useQueryClient();
  const { data: savedCardData, isLoading } = useViewSavedCards();
  const { mutate, isLoading: deleteCardLoading } = useDeleteUserCard();
  const savedCards = savedCardData?.data?.user_card;

  const selectedPlan = useLocalStore((state) => state.storedData);
  const setSelectedPlan = useLocalStore((state) => state.setStoredData);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    setSelectedPlan({});
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  const handleDeleteSavedCards = () => {
    mutate(
      {},
      {
        onSuccess: (response) => {
          queryClient.invalidateQueries({ queryKey: [KEYS.SAVED_CARDS] });
          Toast.fire({
            icon: 'success',
            title: `Payment Card removed successfully`
          });
        },
        onError: (error) => {
          console.log(
            '\n 🚀 ~ file: Subscription.jsx:69 ~ handleCancelSubscription ~ error:',
            error
          );
          Toast.fire({
            icon: 'error',
            title: error.response?.data?.message
          });
        }
      }
    );
  };
  return (
    <>
      <Card className="flex flex-col gap-2 bg-kiiraBg2 shadow-none p-4 rounded-lg">
        {!isEmpty(savedCards?.card_last_four_digits) ? (
          <ContentContainer
            className={
              isLoading
                ? 'animate-pulse rounded-2xl bg-kiiraBlue p-1 md:p-5 flex flex-row items-center justify-between gap-1 flex-wrap hover:opacity-90 hover:cursor-pointer'
                : 'rounded-2xl bg-kiiraBlue p-1 md:p-5 flex flex-row items-center justify-between gap-1 flex-wrap-reverse  hover:opacity-95 hover:cursor-pointer'
            }>
            <ContentContainer className="flex flex-row flex-nowrap gap-5 items-center">
              <ContentContainer className="flex flex-row items-center justify-center lg:p-0.5 bg-kiiraBlue p-1 md:h-8 md:w-8 rounded-full">
                <i className="fa-solid fa-credit-card text-white text-2xl"></i>
              </ContentContainer>
              <AppTypography
                variant="small"
                className="text-sm md:text-base text-white font-medium text-right">
                **** **** **** {savedCards?.card_last_four_digits}
              </AppTypography>
            </ContentContainer>

            <ContentContainer className="flex flex-row flex-nowrap gap-0.5 items-center">
              <Popover
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 }
                }}>
                <PopoverHandler>
                  <IconButton
                    variant="outlined"
                    className="font-bold text-white text-[16px] rounded-full lowercase p-1 border border-white h-4 w-4 font-montserrat ">
                    <i className="fa-solid fa-ban text-gray-100"></i>
                  </IconButton>
                </PopoverHandler>
                <PopoverContent className="max-w-[90vw]">
                  <ContentContainer className="items-center gap-1 ">
                    <AppTypography variant="small" className="text-kiiraBlackishGreen font-medium">
                      Do you wish to remove payment card <br />
                      <span className="text-red-500 font-bold font-manrope ">
                        **** **** **** {savedCards?.card_last_four_digits}
                      </span>{' '}
                      from your profile?
                    </AppTypography>{' '}
                    <Button
                      onClick={handleDeleteSavedCards}
                      size="sm"
                      variant="outlined"
                      className="text-sm text-red-500 font-poppins border border-red-500 font-medium bg-transparent hover:shadow-none hover:bg-transparent shadow-none ring-transparent capitalize p-0.5 px-2">
                      Continue
                    </Button>
                  </ContentContainer>
                </PopoverContent>
              </Popover>
            </ContentContainer>
          </ContentContainer>
        ) : null}

        <AddButton
          label="Add a new card"
          onAddClick={() => {
            isEmpty(selectedPlan) && pathname === ROUTES?.SIGINUP_SUBSCRIPTION
              ? Toast.fire({
                  icon: 'warning',
                  title: 'Please select a subscription plan to proceed...'
                })
              : handleOpen();
          }}
        />
      </Card>
      <Dialog
        open={open}
        // handler={handleOpen}
        // dismiss={() => setOpen(true)}
        size={
          windowSize?.innerWidth < 346
            ? 'xxl'
            : windowSize?.innerWidth > 345 && windowSize?.innerWidth < 1024
            ? 'xl'
            : 'sm'
        }
        className="w-full md:w-3/4"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 }
        }}>
        <DialogBody className="overflow-hidden overflow-y-auto min-w-full ">
          <PaymentCard
            dismissHandler={() => {
              handleOpen();
              setSelectedPlan({});
            }}
          />
        </DialogBody>
      </Dialog>
      <Dialog open={deleteCardLoading} size="sm" className="bg-transparent">
        <ContentContainer className="flex h-full w-full bg-white rounded-md  items-center justify-center">
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
          <AppTypography
            variant="small"
            className="text-sm text-kiiraBlackishGreen font-poppins w-full text-center mb-2 font-semibold px-5">
            Removing payment card from profile...
          </AppTypography>
        </ContentContainer>
      </Dialog>
    </>
  );
};

export default SavedCards;
