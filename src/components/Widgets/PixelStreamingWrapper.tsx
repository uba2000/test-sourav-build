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
    type: 'Show_Component' | 'Show_PC',
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

    function emitSingleUIInteraction({ type, component_id }: IemitUIInteraction) {
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

    function sendPixelStreamingServer() {
        if (streamRef.current) {
            streamRef.current.emitUIInteraction({
                Type: 'Show_PC',
                FullPC: {
                    Case: '20240135',
                    CPU: '20240105',
                    GPU: '20240117',
                    Cooler: '20240122',
                    Fans: '20240124',
                    PSU: '20240120',
                    Storage: '20240111',
                    RAM: '20240131',
                    Motherboard: '20240127',
                },
            });
            const stringval = JSON.stringify({
                Type: 'Show_PC',
                FullPC: {
                    Case: '20240135',
                    CPU: '20240105',
                    GPU: '20240117',
                    Cooler: '20240122',
                    Fans: '20240124',
                    PSU: '20240120',
                    Storage: '20240111',
                    RAM: '20240131',
                    Motherboard: '20240127',
                },
            });
            console.log(stringval);
        }
    }

    return (
        <>
            <button className='block' onClick={() => emitSingleUIInteraction({
                type: 'Show_Component',
                component_id: '20240135'
            })}>Show Case Component (Icue500xBlack, 20240135)</button>
            <button className='block' onClick={() => emitSingleUIInteraction({
                type: 'Show_Component',
                component_id: '20240127'
            })}>Show Motherboard Component (Prime Z790-A, 20240127)</button>
            <button className='block' onClick={() => emitSingleUIInteraction({
                type: 'Show_Component',
                component_id: '20240131'
            })}>Show RAM Component (Dominator RGB 32gb (2x16gb) DDR5, 20240131)</button>
            <button className='block' onClick={() => emitSingleUIInteraction({
                type: 'Show_Component',
                component_id: '20240124'
            })}>Show Fans Component (AF120 RGB, 20240124)</button>
            <button className='block' onClick={() => emitSingleUIInteraction({
                type: 'Show_Component',
                component_id: '20240122'
            })}>Show Cooler Component (UX200 SE 120 mm, 20240122)</button>
            <button className='block' onClick={() => emitSingleUIInteraction({
                type: 'Show_Component',
                component_id: '20240120'
            })}>Show PSU Component (Toughpower GF A3 1050 Watt, 20240120)</button>
            <button className='block' onClick={() => emitSingleUIInteraction({
                type: 'Show_Component',
                component_id: '20240117'
            })}>Show GPU Component (Dual GeForce RTX 4060 Ti, 20240117)</button>
            <button className='block' onClick={() => emitSingleUIInteraction({
                type: 'Show_Component',
                component_id: '20240111'
            })}>Show Storage Component (870 QVO 1TB SATA, 20240111)</button>
            <button className='block' onClick={() => emitSingleUIInteraction({
                type: 'Show_Component',
                component_id: '20240105'
            })}>Show CPU Component (Core i9-14900KF, 20240105)</button>
            <button className='block' onClick={() => sendPixelStreamingServer()}>
                Send to pixel streaming server
            </button>
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