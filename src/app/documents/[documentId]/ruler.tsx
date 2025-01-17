import { useRef, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';

import { editorMargin, editorRulerMarkers, editorRulerMarkersMargin, editorWidth } from '@/config/editor';

const markers = Array.from({ length: editorRulerMarkers }, (_, i) => i);

export const Ruler = () => {
  const rulerRef = useRef<HTMLDivElement>(null);

  const [leftMargin, setLeftMargin] = useState(editorMargin);
  const [rightMargin, setRightMargin] = useState(editorMargin);

  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);

  const handleLeftMouseDown = () => {
    setIsDraggingLeft(true);
  };

  const handleRightMouseDown = () => {
    setIsDraggingRight(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
      const container = rulerRef.current.querySelector('#ruler-container');

      if (container) {
        const containerRect = container.getBoundingClientRect();
        const relativeX = e.clientX - containerRect.left;
        const rawPosition = Math.max(0, Math.min(editorWidth, relativeX));

        if (isDraggingLeft) {
          const maxLeftPosition = editorWidth - rightMargin - editorRulerMarkersMargin;
          const newLeftPosition = Math.min(rawPosition, maxLeftPosition);

          // TODO: Make collaborative
          setLeftMargin(newLeftPosition);
        } else if (isDraggingRight) {
          const maxRightPosition = editorWidth - (leftMargin + editorRulerMarkersMargin);
          const newRightPosition = Math.max(editorWidth - rawPosition, 0);
          const constrainedRightPosition = Math.min(newRightPosition, maxRightPosition);

          setRightMargin(constrainedRightPosition);
        }
      }
    }
  };

  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  };

  const handleLeftDoubleClick = () => {
    setLeftMargin(editorMargin);
  };

  const handleRightDoubleClick = () => {
    setRightMargin(editorMargin);
  };

  return (
    <div
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="h-6 mx-auto border-b border-gray-300 flex items-end relative select-none print:hidden"
      style={{
        width: editorWidth,
      }}
    >
      <div id="ruler-container" className="size-full relative">
        <Maker
          position={leftMargin}
          isLeft
          isDragging={isDraggingLeft}
          onMouseDown={handleLeftMouseDown}
          onDoubleClick={handleLeftDoubleClick}
        />
        <Maker
          position={rightMargin}
          isLeft={false}
          isDragging={isDraggingRight}
          onMouseDown={handleRightMouseDown}
          onDoubleClick={handleRightDoubleClick}
        />

        <div className="absolute inset-x-0 bottom-0 h-full">
          <div className="relative h-full w-[816px]">
            {markers.map((marker) => {
              const position = (marker * editorWidth) / editorRulerMarkers - 1;

              return (
                <div
                  key={marker}
                  className="absolute bottom-0"
                  style={{
                    left: `${position}px`,
                  }}
                >
                  {marker % 10 === 0 && (
                    <>
                      <div className="absolute bottom-0 w-px h-2 bg-neutral-500" />
                      <span className="absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2">{marker / 10 + 1}</span>
                    </>
                  )}

                  {marker % 5 === 0 && marker % 10 !== 0 && <div className="absolute bottom-0 w-px h-1.5 bg-neutral-500" />}
                  {marker % 5 !== 0 && <div className="absolute bottom-0 w-px h-1 bg-neutral-500" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

interface MakerProps {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
}

const Maker = ({ isDragging, isLeft, onDoubleClick, onMouseDown, position }: MakerProps) => {
  return (
    <div
      className="absolute top-0 w-4 h-full cursor-ew-resize z-[5] group -ml-2"
      style={{ [isLeft ? 'left' : 'right']: `${position}px` }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <FaCaretDown className="absolute left-1/2 top-0 h-full fill-blue-500 trasnform -translate-x-1/2" />

      <div
        className="absolute left-1/2 top-4 transform -translate-x-1/2 h-screen w-px scale-x-50 bg-blue-500"
        style={{
          display: isDragging ? 'block' : 'none',
        }}
      />
    </div>
  );
};
