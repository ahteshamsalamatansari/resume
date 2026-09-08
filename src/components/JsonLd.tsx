/**
 * Injects a schema.org JSON-LD document. Server component — the markup is in
 * the initial HTML, so crawlers that do not execute JavaScript still see it.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is escaped for the one sequence that can break
      // out of a <script> block.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
