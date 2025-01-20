import { useMutation, useStorage } from '@liveblocks/react/suspense';
import { useRef, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';

import { editorMargin, editorRulerMarkers, editorRulerMarkersMargin, editorWidth } from '@/config/editor';

const markers = Array.from({ length: editorRulerMarkers }, (_, i) => i);

export const Ruler = () => {
  const rulerRef = useRef<HTMLDivElement>(null);

  const leftMargin = useStorage((root) => root.leftMargin ?? editorMargin);
  const setLeftMargin = useMutation(({ storage }, position: number) => storage.set('leftMargin', position), []);

  const rightMargin = useStorage((root) => root.rightMargin ?? editorMargin);
  const setRightMargin = useMutation(({ storage }, position: number) => storage.set('rightMargin', position), []);

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
      className="relative mx-auto flex h-6 select-none items-end border-b border-gray-300 print:hidden"
      style={{
        width: editorWidth,
      }}
    >
      <div id="ruler-container" className="relative size-full">
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
                      <div className="absolute bottom-0 h-2 w-px bg-neutral-500" />
                      <span className="absolute bottom-2 -translate-x-1/2 transform text-[10px] text-neutral-500">{marker / 10 + 1}</span>
                    </>
                  )}

                  {marker % 5 === 0 && marker % 10 !== 0 && <div className="absolute bottom-0 h-1.5 w-px bg-neutral-500" />}
                  {marker % 5 !== 0 && <div className="absolute bottom-0 h-1 w-px bg-neutral-500" />}
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
      className="group absolute top-0 z-[5] -ml-2 h-full w-4 cursor-ew-resize"
      style={{ [isLeft ? 'left' : 'right']: `${position}px` }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <FaCaretDown className="trasnform absolute left-1/2 top-0 h-full -translate-x-1/2 fill-blue-500" />

      <div
        className="absolute left-1/2 top-4 h-screen w-px -translate-x-1/2 scale-x-50 transform bg-blue-500"
        style={{
          display: isDragging ? 'block' : 'none',
        }}
      />
    </div>
  );
};
