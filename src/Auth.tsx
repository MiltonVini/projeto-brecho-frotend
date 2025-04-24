import { useForm } from "react-hook-form";
import { api } from "./lib/axios";
import { useNavigate } from "react-router-dom";

type LoginFormData = {
  email: string;
  password: string;
};

export function Auth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()

  const navigate = useNavigate()

  const onSubmit = async(data: LoginFormData) => {
    console.log("Dados de login:", data)

    try {
        const response = await api.post('/authenticate', data)

        const authToken = response.data.authToken

        if (authToken) {
            localStorage.setItem('authToken', authToken)

            setTimeout(() => {
                navigate('/bags')
            }, 2000)
        }
    } catch (error) {
        console.error(error)
    }

  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Unusal Shop</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email", { required: "Email é obrigatório" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("password", {
                required: "Senha é obrigatória",
                minLength: {
                  value: 6,
                  message: "A senha deve ter pelo menos 6 caracteres",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#CFECF4] text-dark px-4 py-2 rounded-sm hover:bg-[#B0CDEE] transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}
