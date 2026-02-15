"use client";

interface FullProductProps {
  data: any;
}

export default function FullProductClient({
  data,
}: FullProductProps) {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">
        Product Detail Debug
      </h1>

      <Section title="Product Info" data={data.product} />
      <Section title="Summary" data={data.summary} />
      <Section title="Attributes" data={data.attributes} />
      <Section title="Variants" data={data.variants} />
      <Section title="Images" data={data.images} />
    </div>
  );
}

function Section({
  title,
  data,
}: {
  title: string;
  data: any;
}) {
  return (
    <section className="border p-4 rounded">
      <h2 className="font-semibold mb-2">{title}</h2>
      <pre className="text-sm p-4 rounded overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </section>
  );
}