import BrandPanel from "@/layout/auth/BrandPanel"
import RegisterForm from "@/layout/register/RegisterForm"

import { REGISTER_COPY } from "@/lib/copy"

const RegisterPage = () => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background">
      <div className="grid min-h-screen w-full grid-cols-1 overflow-hidden rounded-[var(--radius-card)] bg-card shadow-[var(--shadow-card)] md:grid-cols-2">
        <BrandPanel copy={REGISTER_COPY.brand} />
        <RegisterForm />
      </div>
    </main>
  )
}

export default RegisterPage
