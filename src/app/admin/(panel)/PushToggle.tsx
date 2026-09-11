"use client";

import { useEffect, useState, useTransition } from "react";
import {
  subscribePushAction,
  testPushAction,
  unsubscribePushAction,
} from "./push-actions";

type State = "unsupported" | "needs-install" | "off" | "on" | "denied";

function urlBase64ToUint8Array(base64: string): Uint8Array<ArrayBuffer> {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const normalized = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(normalized);
  const bytes = new Uint8Array(new ArrayBuffer(raw.length));
  for (let i = 0; i < raw.length; i += 1) bytes[i] = raw.charCodeAt(i);
  return bytes;
}

function keyToBase64(key: ArrayBuffer | null): string {
  if (!key) return "";
  return btoa(String.fromCharCode(...new Uint8Array(key)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/** Gerätename fürs Protokoll — grob, nur zur Unterscheidung im Panel. */
function deviceLabel(): string {
  const ua = navigator.userAgent;
  if (/iPhone/.test(ua)) return "iPhone";
  if (/iPad/.test(ua)) return "iPad";
  if (/Android/.test(ua)) return "Android-Gerät";
  if (/Macintosh/.test(ua)) return "Mac";
  if (/Windows/.test(ua)) return "Windows-PC";
  return "Gerät";
}

export function PushToggle({ vapidPublicKey }: { vapidPublicKey: string }) {
  const [state, setState] = useState<State>("off");
  const [note, setNote] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    let cancelled = false;

    const detect = async () => {
      const supported =
        "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;

      if (!supported) {
        // iOS erlaubt Push nur, wenn die Seite zum Home-Bildschirm hinzugefügt wurde.
        const isIos = /iPhone|iPad|iPod/.test(navigator.userAgent);
        const standalone =
          window.matchMedia("(display-mode: standalone)").matches ||
          ("standalone" in navigator &&
            (navigator as Navigator & { standalone?: boolean }).standalone === true);
        if (!cancelled) setState(isIos && !standalone ? "needs-install" : "unsupported");
        return;
      }

      if (Notification.permission === "denied") {
        if (!cancelled) setState("denied");
        return;
      }

      const registration = await navigator.serviceWorker.getRegistration();
      const existing = await registration?.pushManager.getSubscription();
      if (!cancelled) setState(existing ? "on" : "off");
    };

    void detect();
    return () => {
      cancelled = true;
    };
  }, []);

  const enable = () => {
    setNote(null);
    startTransition(async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          setState(permission === "denied" ? "denied" : "off");
          return;
        }

        const registration = await navigator.serviceWorker.register("/sw.js");
        await navigator.serviceWorker.ready;

        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
        });

        const result = await subscribePushAction({
          endpoint: subscription.endpoint,
          p256dh: keyToBase64(subscription.getKey("p256dh")),
          auth: keyToBase64(subscription.getKey("auth")),
          label: deviceLabel(),
        });

        setNote(result.message);
        if (result.ok) setState("on");
      } catch (error) {
        setNote(error instanceof Error ? error.message : "Aktivierung fehlgeschlagen.");
      }
    });
  };

  const disable = () => {
    setNote(null);
    startTransition(async () => {
      const registration = await navigator.serviceWorker.getRegistration();
      const subscription = await registration?.pushManager.getSubscription();
      if (subscription) {
        await unsubscribePushAction(subscription.endpoint);
        await subscription.unsubscribe();
      }
      setState("off");
      setNote("Benachrichtigungen deaktiviert.");
    });
  };

  const test = () => {
    setNote(null);
    startTransition(async () => {
      const result = await testPushAction();
      setNote(result.message);
    });
  };

  return (
    <div className="admin-push">
      <div className="admin-push__head">
        <span className={`admin-push__dot${state === "on" ? " is-on" : ""}`} aria-hidden="true" />
        <p className="admin-push__title">
          Benachrichtigungen {state === "on" ? "aktiv" : "aus"}
        </p>
      </div>

      {state === "needs-install" ? (
        <p className="admin-hint">
          Auf dem iPhone zuerst über Safari via Teilen → Zum Home-Bildschirm hinzufügen,
          dann die App von dort öffnen und hier aktivieren.
        </p>
      ) : state === "unsupported" ? (
        <p className="admin-hint">Dieser Browser unterstützt keine Push-Benachrichtigungen.</p>
      ) : state === "denied" ? (
        <p className="admin-hint">
          Benachrichtigungen sind für diese Seite blockiert. In den Browser-Einstellungen
          wieder erlauben, dann Seite neu laden.
        </p>
      ) : (
        <>
          <p className="admin-hint">
            Bei jeder neuen Anfrage sofort eine Meldung auf dieses Gerät.
          </p>
          <div className="admin-push__actions">
            {state === "on" ? (
              <>
                <button
                  type="button"
                  className="admin-btn admin-btn--sm"
                  onClick={test}
                  disabled={pending}
                >
                  Test senden
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn--sm"
                  onClick={disable}
                  disabled={pending}
                >
                  Deaktivieren
                </button>
              </>
            ) : (
              <button
                type="button"
                className="admin-btn admin-btn--primary admin-btn--sm"
                onClick={enable}
                disabled={pending}
              >
                {pending ? "Moment …" : "Auf diesem Gerät aktivieren"}
              </button>
            )}
          </div>
        </>
      )}

      {note ? <p className="admin-hint">{note}</p> : null}
    </div>
  );
}
