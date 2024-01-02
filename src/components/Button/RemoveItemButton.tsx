import clsx from 'clsx'
import Modal from '../Modal/Modal'
import { useState } from 'react'
import Button from './Button'

import RightArrow from '../../assets/right-arrow.svg?react'
import RemoveIcon from '../../assets/circle-close-icon-game-blue.svg'
import ImageFigure from '../ImageFigure'
import useBuildPCContext from '../../lib/hooks/contextHooks/useBuildPCContext'

interface IRemoveItemButton {
  onClick?: () => void;
  variant?: 'large' | 'small';
}

function RemoveItemButton({ onClick = () => { }, variant = 'large' }: IRemoveItemButton) {
  const { completePixelStreaming } = useBuildPCContext();

  const [isModalOpen, setIsModalOpen] = useState(false)

  function initiateClickEvent() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleOnClick() {
    onClick();
    handleCloseModal();
    // reset build model
    completePixelStreaming();
  }

  return (
    <>
      <Button
        variant='outline-game-blue'
        onClick={() => initiateClickEvent()}
        className={clsx(
          'flex gap-x-[6px] items-center relative z-30',
          { 'py-[6px] px-2': variant === 'large' },
          { 'py-1 px-2': variant === 'small' }
        )}
      >
        <span
          className={clsx(
            'font-IntelOneBodyTextMedium whitespace-nowrap',
            { 'text-sm': variant === 'large' },
            { 'text-xs': variant === 'small' }
          )}
        >
          Remove item
        </span>
        <ImageFigure icon={RemoveIcon} width={14} />
      </Button>

      <Modal
        visible={isModalOpen}
        onClose={() => handleCloseModal()}
        title='Remove this component?'
        description='Choosing “Remove” will remove this from your build. You may choose a different option, or add it back later.'
      >
        <div className="flex justify-center gap-4 pt-2">
          <Button
            variant='outline-game-blue'
            onClick={() => handleCloseModal()}
            className={clsx(
              'flex py-[6px] px-2 gap-x-[6px] items-center'
            )}
          >
            <span className='text-sm font-IntelOneBodyTextMedium'>Cancel</span>
            <ImageFigure icon={RemoveIcon} width={14} />
          </Button>

          <Button onClick={() => handleOnClick()} className="min-w-[103px] py-[6px] px-2">
            <div className="flex gap-2 items-center">
              <span className="text-intel-e-gray-s2 text-[15px] font-IntelOneBodyTextMedium leading-[15px]">Remove</span>
              <RightArrow className='w-3 h-3 text-black' />
            </div>
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default RemoveItemButton