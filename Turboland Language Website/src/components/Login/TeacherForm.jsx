import React from "react";
import { useForm } from "react-hook-form";
import { loginTeacher } from "../../utils/api/login";
import { toast } from "sonner";
import { teacherStore } from "../../stores/teacher";
import { useNavigate } from "react-router-dom";
function TeacherForm({ setTypeForm,setLoading, loading}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const {clearAllFields, setId, setName, setEmail, setProfilePic, setPassword } =
    teacherStore();
  const onSubmit = async (data) => {
    try {
      setLoading(true)
      if (data && Object.keys(errors).length < 1) {
        clearAllFields()
        const { responseData, status } = await loginTeacher(
          data.email,
          data.password
        );
        if (status !== 200) {
      setLoading(false)
          throw new Error("Datos inválidos");
        }
        setId(responseData?.id);
        setName(responseData?.name);
        setEmail(responseData?.email);
        setPassword(responseData?.password);
        setProfilePic(responseData?.profileImage);
        toast.success("Inicio de sesión exitoso");
        setLoading(false)
        return navigate("/teacherDashboard");
      } else {
        setLoading(false)
        throw new Error("datos faltantes");
      }
    } catch (error) {
      setLoading(false)
      toast.error(error);
    }
  };
  console.log(errors);

  return (
    <div className="w-[60%] h-[40%] mx-auto flex flex-col justify-center items-center ">
      <form
        className="w-full mx-auto flex flex-col justify-center items-center border-[3px] border-[#171717] rounded-lg gap-4 py-4 h-auto relative"
        onSubmit={handleSubmit(onSubmit)}
      >
        <button
          type="button"
          class="absolute flex flex-shrink-0 justify-center items-center gap-2 size-[38px] text-sm font-semibold rounded-lg border border-transparent bg-gray-800 border-blue-50 text-cyan-50 hover:border-blue-50 hover:text-blue-50 disabled:opacity-50 disabled:pointer-events-none top-5 left-5"
          onClick={() => setTypeForm(undefined)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-undo-2"
          >
            <path d="M9 14 4 9l5-5" />
            <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11" />
          </svg>
        </button>
        <div class="max-w-sm space-y-3 w-[80%]">
          <div class="relative">
            <input
              id="hs-floating-input-email-value"
              class=" peer p-4 block w-full rounded-lg text-sm placeholder:text-transparent focus:border-blue-500  disabled:opacity-50 disabled:pointer-events-none bg-neutral-900 border-neutral-700 text-neutral-200 focus:ring-neutral-600
              focus:pt-6
              focus:pb-2
              [&:not(:placeholder-shown)]:pt-6
              [&:not(:placeholder-shown)]:pb-2
              autofill:pt-6
              autofill:pb-2 border-[2px]"
              placeholder="you@email.com"
              {...register("email", {
                required: true,
                pattern:
                  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
              })}
            />
            {errors["email"] ? (
              <p
                className="text-sm text-red-500 [text-shadow:_1px_1px_0_rgb(255_0_0_/_40%)] mt-2"
                id="hs-validation-name-error-helper"
              >
                Por favor ingrese un correo electrónico valido
              </p>
            ) : (
              <p className="text-sm text-red-600 mt-2 invisible">
                Por favor ingrese un correo electrónico valido
              </p>
            )}
            <label
              for="hs-floating-input-email-value"
              class="absolute top-0 start-0 p-4  h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] peer-disabled:opacity-50 peer-disabled:pointer-events-none
              peer-focus:scale-90
              peer-focus:translate-x-0.5
              peer-focus:-translate-y-1.5 text-neutral-300
              peer-focus:text-gray-400 dark:peer-focus:text-neutral-400
              peer-[:not(:placeholder-shown)]:scale-90
              peer-[:not(:placeholder-shown)]:translate-x-0.5
              peer-[:not(:placeholder-shown)]:-translate-y-1.5
              peer-[:not(:placeholder-shown)]:text-gray-400 dark:peer-[:not(:placeholder-shown)]:text-neutral-400 dark:text-neutral-400"
            >
              Email
            </label>
          </div>
          <div class="relative ">
            <input
              type="password"
              id="hs-floating-input-passowrd-value"
              class=" peer p-4 block w-full rounded-lg text-sm placeholder:text-transparent focus:border-blue-500  disabled:opacity-50 disabled:pointer-events-none bg-neutral-900 border-neutral-700 text-neutral-200 focus:ring-neutral-600
              focus:pt-6
              focus:pb-2
              [&:not(:placeholder-shown)]:pt-6
              [&:not(:placeholder-shown)]:pb-2
              autofill:pt-6
              autofill:pb-2 border-[2px]"
              placeholder="********"
              {...register("password", {
                required: true,
                minLength: 4,
                maxLength: 20,
              })}
            />
            {errors["password"] ? (
              <p
                className="text-sm text-red-500 [text-shadow:_1px_1px_0_rgb(255_0_0_/_40%)] mt-2"
                id="hs-validation-name-error-helper"
              >
                Por favor ingrese una contraseña valida
              </p>
            ) : (
              <p className="text-sm text-red-600 mt-2 invisible">
                Por favor ingrese una contraseña valida
              </p>
            )}
            <label
              for="hs-floating-input-passowrd-value"
              class="absolute top-0 start-0 p-4  h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] peer-disabled:opacity-50 peer-disabled:pointer-events-none
              peer-focus:scale-90
              peer-focus:translate-x-0.5
              peer-focus:-translate-y-1.5
              peer-focus:text-gray-400 dark:peer-focus:text-neutral-400 text-neutral-300
              peer-[:not(:placeholder-shown)]:scale-90
              peer-[:not(:placeholder-shown)]:translate-x-0.5
              peer-[:not(:placeholder-shown)]:-translate-y-1.5
              peer-[:not(:placeholder-shown)]:text-gray-400 dark:peer-[:not(:placeholder-shown)]:text-neutral-400 dark:text-neutral-400"
            >
              Password
            </label>
          </div>
        </div>
        <button
          type="submit"
          className={
            Object.keys(errors).length > 0
            ? "w-[30%] justify-center py-3 px-4 inline-flex items-center gap-x-2 text-xl font-semibold rounded-lg border bg-white border-red-600 text-red-600 hover:border-red-500 hover:text-red-500 disabled:opacity-50 disabled:pointer-events-none"
            : "w-[30%] justify-center py-3 px-4 inline-flex items-center gap-x-2 text-xl font-semibold rounded-lg border bg-gray-800 border-neutral-900 text-neutral-200 hover:border-neutral-900 hover:text-neutral-200 disabled:opacity-50 disabled:pointer-events-none"
          }
          disabled={loading}
          >
            {loading? "Cargando...":"Ingresar"}
        </button>
      </form>
    </div>
  );
}

export default TeacherForm;
