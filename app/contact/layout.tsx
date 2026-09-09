import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Desk & Technical Support',
  description:
    'Get in touch with the WordCounter development team at rmnlove.com for feedback, bug reports, and algorithm queries.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}