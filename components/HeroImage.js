
import React from 'react';

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
                  position: relative;
                  z-index: 2;
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
                .background-wrap:after {
                  content: " ";
                  width: 100%;
                  height: 100%;
                  top:0;
                  left:0;
                  position: absolute;
                  z-index: 0;
                  background-color: rgba(50,84,26,0.4);
                }
                @media screen and (max-width: 670px) {
                  .background-wrap{
                    margin-top: -90px;
                    padding-top: 90px;
                  }
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
