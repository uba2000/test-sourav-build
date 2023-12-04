import Portal from '../Widgets/Portal'
import PolygonContainer from '../PolygonContainer/PolygonContainer'
import ImageFigure from '../ImageFigure'

import CircleCloseIcon from '../../assets/circle-close-icon.svg'
import useBuildPCContext from '../../lib/hooks/contextHooks/useBuildPCContext';

// interface IModal {
//   visible?: boolean;
// }

function Modal() {
  const { thankYouModalOpen, addToRetailerUsersCart } = useBuildPCContext();

  function closeModal() {
    addToRetailerUsersCart({ state: 'complete' })
  }

  return (
    thankYouModalOpen && (
      <Portal selector='#modal'>
        <div className="fixed top-0 left-0 h-screen w-screen backdrop-blur-[2px] z-50 bg-[rgba(0,0,0,0.41)] flex justify-center items-center">
          <div onClick={() => closeModal()} className="fixed inset-0 z-10 overflow-y-auto"></div>
          <PolygonContainer btr={false} bbl={false} borderActive className='z-50' defaultBorderBackground="#000864">
            <div className="text-center w-full md:max-w-[400px] max-w-[258px] px-3 py-1">
              <div className="flex justify-end">
                <button type='button' className="cursor-pointer" onClick={() => closeModal()}>
                  <ImageFigure icon={CircleCloseIcon} width={16} />
                </button>
              </div>
              
              <div className='pt-4 pb-8 px-4'>
                <h3 className="font-IntelOneDisplayBold md:text-h3 text-M-h3 mb-2">
                  Thank You
                </h3>
  
                <p className="font-IntelOneBodyTextRegular md:text-base text-sm">
                  Your components have been added to your cart. 
                </p>
              </div>
            </div>
          </PolygonContainer>
        </div>
      </Portal>
    )
  )
}

export default Modal