import CompatibilityIcon from '../../assets/compatible-check.svg?react'

function CompatibilityBadge() {
  return (
    <div className="flex gap-[3px] items-center md:justify-start justify-center">
      <CompatibilityIcon className='w-2 h-2' />
      <span className="font-IntelOneBodyTextMedium text-[11px] leading-[10px]">Compatible</span>
    </div>
  )
}

export default CompatibilityBadge