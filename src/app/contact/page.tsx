import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import ContactForm from '@/components/ContactForm';
import { FAQS } from '@/lib/data';
import { faqSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Ahtesham Salamat Ansari — AI Engineer open to remote roles in generative AI, data intelligence and production machine learning. Replies usually within a day.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <PageShell
      crumbs={[{ name: 'Contact', path: '/contact' }]}
      eyebrow="Contact"
      title="Let’s build something that actually ships."
      lede="Open to remote AI engineering roles in GenAI, data intelligence and production ML — from anywhere, to anywhere. Replies usually within a day."
      schema={[faqSchema()]}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <ContactForm />

        <section className="mt-24 pt-16 border-t border-paper/[0.09]">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tightest text-paper mb-10">
            Before you write
          </h2>
          <dl className="grid gap-x-12 gap-y-9 md:grid-cols-2">
            {FAQS.map((f) => (
              <div key={f.q} className="border-t border-paper/[0.1] pt-5">
                <dt className="text-lg font-semibold text-paper leading-snug">
                  {f.q}
                </dt>
                <dd className="mt-2.5 text-base text-paper/70 leading-relaxed">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </PageShell>
  );
}
