import { useEffect, useState } from "react";
import Axios from "axios";
import { Order } from "@/types/types";

export function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const deleteOrder = async (orderId: number) => {
    try {
      await Axios.delete(`http://localhost:3000/api/orders/${orderId}`, {
        withCredentials: true,
      });
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await Axios.get("http://localhost:3000/api/orders/user-orders", {
          withCredentials: true,
        });
        setOrders(response.data);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar pedidos.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-center text-gray-500 mt-4">Carregando pedidos...</p>;
  if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Meus Pedidos</h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">Você ainda não fez nenhum pedido.</p>
      ) : (
        <ul className="space-y-6">
          {orders.map((order) => (
            <li key={order.id} className="border border-gray-300 rounded-lg p-4 shadow-sm">
              <h2 className="text-xl font-semibold mb-2">Pedido #{order.id}</h2>
              <p className="text-gray-700">Status: <span className="font-medium">{order.status}</span></p>
              <p className="text-gray-700">Data: {new Date(order.createdAt).toLocaleString()}</p>
              <p className="text-gray-700">Total: <span className="font-medium">R$ {order.totalPrice.toFixed(2)}</span></p>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Produtos:</h3>
                <ul className="space-y-2 mt-2">
                  {order.products.map((product, index) => (
                    <li key={index} className="flex items-center space-x-4">
                      <img
                        src={product.productImageUrl}
                        alt={product.productname}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="text-gray-700 font-medium">{product.productname}</p>
                        <p className="text-gray-600">Quantidade: {product.orderquantity}</p>
                        <p className="text-gray-600">Preço por unidade: R$ {Number(product.productprice).toFixed(2)}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Excluir Pedido
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
