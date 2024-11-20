import Axios from "axios";
import { useEffect, useState } from "react";
import { Order } from "@/types/types";

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }) + " " + date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const fetchAllOrders = async () => {
    try {
      const response = await Axios.get("http://localhost:3000/api/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    }
  };

  const updateOrderStatus = async (orderId: number, currentStatus: string) => {
    const nextStatus =
      currentStatus === "Pendente"
        ? "Em preparo"
        : currentStatus === "Em preparo"
        ? "Concluído"
        : "Concluído";

    try {
      await Axios.put(`http://localhost:3000/api/orders/${orderId}`, {
        status: nextStatus,
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: nextStatus } : order
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar status do pedido:", error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Pedidos</h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-600">Nenhum pedido encontrado.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border rounded-lg p-6 shadow-md"
            >
              <p className="mb-2">
                <strong>ID do Pedido:</strong> {order.id}
              </p>
              <p className="mb-2">
                <strong>Usuário:</strong> {order.user.name}
              </p>
              <p className="mb-2">
                <strong>Status:</strong> {order.status}
              </p>
              <p className="mb-2">
                <strong>Data:</strong> {formatDateTime(order.createdAt)}
              </p>
              <p className="mb-4">
                <strong>Total:</strong> R$ {order.totalPrice.toFixed(2)}
              </p>
              <div className="mb-4">
                <p className="font-bold mb-2">Produtos:</p>
                <ul className="list-disc ml-6 space-y-2">
                  {order.products.map((product, index) => (
                    <li key={index}>
                      <p>
                        <strong>Nome:</strong> {product.productname}
                      </p>
                      <p>
                        <strong>Quantidade:</strong> {product.orderquantity}
                      </p>
                      <p>
                        <strong>Preço por unidade:</strong> R$ {product.productprice}
                      </p>
                      <img
                        src={product.productImageUrl}
                        alt={product.productname}
                        className="w-16 h-16 object-cover mt-2 rounded"
                      />
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => updateOrderStatus(order.id, order.status)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                disabled={order.status === "Concluído"}
              >
                {order.status === "Concluído"
                  ? "Pedido Concluído"
                  : "Avançar Status"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
