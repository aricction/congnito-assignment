"use client";

import { CreateUserByRegisterRequest, GetUserByLoginRequest } from "@/app/types/types-for-auth";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/users-store";
import { getUserByLogin} from "@/lib/api/auth-api";

export default function Login() {
  const [form, setForm] = useState<GetUserByLoginRequest>({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const setUser = useUserStore((state) => state.setUser);

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await getUserByLogin(form);
      setMessage(response.message);

      if (response.status === "success" && response.data?.user) {
        setUser(response.data.user);
        router.push("/");
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || "error");
    }
  };
  return (
    <div className="mt-24 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-96 flex flex-col gap-3"
      >
        <input
          type="email"
          placeholder="email"
          name="email"
          className="p-2 border rounded"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          className="p-2 border rounded"
          onChange={handleChange}
        />

        <button className="bg-[#F53E32] text-white py-2 w-[100px] rounded-md font-semibold ">
          Login
        </button>
      </form>
    </div>
  );
}
