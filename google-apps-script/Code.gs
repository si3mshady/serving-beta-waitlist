/**
 * SERVING Beta Waitlist - Google Apps Script Backend
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet (create a new one titled "SERVING Beta Waitlist Submissions").
 * 2. Go to Extensions > Apps Script.
 * 3. Replace any code in Code.gs with this file's contents.
 * 4. Click Deploy > New deployment.
 * 5. Select type: "Web app".
 * 6. Configuration:
 *    - Description: "SERVING Beta Waitlist API v1"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 7. Click Deploy, authorize permissions if prompted.
 * 8. Copy the Web app URL (starts with https://script.google.com/macros/s/...).
 * 9. Set this URL as VITE_GOOGLE_SCRIPT_URL in your environment or deployment settings.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 10 seconds for other executions to finish
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Auto-create header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Role / Interest', 'Signup Source']);
      sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
    }

    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var name = (data.name || '').toString().trim();
    var email = (data.email || '').toString().trim().toLowerCase();
    var role = (data.role || 'both').toString().trim();
    var source = (data.source || 'serving-beta-landing-page').toString().trim();

    // Validation
    if (!name || !email) {
      return createJsonResponse({
        result: 'error',
        message: 'Name and valid email are required.'
      });
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return createJsonResponse({
        result: 'error',
        message: 'Invalid email address format.'
      });
    }

    // Duplicate email check
    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      var emailColumn = sheet.getRange(2, 3, lastRow - 1, 1).getValues();
      for (var i = 0; i < emailColumn.length; i++) {
        if (emailColumn[i][0] && emailColumn[i][0].toString().trim().toLowerCase() === email) {
          return createJsonResponse({
            result: 'duplicate',
            message: "You're already on the list! We will reach out when the next testing batch opens."
          });
        }
      }
    }

    // Record submission
    var timestamp = new Date().toISOString();
    sheet.appendRow([timestamp, name, email, role, source]);

    return createJsonResponse({
      result: 'success',
      message: "You're on the list. I'll send you the next steps for the SERVING beta."
    });

  } catch (error) {
    return createJsonResponse({
      result: 'error',
      message: error.toString()
    });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput("SERVING Beta Waitlist API is running successfully.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
