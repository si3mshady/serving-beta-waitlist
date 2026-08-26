import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({});
const BUCKET_NAME = process.env.BUCKET_NAME || 'serving-beta-waitlist-916923735465';
const JSON_KEY = 'submissions.json';
const CSV_KEY = 'submissions.csv';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

export const handler = async (event) => {
  if (event.requestContext?.http?.method === 'OPTIONS' || event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ status: 'ok' }),
    };
  }

  try {
    let body = {};
    if (event.body) {
      try {
        body = JSON.parse(event.body);
      } catch (err) {
        body = {};
      }
    }

    const name = (body.name || '').trim();
    const email = (body.email || '').trim().toLowerCase();
    const role = (body.role || 'both').trim();
    const source = (body.source || 'serving-beta-landing-page').trim();

    if (!name || !email) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ result: 'error', message: 'Name and email are required.' }),
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ result: 'error', message: 'Invalid email address format.' }),
      };
    }

    // Fetch existing submissions from S3
    let submissions = [];
    try {
      const getObjectResp = await s3.send(new GetObjectCommand({ Bucket: BUCKET_NAME, Key: JSON_KEY }));
      const strData = await getObjectResp.Body.transformToString();
      submissions = JSON.parse(strData);
    } catch (err) {
      submissions = [];
    }

    // Duplicate check
    const isDuplicate = submissions.some((sub) => sub.email.toLowerCase() === email);
    if (isDuplicate) {
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({
          result: 'duplicate',
          message: "You're already on the list! We will reach out when the next testing batch opens.",
        }),
      };
    }

    // Record new submission
    const newSubmission = {
      timestamp: new Date().toISOString(),
      name,
      email,
      role,
      source,
    };
    submissions.push(newSubmission);

    // Build CSV string
    const csvHeader = 'Timestamp,Name,Email,Role / Interest,Signup Source\n';
    const csvRows = submissions
      .map(
        (s) =>
          `"${s.timestamp}","${escapeCsv(s.name)}","${escapeCsv(s.email)}","${escapeCsv(s.role)}","${escapeCsv(
            s.source
          )}"`
      )
      .join('\n');
    const csvContent = csvHeader + csvRows;

    // Save updated JSON and CSV to S3
    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: JSON_KEY,
        Body: JSON.stringify(submissions, null, 2),
        ContentType: 'application/json',
      })
    );

    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: CSV_KEY,
        Body: csvContent,
        ContentType: 'text/csv',
        CacheControl: 'no-cache',
      })
    );

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        result: 'success',
        message: "You're on the list. I'll send you the next steps for the SERVING beta.",
      }),
    };
  } catch (error) {
    console.error('Lambda handler error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ result: 'error', message: 'Internal server error processing waitlist request.' }),
    };
  }
};

function escapeCsv(str) {
  return String(str || '').replace(/"/g, '""');
}
