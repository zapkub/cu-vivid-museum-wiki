
import React from 'react';
import gql from 'graphql-tag';
import { propType } from 'graphql-anywhere';

const HeroImage = ({ heroImageURL, children, small }) => {
  let style = { };
  if (heroImageURL) {
    style = Object.assign(style, { backgroundImage: `url(${heroImageURL})`, backgroundSize: 'cover', backgroundPosition: 'center center' });
  }
  if (small) {
    style.height = 200;
  }
  return (
    <div className="background-wrap" style={style}>
      <div className="children-wrap">
        {children}
      </div>
      <style jsx>{`
                .children-wrap {

                }
                .background-wrap {
                  display:flex;
                  justify-content:center;
                  align-items: center;
                    height: 350px;
                    position: relative;
                    margin-top: -80px;
                    padding-top: 80px;
                    background-color: rgba(50,84,26,0.4);
                }
    `}</style>
    </div>
  );
};

// HeroImage.fragments = {
//   heroImage: gql`
//         fragment HeroImage on CloudinaryImage {
//             secure_url
//         }
//     `,
// };
// HeroImage.propTypes = {
//   heroImage: propType(HeroImage.fragments.heroImage),
// };
export default HeroImage;
