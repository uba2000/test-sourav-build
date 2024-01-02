import Button from '../../components/Button/Button'
import useBuildPCContext from '../../lib/hooks/contextHooks/useBuildPCContext'

import RightArrow from "../../assets/right-arrow.svg?react"
import CartIcon from "../../assets/cart-gray.svg?react"

function ResetSession() {
  const {
    resetApp
  } = useBuildPCContext()

  return (
    <div className='w-full h-full flex-grow flex justify-center items-center'>
      <div className="md:max-w-[450px] max-w-[275px] text-center">
        <div className="relative p-[10px] mb-2 max-w-fit mx-auto">
          <CartIcon className='w-[64px] h-[64px]' />
          <div className="absolute bg-gaming-cobalt rounded-full w-5 h-5 flex justify-center items-center top-4 right-4">
            <span className='text-sm'>9</span>
          </div>
        </div>

        <h2 className='md:text-M-h2 text-xs font-IntelOneBodyTextMedium mb-2'>
          All components are added to the retailer’s online cart.
        </h2>

        <h2 className='md:text-h2 text-h3 font-IntelOneDisplayMedium mb-7'>
          Start a new session on the
          gaming builder?
        </h2>

        <Button onClick={() => resetApp()}>
          <div className="flex gap-x-[10px] py-[10px] px-[19px] items-center">
            <span className='font-IntelOneBodyTextMedium'>Start new session</span>
            <RightArrow className='w-[15px] h-[15px]' />
          </div>
        </Button>
      </div>
    </div>
  )
}

export default ResetSession