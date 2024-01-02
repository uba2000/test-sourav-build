import RatingStarIcon from '../../assets/product-rating-start.svg?react'
import RatingStarDisabledIcon from '../../assets/product-rating-start-disabled.svg?react'
import { Fragment } from 'react';
import clsx from 'clsx';

function StarRatingComponent({ size = 12, star_rating = 0 }: { size?: number; star_rating?: number }) {
  return (
    <div className="flex gap-[2px]">
      {[1, 2, 3, 4, 5].map((d) => (
        <Fragment key={d}>
          {d > star_rating ? (
            <RatingStarDisabledIcon className={clsx(`w-[${size}px] h-[${size}px] min-w-[${size}px] min-h-[${size}px]`)} />
          ) : (
            <RatingStarIcon className={clsx(`w-[${size}px] h-[${size}px] min-w-[${size}px] min-h-[${size}px]`)} />
          )}
        </Fragment>
      ))}
    </div>
  )
}

export default StarRatingComponent