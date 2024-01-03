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
    console.log({ _pixelStream });

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
      console.log(stringval);
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

  const completePixelStreaming = useCallback(() => {
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

      _current_build.forEach((d) => {
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
      console.log(stringval);
    }
  }, [_current_build])

  function resetPixelStream() {
    pixelStreamRef.current?.disconnect();
    pixelStreamRef.current = null;
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