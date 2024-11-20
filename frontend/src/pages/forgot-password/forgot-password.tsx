import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";

interface ForgotValues{
  email: string;
}

const validationSchema = Yup.object({
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
});

export function ForgotPassword() {
  Axios.defaults.withCredentials = true;

  const handleForgotPassword = (values : ForgotValues, { resetForm }: {resetForm: ()=> void}) => {
    console.log("Valores enviados: ", values);
    Axios.post("http://localhost:3000/api/auth/forgot-password", {
      useremail: values.email,
    })
      .then((res) => {
        if (
          res.data.msg === "Email para redefinição de senha enviado com sucesso"
        ) {
          toast.success("Email para redefinição de senha enviado com sucesso", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
          });
          resetForm();
        }
      })
      .catch(() => {
        toast.error("Erro ao enviar email para redefinição de senha", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
      });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[90%] sm:w-[80%] max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Esqueceu a Senha?
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Insira seu e-mail para receber o link de redefinição de senha.
        </p>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={handleForgotPassword}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Digite seu email..."
                  className={`w-full px-4 py-2 mt-2 border rounded-md ${
                    errors.email && touched.email
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
              >
                Enviar E-mail
              </button>
            </Form>
          )}
        </Formik>
      </div>

      <ToastContainer position="top-center" autoClose={5000} hideProgressBar />
    </div>
  );
}
