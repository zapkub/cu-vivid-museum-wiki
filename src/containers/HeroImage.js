// @flow
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import _ from 'lodash';
import React from 'react';

type HeroImagePropsType = {
    HeroImageURL: any;
    children: any;
}
const HeroImage = (props: HeroImagePropsType) => {
    const { HeroImageURL, children, loading } = props;
    const style = { backgroundImage: `url(${HeroImageURL})`, backgroundSize: 'cover', backgroundPosition: 'center center' };
    return (
        <div className="background-wrap" style={HeroImageURL ? style : null}>
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
};



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
            if (loading) {
                return {
                    loading,
                }
            }
            return {
                loading,
                HeroImageURL: queryHeroImages.length > 0 ? queryHeroImages[0].image.url : null,
            };
        },
    }),
)(HeroImage);
