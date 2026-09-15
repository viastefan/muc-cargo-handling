-- MUC Cargohandling — Verlauf-Integrität und Suche
-- Nach 0004_session_versioning.sql ausführen.
--
-- 1) inquiry_events hatte keinen Fremdschlüssel auf inquiries — das Löschen
--    einer Anfrage lief als zwei getrennte REST-Aufrufe, deren zweiter
--    (Verlauf löschen) bei einem Fehler still verschluckt wurde und verwaiste
--    Zeilen hinterlassen konnte. Erst eventuelle Waisen aufräumen (sonst
--    schlägt der Fremdschlüssel unten fehl), dann die Datenbank die
--    Konsistenz garantieren lassen statt der Anwendung zwei Aufrufe.
-- 2) inquiries.topic wird im Panel gefiltert, hatte aber keinen Index.

delete from public.inquiry_events e
where not exists (
  select 1 from public.inquiries i where i.reference = e.inquiry_ref
);

alter table public.inquiry_events
  add constraint inquiry_events_inquiry_ref_fkey
  foreign key (inquiry_ref) references public.inquiries (reference)
  on delete cascade;

create index if not exists inquiries_topic_idx on public.inquiries (topic);
