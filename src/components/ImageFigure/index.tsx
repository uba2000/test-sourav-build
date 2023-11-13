
interface IImageFigure {
  icon: string;
  width?: number;
  height?: number;
}

function ImageFigure({ icon, width = 20, height }: IImageFigure) {
  return (
    <figure style={{
      width: `${width}px`,
      height: `${height || width}px`,
    }}>
      <img src={icon} className="w-full h-full" alt="figure" />
    </figure>
  )
}

export default ImageFigure