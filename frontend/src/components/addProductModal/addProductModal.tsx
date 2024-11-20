import { useState } from "react";
import { AddProductModalProps } from "@/types/types";
import CurrencyInput from 'react-currency-input-field';
import Axios from "axios";

export function AddProductModal({ isOpen, onClose }: AddProductModalProps) {
  const [values, setValues] = useState({
    productname: '',
    productprice: '',
    productcategory: '',
    productdescription: '',
    productImageUrl: '',
  });

  const [listProduct, setListProduct] = useState([]);
  console.log(listProduct);

  const handleChangeValues = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleAddProduct = async () => {
    const productData = {...values, productprice: parseFloat(values.productprice)}

    try {
      await Axios.post('http://localhost:3000/api/products', productData);

      const response = await Axios.get('http://localhost:3000/api/products');
      setListProduct(response.data);
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }

    setValues({
      productname: '',
      productprice: '',
      productcategory: '',
      productdescription: '',
      productImageUrl: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4">Adicionar Novo Produto</h3>

        <label className="block text-gray-700">Nome do produto:</label>
        <input
          type="text"
          name="productname"
          value={values.productname}
          onChange={handleChangeValues}
          className="border border-gray-300 rounded w-full p-2 mt-1 mb-4"
          placeholder="Digite o nome do produto"
        />

        <label className="block text-gray-700">Preço:</label>
        <CurrencyInput
          name="productprice"
          value={values.productprice}
          onValueChange={(value) => setValues({ ...values, productprice: value || '' })}
          className="border border-gray-300 rounded w-full p-2 mt-1 mb-4"
          placeholder="Digite o preço do produto"
          decimalScale={2}
          prefix="R$ "
          allowNegativeValue={false}
        />

        <label className="block text-gray-700">Cole a url da imagem:</label>
        <input
          type="text"
          name="productImageUrl"
          value={values.productImageUrl}
          onChange={handleChangeValues}
          className="border border-gray-300 rounded w-full p-2 mt-1 mb-4"
          placeholder="Digite o link da imagem do produto"
        />

        <label className="block text-gray-700">Descrição:</label>
        <input
          type="text"
          name="productdescription"
          value={values.productdescription}
          onChange={handleChangeValues}
          className="border border-gray-300 rounded w-full p-2 mt-1 mb-4"
          placeholder="Digite a descrição do produto"
        />

        <label className="block text-gray-700">Categoria:</label>
        <select
          name="productcategory"
          value={values.productcategory}
          onChange={handleChangeValues}
          className="border border-gray-300 rounded w-full p-2 mt-1 mb-4"
        >
          <option value="">Selecione uma categoria</option>
          <option value="entradas">Entradas</option>
          <option value="pratos-principais">Pratos Principais</option>
          <option value="acompanhamentos">Acompanhamentos</option>
          <option value="bebidas">Bebidas</option>
          <option value="sobremesas">Sobremesas</option>
        </select>

        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-lg">
            Cancelar
          </button>
          <button onClick={handleAddProduct} className="bg-green-600 text-white px-4 py-2 rounded-lg">
            Adicionar Produto
          </button>
        </div>
      </div>
    </div>
  );
}
