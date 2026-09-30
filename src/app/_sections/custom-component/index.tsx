'use client';

import { useState, FormEvent } from 'react';
import { Section } from "@/common/layout";

export function CustomComponent() {
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setResult('Sending...');
    
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      formData.append('access_key', process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY!);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult('Form Submitted Successfully');
        form.reset();
      } else {
        console.error('Error:', data);
        setResult(data.message || 'Something went wrong!');
      }
    } catch (error) {
      console.error('Error:', error);
      setResult('Failed to submit form');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section container="full" className="py-14 md:py-[72px]">
      <article className="relative flex flex-col items-center justify-center gap-6 self-stretch overflow-hidden border-t border-b border-border bg-surface-secondary p-6 dark:border-dark-border dark:bg-dark-surface-secondary rounded-none">
        {/* Background elements */}
        <div className="absolute left-0 top-0 z-10 h-full w-full bg-surface-secondary blur-3xl filter dark:bg-dark-surface-secondary" />
  
        {/* Content container with original padding */}
        <div className="relative z-20 flex w-full max-w-[1000px] flex-col items-center gap-6 text-center">
          <h4 className="text-center text-3xl font-medium tracking-tighter text-text-primary dark:text-dark-text-primary md:text-4xl">
            Contact Us
          </h4>
  
          <form onSubmit={onSubmit} className="w-full max-w-[600px] space-y-4">
            {/* Input fields with original styling */}
            <div>
              <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-surface-primary dark:border-dark-border dark:bg-dark-surface-primary focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-surface-primary dark:border-dark-border dark:bg-dark-surface-primary focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-border bg-surface-primary dark:border-dark-border dark:bg-dark-surface-primary focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              ></textarea>
            </div>
  
            {/* Original button styling */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 rounded-lg bg-black hover:bg-gray-800 text-white font-medium transition-colors disabled:bg-gray-400 dark:bg-blue-500 dark:hover:bg-blue-600 dark:disabled:bg-blue-900"
            >
              {isLoading ? 'Sending...' : 'Submit Message'}
            </button>
  
            {/* Result message */}
            {result && (
              <div className={`mt-4 p-3 rounded-lg text-center ${
                result.includes('Successfully') 
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300' 
                  : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300'
              }`}>
                {result}
              </div>
            )}
          </form>
        </div>
      </article>
    </Section>
  );
}