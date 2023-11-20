import ImageFigure from '../ImageFigure'
import CompatibilityIcon from '../../assets/compatible-check.svg'

function CompatibilityBadge() {
  return (
    <div className="flex gap-[3px] items-center md:justify-start justify-center">
      <ImageFigure icon={CompatibilityIcon} width={8} />
      <span className="font-IntelOneBodyTextMedium text-[11px] leading-[10px]">Compatible</span>
    </div>
  )
}

export default CompatibilityBadge