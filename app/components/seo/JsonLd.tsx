/**
 * Renders JSON-LD structured data script tag.
 * Pass a single schema object or array of schemas.
 */
export function JsonLd({
  data,
}: {
  data: object | object[];
}) {
  const json = Array.isArray(data) ? data : [data];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(json.length === 1 ? json[0] : json),
      }}
    />
  );
}
