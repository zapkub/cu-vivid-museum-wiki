import React from 'react';
import gql from 'graphql-tag';
import { compose } from 'recompose';
import ImageGallery from 'react-image-gallery';
import { Label, List, Header, Segment } from 'semantic-ui-react';

const PlantDetailList = ({ name, scientificName, familyName }) => (
  <List divided size={'big'}>
    <List.Item>
      <Label color="purple" horizontal>{'ชื่อไทย'}</Label>
      { name }
    </List.Item>
    <List.Item>
      <Label horizontal>{'ชื่อวิทยาศาสตร์'}</Label>
      { scientificName }
    </List.Item>
    <List.Item>
      <Label horizontal>{'ชื่อวงศ์'}</Label>
      { familyName }
    </List.Item>
  </List>);

const MuseumDetail = ({ museumLocation, plant }) =>
(<div>
  <Header as="h1">{plant.name || 'ไม่ระบุ'}</Header>
  <PlantDetailList {...plant} />
  <List>
    <Label horizontal>{'พื้นที่จัดแสดง'}</Label>
    { museumLocation }
  </List>
</div>);
MuseumDetail.type = `
  _id
  plantId
  museumLocation
  thumbnailImage
  images {
    url
  }
  plant {
    _id
    scientificName
    familyName
    name
    category
  }
`;

const GardenDetail = ({ zone, plant }) =>
(<div>
  <Header as="h1">{plant.name || 'ไม่ระบุ'}</Header>
  <PlantDetailList {...plant} />
  <List>
    <Label horizontal>{'พื้นที่จัดแสดง'}</Label>
    { zone }
  </List>
</div>);
GardenDetail.type = `
  _id
  plantId
  images {
    url
  }
  plant {
    _id
    scientificName
    familyName
    name
    category
  }
  zone
  thumbnailImage
`;

const HerbariumDetail = ({ _id, plant, collector, displayLocation, collectedDate, discoverLocation, cuid }) =>
(<div>
  {'Herbarium'}
  <Header as="h1">{plant.name || 'ไม่ระบุ'}</Header>
  <PlantDetailList {...plant} />
  <List size={'big'}>
    <List.Item>
      <Label horizontal>{'เลขรหัส'}</Label>
      {cuid}
    </List.Item>
    <List.Item>
      <Label horizontal>{'พื้นที่จัดเก็บ'}</Label>
      {displayLocation}
    </List.Item>
    <List.Item>
      <Label horizontal>{'วันที่จัดเก็บ'}</Label>
      {collectedDate}
    </List.Item>
    <List.Item>
      <Label horizontal>{'ผู้จัดเก็บ'}</Label>
      {collector}
    </List.Item>
    <List.Item>
      <Label horizontal>{'สถานที่พบ'}</Label>
      {discoverLocation}
    </List.Item>
  </List>
</div>);
HerbariumDetail.type = `
  _id
  plantId
  plant {
    scientificName
    name
    familyName
  }
  images {
    url
  }
  collectedDate
  collector
  displayLocation
  discoverLocation
  cuid
`;

const PlantDetail = ({ plant, category }) => {
  if (!plant) return (<div>{'No data'}</div>);
  let DetailComponent;
  switch (category) {
    case 'herbarium':
      DetailComponent = HerbariumDetail;
      break;
    case 'garden':
      DetailComponent = GardenDetail;
      break;
    case 'museum':
      DetailComponent = MuseumDetail;
      break;
    default:
      DetailComponent = () => (<div />);
      break;
  }

  return (
    <div className="container">
      <div className="gallery-wrap">
        <ImageGallery
          showFullscreenButton={false}
          showNav={false}
          showPlayButton={false}
          items={plant.images.map(image => ({ original: image.url, thumbnail: 'http://placehold.it/100x100' }))}
        />
      </div>
      <div className="detail-wrap">
        <DetailComponent {...plant} />
      </div>
      <style jsx>{`
      .container {
        max-width: 1024px;
        margin: auto;
        display: flex;
      }
      .gallery-wrap {
        width: 320px;
        flex: 0 0 320px;
      }
      .detail-wrap {
        flex: 1 1 auto;
        padding: 15px;
      }
      `}</style>
      <style jsx global>{`
      .image-gallery-image {
        width: 320px;
        height: 320px;
        position:relative;
      }
      .image-gallery-image img {
        position:absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    `}</style>
    </div>);
};
PlantDetail.fragments = {
  museum: gql`
    fragment PlantDetail on Museum {
      ${MuseumDetail.type}
    }
  `,
  garden: gql`
  fragment PlantDetail on Garden {
    ${GardenDetail.type}
  }
`,
  herbarium: gql`
  fragment PlantDetail on Herbarium {
    ${HerbariumDetail.type}
  }
`,
};
export default PlantDetail;
