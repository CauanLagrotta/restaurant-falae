import { useCart } from "./cartContext";
import { useEffect } from "react";
import Axios from "axios";

export function Cart() {
  const { cart, clearCart, removeFromCart, updateQuantity } = useCart();

  const getCartProducts = async () => {
    try {
      const response = await Axios.get("http://localhost:3000/api/carts");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar produtos do carrinho:", error);
      return [];
    }
  };

  const confirmOrder = async () => {
    if (cart.length === 0) {
      alert("Seu carrinho está vazio.");
      return;
    }

    try {
      const response = await Axios.post("http://localhost:3000/api/orders", {
        products: cart.map((item) => ({
          productId: item.id,
          orderquantity: item.orderquantity,
          productprice: item.productprice,
          productname: item.productname,
          productImageUrl: item.productImageUrl,
          totalPrice: item.totalPrice,
        })),
      });

      alert(response.data.msg);
      clearCart();
    } catch (error) {
      console.error("Erro ao confirmar pedido:", error);
      alert("Erro ao confirmar pedido.");
    }
  };

  useEffect(() => {
    getCartProducts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-4">Seu Carrinho</h1>
      {cart.length === 0 ? (
        <p className="text-center font-bold text-xl text-gray-500">
          Seu carrinho está vazio.
        </p>
      ) : (
        <>
          <div>
            <p className="text-center font-bold text-xl text-gray-500">
              Total: R${" "}
              {cart
                .reduce(
                  (total, item) =>
                    total + item.orderquantity * item.productprice,
                  0
                )
                .toFixed(2)}
            </p>
          </div>

          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  {item.productImageUrl && (
                    <img
                      src={item.productImageUrl}
                      alt={item.productname}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.productname}
                    </h2>
                    <p className="text-gray-600">
                      R${item.productprice.toFixed(2)}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      
                      <button
                        onClick={
                          () =>
                            updateQuantity(
                              item.id,
                              Math.max(item.orderquantity - 1, 1)
                            )
                        }
                        className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                      >
                        -
                      </button>
                      
                      <input
                        type="number"
                        value={item.orderquantity}
                        onChange={(e) =>
                          updateQuantity(
                            item.id,
                            Math.max(Number(e.target.value), 1)
                          )
                        }
                        className="w-12 text-center border border-gray-300 rounded-md"
                      />
                      
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.orderquantity + 1)
                        }
                        className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-gray-600 mt-2">
                      Subtotal: R$
                      {(item.orderquantity * item.productprice).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-red-600 transition duration-200"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      {cart.length > 0 && (
        <div className="mt-6 text-center flex gap-5">
          <button
            onClick={confirmOrder}
            className="bg-green-500 text-white px-6 py-3 rounded-md font-semibold shadow hover:bg-green-600 transition duration-200"
          >
            Confirmar Pedido
          </button>

          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-800 font-semibold"
          >
            Limpar
          </button>
        </div>
      )}
    </div>
  );
}
