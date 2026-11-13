/**
 * Contact form → Google Sheet.
 *
 * Receives the portfolio's contact form and appends one row to the first sheet of the
 * spreadsheet this script is bound to. The spreadsheet itself stays private: the script
 * runs as you, so visitors can add a row but can never read the sheet.
 *
 * Deploy (once):
 *   1. Open the spreadsheet → Extensions → Apps Script.
 *   2. Replace the contents of Code.gs with this file. Save.
 *   3. Deploy → New deployment → type "Web app".
 *        Execute as:      Me
 *        Who has access:  Anyone
 *   4. Authorise when asked, then copy the Web app URL (it ends in /exec).
 *   5. In the GitHub repo: Settings → Secrets and variables → Actions → Variables →
 *      New repository variable  CONTACT_ENDPOINT = that URL. Re-run the deploy workflow.
 *
 * After editing this script, use Deploy → Manage deployments → Edit → New version,
 * otherwise the old code keeps running.
 */

// Keep in sync with app/utils/contact.ts
var LIMITS = { name: 100, email: 200, message: 4000, lang: 5, page: 200 };
var EMAIL = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

function doPost(e) {
  try {
    var data = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    // Honeypot: real visitors never fill this. Report success, store nothing.
    if (data.website) return json({ ok: true });

    var row = {};
    for (var key in LIMITS) row[key] = clean(data[key], LIMITS[key]);

    if (!row.name || !row.email || !row.message) return json({ ok: false, error: 'missing_fields' });
    if (!EMAIL.test(row.email)) return json({ ok: false, error: 'invalid_email' });

    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
        .appendRow([new Date(), safe(row.name), safe(row.email), safe(row.message), safe(row.lang), safe(row.page)]);
    } finally {
      lock.releaseLock();
    }
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: 'server_error' });
  }
}

function doGet() {
  return json({ ok: true, service: 'contact-form' });
}

/** Coerce to a trimmed string no longer than max. */
function clean(value, max) {
  return String(value == null ? '' : value).trim().slice(0, max);
}

/** Stop a value from being interpreted as a formula when the sheet is opened. */
function safe(value) {
  return /^[=+\-@\t\r]/.test(value) ? "'" + value : value;
}

function json(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
