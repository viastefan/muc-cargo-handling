"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./Button";

export type DownloadPreviewFile = {
  label: string;
  href: string;
  meta?: string;
  groupTitle?: string;
};

type Props = {
  file: DownloadPreviewFile | null;
  onClose: () => void;
};

const DRAG_CLOSE_THRESHOLD = 110;

function PdfIcon() {
  return (
    <svg className="download-preview__pdf-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 3.5h7.2L18.5 7.5V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M14 3.5V8h4.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M8.25 12.25h7.5M8.25 15h5.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DownloadPreviewSheet({ file, onClose }: Props) {
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(0);
  const panelRef = useRef<HTMLDivElement>(null);

  const isOpen = file !== null;

  const close = useCallback(() => {
    setDragOffset(0);
    setIsDragging(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close]);

  const onHandlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia("(min-width: 1024px)").matches) return;
    setIsDragging(true);
    dragStartY.current = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onHandlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const delta = Math.max(0, event.clientY - dragStartY.current);
    setDragOffset(delta);
  };

  const endDrag = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset > DRAG_CLOSE_THRESHOLD) {
      close();
      return;
    }
    setDragOffset(0);
  };

  if (!isOpen || !file) return null;

  const panelStyle =
    dragOffset > 0
      ? { transform: `translate3d(0, ${dragOffset}px, 0)` }
      : undefined;

  return (
    <div className="download-preview" data-open="true">
      <button
        type="button"
        className="download-preview__backdrop"
        aria-label="Vorschau schließen"
        onClick={close}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="download-preview-title"
        className={`download-preview__panel${isDragging ? " is-dragging" : ""}`}
        style={panelStyle}
      >
        <div
          className="download-preview__handle-wrap"
          onPointerDown={onHandlePointerDown}
          onPointerMove={onHandlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <span className="download-preview__handle" aria-hidden="true" />
        </div>

        <div className="download-preview__header">
          <div className="download-preview__header-icon">
            <PdfIcon />
          </div>
          <div className="download-preview__header-copy">
            <p className="download-preview__eyebrow">PDF-Vorschau</p>
            <h2 id="download-preview-title" className="download-preview__title">
              {file.label}
            </h2>
            {file.groupTitle ? (
              <p className="download-preview__subtitle">{file.groupTitle}</p>
            ) : null}
            {file.meta ? <p className="download-preview__meta">{file.meta}</p> : null}
          </div>
          <button
            type="button"
            className="download-preview__close"
            aria-label="Schließen"
            onClick={close}
          >
            ×
          </button>
        </div>

        <div className="download-preview__frame-wrap">
          <iframe
            key={file.href}
            src={`${file.href}#view=FitH`}
            title={`Vorschau: ${file.label}`}
            className="download-preview__frame"
          />
        </div>

        <div className="download-preview__actions">
          <Button href={file.href} download arrow={false} fullWidth className="download-preview__download">
            PDF herunterladen
          </Button>
          <button type="button" className="download-preview__dismiss" onClick={close}>
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
}
