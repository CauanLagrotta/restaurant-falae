import Axios from "axios";
import InputMask from "react-input-mask";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { CrudUsers } from "@/types/types";

export function Crud() {
  const [users, setUsers] = useState<CrudUsers[]>([]);
  const [form, setForm] = useState({
    username: "",
    useremail: "",
    userphone: "",
    userpassword: "",
    useraddress: "",
    staff: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const fetchUsers = async () => {
    try {
      const { data } = await Axios.get("http://localhost:3000/api/users");
      setUsers(data);
    } catch (error) {
      toast.error("Erro ao carregar usuários.");
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await Axios.put(`http://localhost:3000/api/users/${editId}`, form);
        toast.success("Usuário atualizado com sucesso!");
        setIsEditing(false);
      } else {
        await Axios.post("http://localhost:3000/api/users", form);
        toast.success("Usuário criado com sucesso!");
      }
      setForm({
        username: "",
        useremail: "",
        userphone: "",
        userpassword: "",
        useraddress: "",
        staff: 0,
      });
      fetchUsers();
    } catch (error) {
      toast.error("Erro ao salvar usuário.");
      console.error(error);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await Axios.delete(`http://localhost:3000/api/users/${id}`);
      toast.success("Usuário excluído com sucesso!");
      fetchUsers();
    } catch (error) {
      toast.error("Erro ao excluir usuário.");
      console.error(error);
    }
  };

  const handleEdit = (user: CrudUsers) => {
    setIsEditing(true);
    setEditId(user.id);
    setForm({
      username: user.username,
      useremail: user.useremail,
      userphone: user.userphone,
      userpassword: "",
      useraddress: user.useraddress,
      staff: user.staff,
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <input
          type="text"
          placeholder="Nome"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
          className="block w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.useremail}
          onChange={(e) => setForm({ ...form, useremail: e.target.value })}
          required
          className="block w-full p-2 border rounded"
        />
        <InputMask
          mask="(99) 99999-9999"
          placeholder="Telefone"
          value={form.userphone}
          onChange={(e) => setForm({ ...form, userphone: e.target.value })}
          className="block w-full p-2 border rounded"
        />

        <input
          type="password"
          placeholder="Senha"
          value={form.userpassword}
          onChange={(e) => setForm({ ...form, userpassword: e.target.value })}
          className="block w-full p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Endereço"
          value={form.useraddress}
          onChange={(e) => setForm({ ...form, useraddress: e.target.value })}
          required
          className="block w-full p-2 border rounded"
        />

        <select
          value={form.staff}
          onChange={(e) => setForm({ ...form, staff: Number(e.target.value) })}
          required
          className="block w-full p-2 border rounded"
        >
          <option value="" disabled>
            {" "}
            Selecione o cargo do usuário{" "}
          </option>
          <option value={1}>Administrador</option>
          <option value={0}>Usuário comum</option>
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          {isEditing ? "Atualizar" : "Cadastrar"}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Nome</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Telefone</th>
              <th className="px-4 py-2 border">Endereço</th>
              <th className="px-4 py-2 border">Cargo</th>
              <th className="px-4 py-2 border">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{user.username}</td>
                <td className="px-4 py-2 border">{user.useremail}</td>
                <td className="px-4 py-2 border">{user.userphone}</td>
                <td className="px-4 py-2 border">{user.useraddress}</td>
                <td className="px-4 py-2 border">
                  {user.staff === 1 ? "Administrador" : "Usuário comum"}
                </td>

                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
}
