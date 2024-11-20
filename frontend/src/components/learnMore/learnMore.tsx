import { LearnMoreProps } from "@/types/types";

export function LearnMore({
  isOpen,
  onClose,
  selectedProduct,
}: LearnMoreProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <h3 className="text-xl font-semibold">{selectedProduct.productname}</h3>
        <p className="text-sm text-gray-600 mt-2">
          {selectedProduct.productdescription}
        </p>
        <p className="text-lg font-semibold mt-4">R$ {selectedProduct.productprice}</p>
        <p className="text-sm text-gray-600 mt-2">{selectedProduct.productcategory}</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
