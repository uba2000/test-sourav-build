
interface IImageFigure {
  icon: string;
  width?: number;
  height?: number;
  isContainerSize?: boolean;
}

function ImageFigure({ icon, width = 20, height, isContainerSize=false }: IImageFigure) {
  return (
    <figure style={{
      width: isContainerSize ? '100%' : `${width}px`,
      height: isContainerSize ? '100%' : `${height || width}px`,
    }}>
      <img src={icon} className="w-full h-full" alt="figure" />
    </figure>
  )
}

export default ImageFigure