import { LockKeyhole } from "lucide-react";

import { loginAdmin } from "@/features/admin-gallery/actions/gallery-admin-actions";
import type { AdminMessage } from "@/features/admin-gallery/types";

type AdminLoginFormProps = {
  message: AdminMessage | null;
};

export function AdminLoginForm({ message }: AdminLoginFormProps) {
  return (
    <section className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-5 py-12">
      <div className="rounded-lg border border-[#202020] bg-[#161616] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.24)]">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-lg bg-[var(--accent)] text-black">
            <LockKeyhole aria-hidden="true" size={22} />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-normal text-[var(--accent-soft)]">
              Admin
            </p>
            <h1 className="text-2xl font-extrabold tracking-normal text-white">
              Galeria
            </h1>
          </div>
        </div>

        {message ? (
          <p
            className="mt-5 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100"
            role="alert"
          >
            {message.text}
          </p>
        ) : null}

        <form action={loginAdmin} className="mt-6 space-y-5">
          <div>
            <label
              className="text-sm font-semibold text-[#f1e7e0]"
              htmlFor="password"
            >
              Senha
            </label>
            <input
              autoComplete="current-password"
              className="mt-2 w-full rounded-lg border border-[#2c2c2c] bg-[#101010] px-4 py-3 text-base text-white outline-none transition focus:border-[var(--accent)]"
              id="password"
              name="password"
              required
              type="password"
            />
          </div>

          <button
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-3 text-sm font-extrabold uppercase tracking-normal text-black transition hover:bg-[var(--accent-soft)]"
            type="submit"
          >
            <LockKeyhole aria-hidden="true" size={18} />
            Entrar
          </button>
        </form>
      </div>
    </section>
  );
}
