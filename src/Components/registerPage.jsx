import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const { VITE_BACKEND_URL } = import.meta.env;

const Register = () => {
  const navigate = useNavigate();
  const [registerDatos, setRegisterDates] = useState({});

  const handleChange = (e) => {
    setRegisterDates({
      ...registerDatos,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!registerDatos.name || !registerDatos.password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Por favor ingrese su Usuario y/o contraseña`,
      });
    } else {
      try {
        let registerUser = await axios.post(
          `${VITE_BACKEND_URL}/user`,
          registerDatos
        );
        if (registerUser.status === 200) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registro exitoso",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response.data.message}`,
        });
      }
    }
  };

  return (


    <div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-600 py-10">
    <div className="flex shadow-md">
      <div
        className="flex flex-wrap items-stretch content-center justify-center rounded-l-md bg-white"
        style={{ width: "24rem", height: "32rem" }}
      >
        <div className="w-72">
          <h1 className="text-xl font-semibold">Crea tu cuenta!</h1>

          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-3">
              <label className="mb-2 flex text-xs font-semibold justify-start">
                Usuario
              </label>
              <input
                name="name"
                onChange={handleChange}
                placeholder="Ingresa tu usuario"
                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Contraseña" className="mb-2 flex justify-start text-xs font-semibold ">
                Contraseña
              </label>
              <input
                name="password"
                onChange={handleChange}
                type="password"
                placeholder="**********"
                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
              />
            </div>

            <div className="mb-3">
            <button  className="w-full h-12 text-center text-white bg-slate-800 hover:bg-slate-600 rounded-md">
                Registrarse
              </button>
            </div>

            <div className="text-center">
              <span className="text-xs text-gray-400 font-semibold">
                Ya tienes una cuenta?
              </span>
              <a
                href="/"
                className=" ml-2 text-xs font-semibold text-blue-700"
              >
                Ingresar
              </a>
            </div>
          </form>
        </div>
      </div>

      <div
        className="flex flex-wrap content-center justify-center rounded-r-md md:"
        style={{ width: "24rem", height: "32rem" }}
      >
        <img
          className="w-full h-full bg-center bg-no-repeat bg-cover rounded-r-md"
          src="https://media1.giphy.com/media/EuwbSy46466Q0/giphy.gif?cid=ecf05e47nuabo9e295h15zk4mjhvql5yex8sfmkbvg3a3h6b&rid=giphy.gif&ct=g"
          alt="todolist-EricIllanes"
        />

      </div>
      
    </div>
  </div>
  );
};
export default Register;
