"use client";

import { useState } from "react";
import {
  DownloadPreviewSheet,
  type DownloadPreviewFile,
} from "./DownloadPreviewSheet";

type File = { label: string; href: string; preview?: string };
type Group = { title: string; meta: string; files: readonly File[] };

export function DownloadGrid({ items }: { items: readonly Group[] }) {
  const [activeFile, setActiveFile] = useState<DownloadPreviewFile | null>(null);

  const openPreview = (file: File, group: Group) => {
    setActiveFile({
      label: file.label,
      href: file.href,
      preview: file.preview,
      meta: group.meta,
      groupTitle: group.title,
    });
  };

  return (
    <>
      <div className="download-grid">
        {items.map((item) => (
          <article key={item.title} className="download-card">
            <h3 className="download-card__title">{item.title}</h3>
            <p className="download-card__meta">{item.meta}</p>
            <ul className="download-card__links">
              {item.files.map((file) => (
                <li key={file.href}>
                  <button
                    type="button"
                    className="download-card__link"
                    onClick={() => openPreview(file, item)}
                  >
                    {file.label}
                  </button>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <DownloadPreviewSheet file={activeFile} onClose={() => setActiveFile(null)} />
    </>
  );
}
