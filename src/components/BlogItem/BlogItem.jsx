import { bool, object } from 'prop-types';
import React from 'react';
import { AppTypography, ContentContainer } from '../shared/styledComponents';
import { Avatar, Button, Card, CardBody, CardHeader } from '@material-tailwind/react';
import { IMAGES } from 'src/data';
import { truncate } from 'src/utils/truncate';
import isEmpty from 'src/utils/isEmpty';
import { Mixpanel } from 'src/utils/mixpanelUtil';

const BlogItem = ({ item, loading }) => {
  let formattedItem = Object.entries(item).reduce((obj, [key, value]) => {
    const tempKey = key.split('-');
    const newKey = tempKey.join('_');
    obj[newKey || key] = value;
    return obj;
  }, {});

  return (
    <ContentContainer
      className={
        loading
          ? 'p-0 md:p-2 bg-kiiraBg2 rounded-2xl animate-pulse'
          : 'p-0 md:p-2 bg-kiiraBg2 rounded-2xl'
      }>
      <Card className="w-[235px] md:w-[256px] h-[400px] overflow-hidden shadow-none">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded-2xl rounded-b-none min-h-[150px]">
          <img
            src={formattedItem?.main_image?.url}
            alt={formattedItem?.main_image?.alt}
            style={{ background: formattedItem?.color }}
            loading="lazy"
            className="object-cover"
          />
        </CardHeader>
        <CardBody className="bg-kiiraBg2 p-2 h-full flex flex-col gap-2 justify-between">
          <ContentContainer className="gap-2">
            <AppTypography
              variant="h4"
              color="blue-gray"
              className="text-[#252539] text-xl font-semibold">
              {truncate(formattedItem?.name || '', 36)}
            </AppTypography>
            {!isEmpty(formattedItem?.post_summary) ? (
              <AppTypography
                variant="small"
                color="gray"
                className="font-normal text-[#93939A] text-[0.75rem] font-manrope leading-relaxed ">
                {truncate(formattedItem?.post_summary || '', 150)}
              </AppTypography>
            ) : null}
          </ContentContainer>
          <ContentContainer className="flex flex-col gap-2 bg-kiiraBg2 mt-auto">
            <div className="flex flex-row items-center space-x-3">
              <Avatar
                size="sm"
                variant="rounded"
                alt={formattedItem?.thumbnail_image?.alt}
                src={!loading ? formattedItem?.thumbnail_image?.url || IMAGES.Penguin : null}
                className="rounded-full bg-kiiraBg4"
              />

              <AppTypography className="font-normal text-kiiraDark text-sm">
                {formattedItem?.author}
              </AppTypography>
            </div>
          </ContentContainer>
          <ContentContainer className="flex flex-col gap-2 bg-kiiraBg2">
            <Button
              id="kiira_blog_item"
              disabled={loading}
              variant="text"
              className="flex flex-row items-center hover:bg-transparent p-0 py-2 w-auto"
              onClick={() => {
                setTimeout(() => {
                  Mixpanel.track('Blog item clicked', {
                    data: {
                      id: formattedItem?.id,
                      name: formattedItem?.name,
                      link: `https://www.kiira.io/blog-posts/${formattedItem?.slug}`
                    }
                  });
                }, 50);
                window.open(`https://www.kiira.io/blog-posts/${formattedItem?.slug}`, '_blank');
              }}>
              <AppTypography
                variant="small"
                className="font-normal text-kiiraBlue text-xs capitalize">
                Read more <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              </AppTypography>
            </Button>
          </ContentContainer>
        </CardBody>
      </Card>
    </ContentContainer>
  );
};

export default BlogItem;

BlogItem.propTypes = {
  item: object,
  loading: bool
};

BlogItem.defaultProps = {
  item: {},
  loading: false
};
