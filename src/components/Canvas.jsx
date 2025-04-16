import React, { useRef, useState } from "react";
import { Stage, Layer, Circle } from "react-konva";

const ZoomableStage = () => {
    const stageRef = useRef();
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleWheel = (e) => {
        e.evt.preventDefault();
        const scaleBy = 1.05;
        const stage = stageRef.current;
        const oldScale = stage.scaleX();
        const pointer = stage.getPointerPosition();

        const mousePointTo = {
            x: (pointer.x - stage.x()) / oldScale,
            y: (pointer.y - stage.y()) / oldScale,
        };

        const direction = e.evt.deltaY > 0 ? -1 : 1;
        const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

        setScale(newScale);
        setPosition({
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale,
        });
    };

    return (
        <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            onWheel={handleWheel}
            draggable
            scaleX={scale}
            scaleY={scale}
            x={position.x}
            y={position.y}
            ref={stageRef}
            style={{ background: "#f0f0f0" }}
        >
            <Layer>
                <Circle
                    x={90}
                    y={150}
                    radius={60}
                    fill="skyblue"
                    shadowBlur={10}
                />
            </Layer>
        </Stage>
    );
};

export default ZoomableStage;
