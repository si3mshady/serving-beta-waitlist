export type BetaRole = 'provider' | 'client' | 'both';

export interface WaitlistSubmission {
  name: string;
  email: string;
  role: BetaRole;
  source: string;
}

export interface SubmissionResponse {
  result: 'success' | 'duplicate' | 'error';
  message: string;
}
