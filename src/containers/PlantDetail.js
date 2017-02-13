
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import _ from 'lodash';
import Loading from './../components/Loading';
import ImageGallery from '../components/ImageGallery';
import HeroImage from '../containers/HeroImage';
import { SearchbarComponent } from '../containers/Searchbar';
import SuggestItems from '../containers/SuggestItems';

type PropsType = {
    Results: {
        getPlantFieldsList: any[];
        getPlantById: any;
    };
};


const PlantInformation = ({ Plant, fields = {} }) => (
    <div className="container">
        <HeroImage className="background-wrap">
            <SearchbarComponent />
        </HeroImage>
        {
            Plant ? (
                <div className="wrap">
                    <div className="category-name">
                        {
                            Plant.category.map(item => item.name).join(',')
                        }
                    </div>
                    <div className="plant-container">
                        <ImageGallery images={Plant.images} />
                        <div className="detail-wrap">
                            <h2>{Plant.name}</h2>
                            <p>
                                รหัส : {Plant.cuid || 'ไม่ระบุ'}
                            </p>
                            <div>
                                <div className="basic-field"><span>{fields.name}</span>{Plant.name} {Plant.localName} {Plant.otherName.join(',')}</div>
                                <div className="basic-field"><span>{fields.scientificName}</span>{Plant.scientificName}</div>
                                <div className="basic-field"><span>{fields.family}</span>{Plant.family}</div>
                                <div className="basic-field"><span>{fields.localName}</span>{Plant.localName}</div>
                                <div className="basic-field"><span>{fields.note}</span>{Plant.note || '-'}</div>
                            </div>
                            <div><span>{fields.displayLocation}</span> : {Plant.displayLocation ? Plant.displayLocation.join(',') : '-'} </div>
                            <div><span>{fields.slotNo}</span> : {Plant.slotNo || '-'} </div>
                            <div><span>{fields.blockNo}</span> : {Plant.blockNo || '-'} </div>
                        </div>
                    </div>
                    <div className='suggest-title' >{`อื่นๆในหมวดเดียวกัน`}</div>
                    <SuggestItems plant_id={Plant._id} category_id={Plant.category.map(item => item._id)} />
                </div>
            ) : null
        }
        <style jsx>
            {
                `
                .suggest-title {
                    font-weight: normal;
                    font-family: supermarketregular, Helvetica Neue,Helvetica,Arial,sans-serif;
                    color: #7B7B7B;
                    margin: 0;
                    font-size: 22px;
                    margin-bottom: 10px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #efefef;
                }
                .category-name {
                  font-family: supermarketregular, Helvetica Neue,Helvetica,Arial,sans-serif;
                  font-weight: normal;
                  font-size: 42px;
                  color: #808080;
                }
                h2 {
                  color: #007849;
                  font-family: supermarketregular, Helvetica Neue,Helvetica,Arial,sans-serif;
                  font-weight: normal;
                  font-size: 42px;
                  margin: 0;
                }
                .container {


                }
                .wrap {

                  max-width: 1024px;
                  margin: auto;
                  margin-top: 30px;
                  margin-bottom: 30px;
                }
                .plant-container {
                  justify-content: center;
                  display: flex;
                  padding: 10px;
                  border: 1px solid #efefef;
                  margin-bottom: 30px;
                }
                @media (max-width:750px) {
                  .plant-container {
                    flex-direction: column;
                    align-items: center;
                  }
                }
                .detail-wrap{
                  margin-left: 30px;
                  flex:0 1 auto;
                }
                .basic-field {
                    display: flex;
                    color: black;
                    padding-bottom: 8px;
                }
                .basic-field span{
                    flex: 0 0 130px;
                    display: block;
                    color: #808080;
                }
                `
            }
        </style>
    </div>
);


const PlantDetail = (props: PropsType) => (
    <div>
        {
            props.Plant.loading ? <Loading /> :
                <PlantInformation {...props} Plant={props.Plant.getPlantById} />
        }
    </div>
);


// connect to graphQL
const query = gql`
  query($id: String){
    getPlantFieldsList {
      label
      path
    }
    getPlantById(id: $id) {
      cuid
      _id
      name
      category {
          name
          _id
      }
      images {
        url
        width
        height
        public_id
      }
      localName
      otherName
      scientificName
      synonym
      family
      type
      locationName
      display
      recipe
      property
      localProperty
      collector_en
      collector_th
      minorBenefit
      anatomy
      habit
      altitude
      duplicateAmount
      blockNo
      toxicDetail
      adr
      note
      caution
      warning
      characteristic
      chem_structure
      prod_dev
      slotNo
      donor
    }
  }
`;

export default compose(
    graphql(query, {
        name: 'Plant',
        props: (props) => {
            // transform getPlantFieldsList
            props.fields = {};
            if (props.Plant.getPlantFieldsList) {

                _.forEach(props.Plant.getPlantFieldsList, item => props.fields[item.path] = item.label);
                // .reduce((o, k) => (o[k] = obj[key], o), {});
            }
            console.log(props);
            return props;
        },
        options: ({ plant_id }: { plant_id: string }) => {
            return ({
                variables: {
                    id: plant_id,
                },
            });
        },
    }),
)(PlantDetail);
