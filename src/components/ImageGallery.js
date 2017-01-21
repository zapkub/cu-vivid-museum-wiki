// @flow
import ImageGallery from 'react-image-gallery';

type Image = {
  url: string;
  public_id: string;
  width: number;
  height: number;
}
export default ({images} : {images: Image[]}) => (
    <div className="container">
        <ImageGallery showFullscreenButton={false} showNav={false} showPlayButton={false} items={
          images.map( image => ({
            original: image.url.replace('upload/', `upload/c_fill,h_300,w_400/a_0/`),
            thumbnail: image.url.replace('upload/', `upload/c_fill,h_40,w_70/a_0/`),
          }))
        } />
        <style jsx>
          {
            `
              .container {
                border:#efefef 1px solid;
                width: 400px;
                padding: 10px;
              }
            `
          }
        </style>
    </div>
)
