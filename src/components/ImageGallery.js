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
        {
          images.length ? <ImageGallery showFullscreenButton={false} showNav={false} showPlayButton={false} items={
          images.map( image => ({
            original: image.url.replace('upload/', `upload/c_fill,h_300,w_400/a_0/`),
            thumbnail: image.url.replace('upload/', `upload/c_fill,h_40,w_70/a_0/`),
          }))
          } /> : <div className="placeholder" >{`ไม่มีภาพ`}</div>
        }

        <style jsx>
          {
            `
              .container {
                border:#efefef 1px solid;
                width: 400px;
                padding: 10px;
                flex: 0 0 400px;
              }
              .placeholder {
                pointer-events: none;
                flex:1 0 100%;
                height: 100%;
                max-height: 300px;
                background: #ccc;
                color: #979797;
                display: flex;
                justify-content: center;
                align-items: center;
              }
            `
          }
        </style>
    </div>
)
