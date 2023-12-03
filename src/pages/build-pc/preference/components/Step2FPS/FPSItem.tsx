import clsx from 'clsx';
import { useCallback, useEffect, useRef } from 'react';
import type { IFPSTypesItem } from '../../../../../lib/types/context-types';
import useFPSItemDisability from '../../../../../lib/hooks/useFPSItemDisability';

interface IFPSItem {
  updateCurrentTime: (_currentTime: number) => void;
  selectedFPS: string | null;
  d: IFPSTypesItem;
  currentVideoTime: number;
  selectFPS: (_id: string, index: number) => void;
  index: number;
}

function FPSItem({ selectedFPS, d, currentVideoTime, updateCurrentTime, selectFPS, index }: IFPSItem) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { isDisabled } = useFPSItemDisability(d);

  const _updateCurrentTime = useCallback(() => {
    if (videoRef.current) {
      updateCurrentTime(videoRef.current.currentTime);
    }
  }, [videoRef, updateCurrentTime])

  useEffect(() => {
    if (videoRef.current) {
      if (selectedFPS === d._id) {
        videoRef.current.currentTime = currentVideoTime;
        videoRef.current?.play();
      } else {
        videoRef.current?.pause();
        videoRef.current.currentTime = 0;
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFPS, videoRef, d._id]);

  useEffect(() => {
    if (videoRef.current && selectedFPS === d._id) { 
      videoRef.current.addEventListener('timeupdate', _updateCurrentTime);
    }

    return () => {
      if (videoRef.current && selectedFPS === d._id) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        videoRef.current.removeEventListener('timeupdate', _updateCurrentTime);
      }
    };
  }, [videoRef, _updateCurrentTime, selectedFPS, d._id])

  return (
    <div className="flex flex-col gap-y-[30px] items-center overflow-hidden">
      <div
        onClick={() => !isDisabled && selectFPS(d._id, index)}
        className={clsx(
          "w-full md:min-h-[196px] cursor-pointer max-w-full relative ease-in-out",
          {
            "scale-110": selectedFPS && selectedFPS === d._id,
            "scale-90": selectedFPS && selectedFPS !== d._id,
            "opacity-20": isDisabled,
          }
        )}
      >
        <div
          className={clsx(
            "absolute top-0 left-0 w-full h-full",
            {
              "block bg-[rgba(0,0,0,0.2)]": (selectedFPS && selectedFPS !== d._id) || isDisabled
            }
          )}
        />
        <video ref={videoRef} poster={d.thumbnail} className='w-full h-full' controls={false} loop>
          <source src={d.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )
}

export default FPSItem