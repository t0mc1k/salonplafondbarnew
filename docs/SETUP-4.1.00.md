# Einrichtung Version 4.1.00 – Push-Benachrichtigungen und TomiAI

Reihenfolge einhalten. Alles in Supabase (Dashboard). Dauer: ca. 20–30 Minuten.
Voraussetzung: `sql/3.1.02_chat.sql` und `sql/3.2.03_betrieb.sql` wurden schon ausgeführt.

## 1. SQL ausführen
1. Supabase → **SQL Editor** → Inhalt von `sql/4.1.00_push_tomi.sql` einfügen → **Run** (bei „Potential issue detected“ → *Run query*).
2. **Database → Extensions**: `pg_net` und `pg_cron` müssen aktiv sein. Falls du sie gerade erst aktiviert hast: das SQL aus Schritt 1 **noch einmal** ausführen (dann wird der Minuten-Job angelegt).

## 2. Push-Schlüssel erzeugen (VAPID)
1. Öffne die Datei `tools/vapid-generator.html` auf deinem Computer (Doppelklick) und klicke auf **Neues Schlüsselpaar erzeugen**.
2. Der **öffentliche** Schlüssel kommt gleich in die App (Schritt 5) und in Supabase. Der **private** Schlüssel nur in Supabase (Schritt 3). Nie in den Chat oder in den App-Code!

## 3. Secrets setzen
Supabase → **Edge Functions → Secrets** (oder *Project Settings → Edge Functions*), diese Einträge anlegen:

| Name | Wert |
|---|---|
| `VAPID_PUBLIC_KEY` | öffentlicher Schlüssel aus Schritt 2 |
| `VAPID_PRIVATE_KEY` | privater Schlüssel aus Schritt 2 |
| `VAPID_SUBJECT` | `mailto:kdstom@outlook.com` |
| `PUSH_SHARED_SECRET` | eine lange zufällige Zeichenfolge (mind. 32 Zeichen, z. B. aus einem Passwort-Generator) |
| `GEMINI_API_KEY` | dein **neuer** Gemini-Schlüssel (den alten im Chat veröffentlichten bitte in Google löschen) |
| `GEMINI_MODEL` | optional, z. B. `gemini-2.5-flash` (Standard) |

(`SUPABASE_URL`, `SUPABASE_ANON_KEY` und `SUPABASE_SERVICE_ROLE_KEY` stellt Supabase den Funktionen automatisch bereit.)

## 4. Edge Functions bereitstellen
Supabase → **Edge Functions → Deploy a new function → Via Editor**:
1. Name **`send-push`**, Code aus `supabase/functions/send-push/index.ts` einfügen. Unter den Einstellungen **„Verify JWT“ AUSSCHALTEN**. Deploy.
2. Name **`tomi-ai`**, Code aus `supabase/functions/tomi-ai/index.ts` einfügen. „Verify JWT“ kann an bleiben. Deploy.

(Alternative mit der Supabase-CLI: `supabase functions deploy send-push --no-verify-jwt` und `supabase functions deploy tomi-ai`.)

## 5. Geheimwort in der Datenbank eintragen
Im SQL Editor (dasselbe Geheimwort wie `PUSH_SHARED_SECRET`):
```sql
update public.push_config
   set shared_secret = 'HIER_DAS_GEHEIMWORT_EINTRAGEN'
 where id = 1;
select * from public.push_config;   -- function_url muss auf .../functions/v1/send-push zeigen
```

## 6. App hochladen
1. In `js/push.js` den **öffentlichen** Schlüssel bei `PUSH_VAPID_PUBLIC_KEY = '...'` eintragen.
2. Alle Dateien der neuen Version hochladen (Ordner `supabase/`, `tools/`, `docs/` müssen nicht auf die Webseite).
3. App einmal ganz schließen und neu öffnen (bzw. Einstellungen → „Neu laden“).

## 7. Testen
- **Push:** Einstellungen → „🔔 Push-Benachrichtigungen“ → *Aktivieren* → *Test senden*. Nach wenigen Sekunden kommt die Meldung (auch bei geschlossener App).
  - Prüfen: `select id, category, status, error from public.push_queue order by id desc limit 10;` (Status `sent` = gesendet, `failed` = siehe Spalte `error`).
  - Edge Functions → `send-push` → **Logs** zeigt Fehler. Die Antworten des Datenbank-Aufrufs: `select * from net._http_response order by created desc limit 5;`
- **iPhone:** Die App muss über Safari → *Teilen* → *Zum Home-Bildschirm* installiert und von dort geöffnet sein. Erst dann kann man Benachrichtigungen aktivieren (iOS 16.4 oder neuer).
- **TomiAI:** Knopf „✨ TomiAI“ unten links → eine Frage stellen, z. B. „Wie macht man einen Negroni?“.

## 8. Bekannte Grenzen
- Zustellung ist nicht garantiert (Energiesparmodus, „Nicht stören“, Fokus-Modus). Für Notfälle später zusätzlich E-Mail.
- Arbeitsplan-Meldungen kommen mit ca. 1–2 Minuten Verzögerung gebündelt (ein Import = eine Meldung pro Person). Dafür ist `pg_cron` nötig.
- TomiAI: Tageslimit 60 Anfragen pro Mitarbeiter, 200 pro Manager (in `supabase/functions/tomi-ai/index.ts` änderbar). Der Verlauf wird nicht gespeichert.

## 9. Gemini-Schlüssel erneuern
Weil der erste Schlüssel im Chat stand: in Google AI Studio / Cloud Console den alten Schlüssel **löschen**, einen neuen erzeugen und nur im Supabase-Secret `GEMINI_API_KEY` eintragen.
