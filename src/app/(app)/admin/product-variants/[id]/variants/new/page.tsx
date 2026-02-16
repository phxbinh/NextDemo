import VariantForm from "@/components/product-variants/VariantForm";

export default function NewVariantPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Variant</h1>

      <VariantForm productId={params.id} />
    </div>
  );
}