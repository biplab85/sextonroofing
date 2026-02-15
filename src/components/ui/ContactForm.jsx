'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { IconCheckCircle } from '@/components/ui/Icons';

export default function ContactForm({ fields, submitLabel, successMessage, errorMessage, variant = 'default' }) {
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="form__success">
        <div className="form__success-icon">
          <IconCheckCircle size={32} />
        </div>
        <h3 className="form__success-title">Thank You!</h3>
        <p className="form__success-text">{successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {fields.map((field) => (
        <div key={field.name} className="form__group">
          <label htmlFor={`${variant}-${field.name}`} className="form__label">
            {field.label}
          </label>

          {field.type === 'select' ? (
            <select
              id={`${variant}-${field.name}`}
              name={field.name}
              className="form__select"
              required={field.required}
              onChange={handleChange}
              defaultValue=""
            >
              {field.options.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : field.type === 'textarea' ? (
            <textarea
              id={`${variant}-${field.name}`}
              name={field.name}
              className="form__textarea"
              placeholder={field.placeholder}
              required={field.required}
              onChange={handleChange}
            />
          ) : (
            <input
              id={`${variant}-${field.name}`}
              name={field.name}
              type={field.type}
              className="form__input"
              placeholder={field.placeholder}
              required={field.required}
              onChange={handleChange}
            />
          )}
        </div>
      ))}

      {status === 'error' && (
        <p className="form__error" style={{ marginBottom: '1rem' }}>{errorMessage}</p>
      )}

      <Button
        type="submit"
        variant="primary"
        size={variant === 'hero' ? 'full' : 'lg'}
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Sending...' : submitLabel}
      </Button>
    </form>
  );
}
