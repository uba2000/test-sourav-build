/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty */
// Copyright Epic Games, Inc. All Rights Reserved.

import { useEffect, useRef, useState } from 'react';
import {
    Config,
    AllSettings,
    PixelStreaming
} from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.4';

export interface PixelStreamingWrapperProps {
    initialSettings?: Partial<AllSettings>;
}

interface IemitUIInteraction {
    type: 'Show_Component',
    component_id: string,
}

export const PixelStreamingWrapper = ({
    initialSettings
}: PixelStreamingWrapperProps) => {
    // A reference to parent div element that the Pixel Streaming library attaches into:
    const videoParent = useRef<HTMLDivElement>(null);

    const streamRef = useRef<any>(null)

    // Pixel streaming library instance is stored into this state variable after initialization:
    const [pixelStreaming, setPixelStreaming] = useState<PixelStreaming>();

    // A boolean state variable that determines if the Click to play overlay is shown:
    const [clickToPlayVisible, setClickToPlayVisible] = useState(false);

    // Run on component mount:
    useEffect(() => {
        if (videoParent.current) {
            // Attach Pixel Streaming library to videoParent element:
            const config = new Config({ initialSettings, useUrlParams: true, });
            const streaming = new PixelStreaming(config, {
                videoElementParent: videoParent.current
            });

            // register a playStreamRejected handler to show Click to play overlay if needed:
            streaming.addEventListener('playStreamRejected', () => {
                setClickToPlayVisible(true);
            });

            // Save the library instance into component state so that it can be accessed later:
            setPixelStreaming(streaming);
            streamRef.current = streaming;

            // Clean up on component unmount:
            return () => {
                try {
                    streaming.disconnect();
                } catch { }
            };
        }
    }, []);

    function emitUIInteraction({ type, component_id }: IemitUIInteraction) {
        if (streamRef.current) {
            streamRef.current.emitUIInteraction({
                Type: type,
                ComponentId: component_id,
            });
            const stringval = JSON.stringify({
                Type: type,
                ComponentId: component_id,
            });
            console.log(stringval);
        }
    }

    return (
        <>
            <button onClick={() => emitUIInteraction({
                type: 'Show_Component',
                component_id: '20240135'
            })}>Show Case Component</button>
            <div
                style={{
                    width: '100%',
                    height: '100vh',
                    position: 'relative'
                }}
            >
                <div
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                    ref={videoParent}
                />
                {clickToPlayVisible && (
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                        onClick={() => {
                            pixelStreaming?.play();
                            setClickToPlayVisible(false);
                        }}
                    >
                        <div>Click to play</div>
                    </div>
                )}
            </div>
        </>
    );
};
