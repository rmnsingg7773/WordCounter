import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support Our Privacy-First Utility',
  description:
    'Learn how to support, bookmark, and reference the WordCounter text analysis suite on rmnlove.com.',
};

export default function HelpUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}