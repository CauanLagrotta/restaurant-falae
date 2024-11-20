import { useState, useEffect } from "react";
import { EditProductModalProps } from "@/types/types";
import CurrencyInput from "react-currency-input-field";
import Axios from "axios";

export function EditProductModal({
  isOpen,
  onClose,
  onAddProduct,
  selectedProduct,
}: EditProductModalProps) {
  const [editValues, setEditValues] = useState({
    productname: "",
    productprice: "",
    productcategory: "",
    productdescription: "",
    productImageUrl: "",
  });

  useEffect(() => {
    if (selectedProduct) {
      setEditValues({
        productname: selectedProduct.productname,
        productprice: selectedProduct.productprice,
        productcategory: selectedProduct.productcategory,
        productdescription: selectedProduct.productdescription,
        productImageUrl: selectedProduct.productImageUrl,
      });
    }
  }, [selectedProduct, isOpen]);

  const handleEdit = async () => {
    const price = parseFloat(String(editValues.productprice).replace(',', '.'));

    if (isNaN(price) || price <= 0) {
      alert("Preço inválido! Deve ser maior que 0.");
      return;
    }

    try {
      await Axios.put(`http://localhost:3000/api/products/${selectedProduct?.id}`, {
        productname: editValues.productname,
        productprice: price,
        productcategory: editValues.productcategory,
        productdescription: editValues.productdescription,
        productImageUrl: editValues.productImageUrl,
      });

      const response = await Axios.get("http://localhost:3000/api/products");
      onAddProduct(response.data);

      onClose();
    } catch (error) {
      console.error("Erro ao editar produto:", error);
    }
  };

  const handleChangeValues = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditValues({
      ...editValues,
      [name]: value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4">Editar Produto</h3>

        <label className="block text-gray-700">Nome do produto:</label>
        <input
          type="text"
          name="productname"
          value={editValues.productname}
          onChange={handleChangeValues}
          className="border border-gray-300 rounded w-full p-2 mt-1 mb-4"
          placeholder="Digite o nome do produto"
        />

        <label className="block text-gray-700">Preço:</label>
        <CurrencyInput
          name="productprice"
          value={editValues.productprice}
          onValueChange={(value) => setEditValues({ ...editValues, productprice: value || '' })}
          className="border border-gray-300 rounded w-full p-2 mt-1 mb-4"
          placeholder="Digite o preço do produto"
          decimalsLimit={2}
          decimalScale={2}
          decimalSeparator="."
          groupSeparator=","
          allowNegativeValue={false}
        />

        <label className="block text-gray-700">Imagem:</label>
        <input
          type="text"
          name="productImageUrl"
          value={editValues.productImageUrl}
          onChange={handleChangeValues}
          className="border border-gray-300 rounded w-full p-2 mt-1 mb-4"
          placeholder="Digite o link da imagem do produto"
        />

        <label className="block text-gray-700">Descrição:</label>
        <input
          type="text"
          name="productdescription"
          value={editValues.productdescription}
          onChange={handleChangeValues}
          className="border border-gray-300 rounded w-full p-2 mt-1 mb-4"
          placeholder="Digite a descrição do produto"
        />

        <label className="block text-gray-700">Categoria:</label>
        <select
          name="productcategory"
          value={editValues.productcategory}
          onChange={handleChangeValues}
          className="border border-gray-300 rounded w-full p-2 mt-1 mb-4"
        >
          <option value="entradas">Entradas</option>
          <option value="pratos-principais">Pratos Principais</option>
          <option value="acompanhamentos">Acompanhamentos</option>
          <option value="bebidas">Bebidas</option>
          <option value="sobremesas">Sobremesas</option>
        </select>

        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Cancelar
          </button>
          <button
            onClick={handleEdit}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
