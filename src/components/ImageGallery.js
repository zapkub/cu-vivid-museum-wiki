// @flow
type Image = {
  url: string;
  width: number;
  height: number;
}
export default ({images} : {images: Image[]}) => (
    <div>
        {
          images.map( (image, i) => <div key={i}>{image.url}</div>)
        }
    </div>
)
