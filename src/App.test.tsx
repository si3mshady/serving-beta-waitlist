import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('SERVING Beta Waitlist Landing Page', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('renders hero headline, problem statement, and solution', () => {
    render(<App />);
    
    expect(
      screen.getByRole('heading', { name: /Turn the skills you already have into another way to earn/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Traditional job searches aren't the only way people should be able to earn/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/List what you can do. Set your availability. Connect with people who need your help/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/SERVING is currently in closed testing on Google Play/i)
    ).toBeInTheDocument();
  });

  it('shows error message when submitting empty fields', async () => {
    render(<App />);
    
    const nameInput = screen.getByLabelText(/Your Name/i);
    const form = nameInput.closest('form')!;

    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText(/Please enter your full name/i)).toBeInTheDocument();
    });
  });

  it('shows error message when submitting invalid email', async () => {
    render(<App />);
    
    const nameInput = screen.getByLabelText(/Your Name/i);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const form = nameInput.closest('form')!;

    fireEvent.change(nameInput, { target: { value: 'Alex Morgan' } });
    fireEvent.change(emailInput, { target: { value: 'invalid-email-format' } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it('handles successful signup submission', async () => {
    render(<App />);
    
    const nameInput = screen.getByLabelText(/Your Name/i);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const form = nameInput.closest('form')!;

    fireEvent.change(nameInput, { target: { value: 'Alex Morgan' } });
    fireEvent.change(emailInput, { target: { value: 'alex.morgan@example.com' } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /You're on the list!/i })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/I'll send you the next steps for the SERVING beta/i)
      ).toBeInTheDocument();
    });
  });

  it('detects duplicate submissions gracefully', async () => {
    localStorage.setItem('serving_beta_signups', JSON.stringify(['duplicate.user@example.com']));

    render(<App />);
    
    const nameInput = screen.getByLabelText(/Your Name/i);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const form = nameInput.closest('form')!;

    fireEvent.change(nameInput, { target: { value: 'Duplicate User' } });
    fireEvent.change(emailInput, { target: { value: 'duplicate.user@example.com' } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /Already Registered/i })
      ).toBeInTheDocument();
    });
  });
});
