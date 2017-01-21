
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import _ from 'lodash';
import Loading from './../components/Loading';
import ImageGallery from '../components/ImageGallery';
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
        <SearchbarComponent />
        {
            Plant ? (
              <div className="wrap">
                <div className="plant-container">
                  <ImageGallery images={Plant.images}/>
                  <div className="detail-wrap">
                      <h2>{Plant.name}</h2>
                      <div>
                          <div className="basic-field"><span>{fields.name}</span> : {Plant.name} {Plant.localName} {Plant.otherName.join(',')}</div>
                          <div className="basic-field"><span>{fields.scientificName}</span> : {Plant.scientificName}</div>
                          <div className="basic-field"><span>{fields.family}</span> : {Plant.family}</div>
                          <div className="basic-field"><span>{fields.localName}</span> : {Plant.localName}</div>
                          <div className="basic-field"><span>{fields.note}</span> : {Plant.note || '-'}</div>
                      </div>
                      <div><span>{fields.locationName}</span> : {Plant.locationName || '-'} </div>
                      <div><span>{fields.slotNo}</span> : {Plant.slotNo || '-'} </div>
                      <div><span>{fields.blockNo}</span> : {Plant.blockNo || '-'} </div>
                  </div>
                </div>
                <div>
                    {`อื่นๆในหมวดเดียวกัน`}
                </div>
                <SuggestItems category_id="587e628d83eae93e3a5f5fb2"/>
            </div>
            ) : null
        }
        <style jsx>
            {
                `
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
                }
                .plant-container {
                  justify-content: center;
                  display: flex;
                }
                @media (max-width:750px) {
                  .plant-container {
                    flex-direction: column;
                    align-items: center;
                  }
                }
                .detail-wrap{
                  margin-left: 30px;
                }
                .basic-field {
                    display: flex;
                    color: black;
                }
                .basic-field span{
                    width: 130px;
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
