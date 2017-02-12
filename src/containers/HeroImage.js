// @flow
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import _ from 'lodash';

type HeroImagePropsType = {
    HeroImageURL: any;
    children: any;
}
const HeroImage = (props: HeroImagePropsType) => {
    const { HeroImageURL, children } = props;
    console.log(props);
    return (
        <div className="background-wrap" style={HeroImageURL ? { backgroundImage: `url())`, backgroundPosition: 'cover', backgroundOrigin: 'center center' } : null}>
            {children}
            <style jsx>
                {
                    `
                .background-wrap {
                    margin-top: -80px;
                    padding-top: 80px;
                    background-color: rgba(50,84,26,0.4);
                }
            `
                }
            </style>
        </div>
    );
}


const query = gql`
   query {
        queryHeroImages(amount: 1) {
            name
            image {
                url
            }
        }
   } 
`;

export default compose(
    graphql(query, {
        props: ({data: {loading, queryHeroImages}}) => {
            if (!loading) {
                return {
                    HeroImageURL: queryHeroImages.length > 0 ? queryHeroImages[0].image.url : null,
                };
            } else {
                return { loading }
            }
        },
    }),
)(HeroImage);
