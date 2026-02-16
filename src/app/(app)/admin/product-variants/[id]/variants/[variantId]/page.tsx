

import VariantForm from "@/components/VariantForm";

export default function EditVariantPage({
  params,
}: {
  params: { id: string; variantId: string };
}) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Variant</h1>

      <VariantForm
        productId={params.id}
        variantId={params.variantId}
      />
    </div>
  );
}