import React from 'react';
import gql from 'graphql-tag';
import moment from 'moment';
import ImageGallery from 'react-image-gallery';
import Link from 'next/link';
import Router from 'next/router';
import { Label, List, Header, Divider } from 'semantic-ui-react';
import SearchMore from './SearchMore';

const PlantDetailList = ({ name, scientificName, familyName }) => (
  <List size={'big'}>
    <List.Item>
      <Label horizontal>{'ชื่อไทย'}</Label>
      { name }
    </List.Item>
    <List.Item >
      <Label horizontal>{'ชื่อวิทยาศาสตร์'}</Label>
      <span style={{ fontStyle: 'italic', textTransform: 'capitalize' }}>{ scientificName }</span>
    </List.Item>
    <List.Item>
      <Label horizontal>{'ชื่อวงศ์'}</Label>
      { familyName }
    </List.Item>
  </List>);

const MuseumDetail = ({ museumLocation, plant }) =>
(<div>
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
  images {
    url
  }
  plant {
    _id
    scientificName
    familyName
    name
  }
`;

const GardenDetail = ({ zone, plant }) =>
(<div>

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
  }
  zone
`;

const HerbariumDetail = ({ plant, collector, displayLocation, collectedDate, discoverLocation, cuid }) =>
(<div>
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
      {moment(collectedDate).format('dddd, MMMM Do YYYY')}
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
    _id
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
        {
            plant.images.length > 0 ? <ImageGallery
              showFullscreenButton={false}
              showNav={false}
              showPlayButton={false}
              items={plant.images.map(image => ({ original: image.url, thumbnail: image.url }))}
            /> : <div className="no-image">{'ไม่มีรูปภาพ'}</div>
        }

      </div>
      <div className="detail-wrap">
        <Header style={{ color: 'rgb(77, 135, 109)' }} as="h1">{plant.plant.name || 'ไม่ระบุ'}</Header>
        <DetailComponent {...plant} />

        <Divider />
        <SearchMore category={category} text={plant.plant.scientificName} />
        <div style={{ textAlign: 'right', color: 'grey', fontSize: 10 }}>
          {'ข้อมูลผิดพลาดหรือเปล่า,'}
          <Link href={`/report?url=${encodeURIComponent(Router.router.as)}`}>
            <a>{'โปรดบอกเรา'}</a>
          </Link>
        </div>
      </div>
      <style jsx>{`
      .container {
        max-width: 1024px;
        margin: auto;
        padding: 20px;
        box-sizing: border-box;
        display: flex;
      }
      @media screen and (max-width: 670px){
        .container{
          flex-direction: column;
          align-items: center;
        }
      }
      .no-image {
        width: 320px;
        height: 320px;
        background: #f9f9f9;
        color: #c9c9c9;
        display: flex;
        justify-content: center;
        align-items: center;
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
      _id
      ${MuseumDetail.type}
    }
  `,
  garden: gql`
  fragment PlantDetail on Garden {
    _id
    ${GardenDetail.type}
  }
`,
  herbarium: gql`
  fragment PlantDetail on Herbarium {
    _id
    ${HerbariumDetail.type}
  }
`,
};
export default PlantDetail;
