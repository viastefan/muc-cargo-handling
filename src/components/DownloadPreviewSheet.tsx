"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { createPortal } from "react-dom";

export type DownloadPreviewFile = {
  label: string;
  href: string;
  preview?: string;
  meta?: string;
  groupTitle?: string;
};

type Props = {
  file: DownloadPreviewFile | null;
  onClose: () => void;
};

const CLOSE_DISTANCE = 120;
const CLOSE_VELOCITY = 0.65; // px/ms
const CLOSE_MS = 280;

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

function useIsMobileSheet() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return isMobile;
}

export function DownloadPreviewSheet({ file, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const [closing, setClosing] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [retainedFile, setRetainedFile] = useState<DownloadPreviewFile | null>(null);

  const isMobile = useIsMobileSheet();
  const dragStartY = useRef(0);
  const lastY = useRef(0);
  const lastTime = useRef(0);
  const velocityY = useRef(0);
  const closingTimer = useRef<number | null>(null);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  // Keep last file visible while the exit animation plays.
  if (file && file !== retainedFile && !closing) {
    setRetainedFile(file);
  }

  const displayFile = file ?? retainedFile;
  const isOpen = displayFile !== null && (file !== null || closing);

  const finishClose = useCallback(() => {
    setClosing(false);
    setDragY(0);
    setDragging(false);
    setRetainedFile(null);
    onClose();
  }, [onClose]);

  const requestClose = useCallback(
    (opts?: { fromDrag?: boolean }) => {
      if (closing) return;
      setClosing(true);
      setDragging(false);

      if (opts?.fromDrag) {
        setDragY((current) => Math.max(current, Math.round(window.innerHeight * 0.7)));
      } else {
        setDragY(0);
      }

      if (closingTimer.current) window.clearTimeout(closingTimer.current);
      closingTimer.current = window.setTimeout(() => {
        finishClose();
      }, CLOSE_MS);
    },
    [closing, finishClose],
  );

  useEffect(() => {
    return () => {
      if (closingTimer.current) window.clearTimeout(closingTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") requestClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, requestClose]);

  const onDragPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (!isMobile || closing) return;
    event.preventDefault();
    setDragging(true);
    dragStartY.current = event.clientY;
    lastY.current = event.clientY;
    lastTime.current = performance.now();
    velocityY.current = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onDragPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (!dragging) return;
    const now = performance.now();
    const y = event.clientY;
    const delta = Math.max(0, y - dragStartY.current);
    const dt = Math.max(1, now - lastTime.current);
    velocityY.current = (y - lastY.current) / dt;
    lastY.current = y;
    lastTime.current = now;
    setDragY(delta);
  };

  const onDragPointerUp = () => {
    if (!dragging) return;
    setDragging(false);

    const shouldClose =
      dragY > CLOSE_DISTANCE || (dragY > 48 && velocityY.current > CLOSE_VELOCITY);

    if (shouldClose) {
      requestClose({ fromDrag: true });
      return;
    }

    setDragY(0);
  };

  if (!mounted || !isOpen || !displayFile) return null;

  const backdropStyle =
    isMobile && (dragging || closing || dragY > 0)
      ? { opacity: closing ? 0 : Math.max(0.18, 1 - dragY / 380) }
      : undefined;

  const panelTransform =
    dragY > 0 ? `translate3d(0, ${dragY}px, 0)` : undefined;

  return createPortal(
    <div
      className={[
        "download-preview",
        "is-open",
        closing ? "is-closing" : "",
        dragging ? "is-dragging" : "",
        dragY > 0 ? "is-drag-offset" : "",
        isMobile ? "is-sheet" : "is-modal",
      ]
        .filter(Boolean)
        .join(" ")}
      data-open="true"
    >
      <button
        type="button"
        className="download-preview__backdrop"
        aria-label="Vorschau schließen"
        style={backdropStyle}
        onClick={() => requestClose()}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="download-preview-title"
        className="download-preview__panel"
        style={panelTransform ? { transform: panelTransform } : undefined}
      >
        {isMobile ? (
          <div
            className="download-preview__grab"
            onPointerDown={onDragPointerDown}
            onPointerMove={onDragPointerMove}
            onPointerUp={onDragPointerUp}
            onPointerCancel={onDragPointerUp}
          >
            <span className="download-preview__handle" aria-hidden="true" />
            <p className="download-preview__grab-hint">Zum Schließen nach unten ziehen</p>
          </div>
        ) : null}

        <div
          className="download-preview__header"
          onPointerDown={isMobile ? onDragPointerDown : undefined}
          onPointerMove={isMobile ? onDragPointerMove : undefined}
          onPointerUp={isMobile ? onDragPointerUp : undefined}
          onPointerCancel={isMobile ? onDragPointerUp : undefined}
        >
          <div className="download-preview__header-icon">
            <PdfIcon />
          </div>
          <div className="download-preview__header-copy">
            <p className="download-preview__eyebrow">PDF-Vorschau</p>
            <h2 id="download-preview-title" className="download-preview__title">
              {displayFile.label}
            </h2>
            {displayFile.groupTitle ? (
              <p className="download-preview__subtitle">{displayFile.groupTitle}</p>
            ) : null}
            {displayFile.meta ? <p className="download-preview__meta">{displayFile.meta}</p> : null}
          </div>
          <button
            type="button"
            className="download-preview__close"
            aria-label="Schließen"
            onClick={() => requestClose()}
            onPointerDown={(event) => event.stopPropagation()}
          >
            ×
          </button>
        </div>

        <div className="download-preview__frame-wrap">
          {displayFile.preview ? (
            <div className="download-preview__image-scroll">
              <Image
                src={displayFile.preview}
                alt={`Vorschau: ${displayFile.label}`}
                width={910}
                height={1287}
                className="download-preview__image"
                sizes="(max-width: 1024px) 100vw, 40rem"
                priority
              />
            </div>
          ) : (
            <iframe
              key={displayFile.href}
              src={`${displayFile.href}#view=FitH`}
              title={`Vorschau: ${displayFile.label}`}
              className="download-preview__frame"
            />
          )}
        </div>

        <div className="download-preview__actions">
          {isMobile ? (
            <>
              <a
                href={displayFile.href}
                download
                className="download-preview__btn download-preview__btn--primary"
              >
                PDF herunterladen
              </a>
              <a
                href={displayFile.href}
                target="_blank"
                rel="noopener noreferrer"
                className="download-preview__btn download-preview__btn--secondary"
              >
                PDF öffnen
              </a>
            </>
          ) : (
            <>
              <button
                type="button"
                className="download-preview__btn download-preview__btn--ghost"
                onClick={() => requestClose()}
              >
                Schließen
              </button>
              <a
                href={displayFile.href}
                target="_blank"
                rel="noopener noreferrer"
                className="download-preview__btn download-preview__btn--secondary"
              >
                PDF öffnen
              </a>
              <a
                href={displayFile.href}
                download
                className="download-preview__btn download-preview__btn--primary"
              >
                PDF herunterladen
              </a>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
