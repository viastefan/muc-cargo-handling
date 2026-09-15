"use client";

import { useFormStatus } from "react-dom";

/**
 * Submit-Button mit Pending-Zustand fuer einfache `<form action={...}>` ohne
 * eigenen Client-State — liest useFormStatus vom umgebenden Formular (muss
 * dessen Kind sein). Gleiche Wartezeit-UX wie ReplyForm/PushToggle, nur ohne
 * useTransition, weil hier kein zusaetzlicher Client-State noetig ist.
 */
export function AdminSubmitButton({
  children,
  pendingLabel,
  className = "admin-btn admin-btn--sm",
}: {
  children: React.ReactNode;
  pendingLabel?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={className} disabled={pending} aria-busy={pending}>
      {pending ? (pendingLabel ?? "Moment …") : children}
    </button>
  );
}
