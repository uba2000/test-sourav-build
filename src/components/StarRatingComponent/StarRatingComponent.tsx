import ImageFigure from '../ImageFigure'

import RatingStarIcon from '../../assets/product-rating-start.svg'
import RatingStarDisabledIcon from '../../assets/product-rating-start-disabled.svg'
import { Fragment } from 'react';

function StarRatingComponent({ size = 12, star_rating = 0 }: { size?: number; star_rating?: number}) {
  return (
    <div className="flex gap-[2px]">
      {[1, 2, 3, 4, 5].map((d) => (
        <Fragment key={d}>
          <ImageFigure icon={d >= star_rating ? RatingStarDisabledIcon : RatingStarIcon} width={size} />
        </Fragment>
      ))}
    </div>
  )
}

export default StarRatingComponent