/* eslint-disable @typescript-eslint/no-explicit-any */
import { PixelStreaming } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.4'
import { useCallback, useRef } from 'react'
import { IBuildComponent } from '../../types/context-types';

export interface IEmitStreamUIInteraction {
  type?: 'Show_Component' | 'Show_PC',
  component_id: string,
}

function usePixelStreamContext(_current_build: IBuildComponent[]) {
  const pixelStreamRef = useRef<any>(null)

  function setPixelStream(_pixelStream: PixelStreaming) {
    console.log('Unreal Event: Set Stream Instance', { _pixelStream });

    pixelStreamRef.current = _pixelStream
  }

  const emitStreamSingleUIInteraction = useCallback(({ component_id }: IEmitStreamUIInteraction) => {
    if (pixelStreamRef.current) {
      pixelStreamRef.current.emitUIInteraction({
        Type: 'Show_Component',
        ComponentId: component_id,
      });
      const stringval = JSON.stringify({
        Type: 'Show_Component',
        ComponentId: component_id,
      });
      console.log(`Unreal Event: View Product (${component_id})`, { stringval });
    }
  }, []);

  function myHandleResponseFunction(data: any) {
    console.warn("Response received!");
    switch (data) {
      case "MyCustomEvent":
        // ... // handle one type of event
        break;
      case "AnotherEvent":
        // ... // handle another event
        break;
    }
  }

  const completePixelStreaming = useCallback((props: {
    _local_build?: IBuildComponent[] | null;
    type?: "add" | "remove";
  }) => {
    if (pixelStreamRef.current) {

      const _interaction_obj = {
        Type: 'Show_PC',
        FullPC: {
          Case: '',
          CPU: '',
          GPU: '',
          Cooler: '',
          Fans: '',
          PSU: '',
          Storage: '',
          RAM: '',
          Motherboard: '',
        },
      }
      const _pc_obj: Partial<(typeof _interaction_obj)['FullPC']> = {};

      (props?._local_build ? props._local_build : _current_build).forEach((d) => {
        switch (d.original_slug) {
          case 'case':
            _pc_obj.Case = d._id;
            break;

          case 'cpu':
            _pc_obj.CPU = d._id;
            break;

          case 'gpu':
            _pc_obj.GPU = d._id;
            break;

          case 'cooler':
            _pc_obj.Cooler = d._id;
            break;

          case 'fan':
            _pc_obj.Fans = d._id;
            break;

          case 'psu':
            _pc_obj.PSU = d._id;
            break;

          case 'storage':
            _pc_obj.Storage = d._id;
            break;

          case 'ram':
            _pc_obj.RAM = d._id;
            break;

          case 'motherboard':
            _pc_obj.Motherboard = d._id;
            break;

          default:
            break;
        }
      })

      _interaction_obj.FullPC = { ..._interaction_obj.FullPC, ..._pc_obj as (typeof _interaction_obj)['FullPC'] };
      pixelStreamRef.current.emitUIInteraction(_interaction_obj);
      pixelStreamRef.current.addResponseEventListener("handle_responses", myHandleResponseFunction);
      const stringval = JSON.stringify(_interaction_obj);
      console.log(`Unreal Event: ${props?.type === 'add' ? 'Add' : props?.type === 'remove' ? 'Remove' : ''}${props?.type === 'remove' ? ' from' : props?.type === 'add' ? ' to' : ''} Full PC Build`, { stringval });
    }
  }, [_current_build])

  // function resetAndStartStream() {

  // }

  function resetPixelStream() {
    console.log('Unreal Event: Reset Fired');
    pixelStreamRef.current?.disconnect();
    pixelStreamRef.current?.emitUIInteraction({
      Type: 'Reset_PC'
    });
    completePixelStreaming({ _local_build: [] });
    // pixelStreamRef.current = null;
  }

  return {
    pixelStreamRef: (pixelStreamRef as unknown) as React.MutableRefObject<PixelStreaming>,

    setPixelStream,
    resetPixelStream,
    completePixelStreaming,
    emitStreamSingleUIInteraction,
  }
}

export default usePixelStreamContext