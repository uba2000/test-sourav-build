import ImageFigure from '../ImageFigure'

import RatingStarIcon from '../../assets/product-rating-start.svg'

function StarRatingComponent({size=12}: {size?: number}) {
  return (
    <div className="flex gap-[2px]">
      <ImageFigure icon={RatingStarIcon} width={size} />
      <ImageFigure icon={RatingStarIcon} width={size} />
      <ImageFigure icon={RatingStarIcon} width={size} />
      <ImageFigure icon={RatingStarIcon} width={size} />
      <ImageFigure icon={RatingStarIcon} width={size} />
    </div>
  )
}

export default StarRatingComponent