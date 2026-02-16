import VariantForm from "@/components/product-variants/VariantForm";

export default async function NewVariantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Variant</h1>

      <VariantForm productId={id} />
    </div>
  );
}