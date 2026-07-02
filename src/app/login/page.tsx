import BrandPanel from "@/layout/auth/BrandPanel"
import LoginForm from "@/layout/login/LoginForm"

import { LOGIN_COPY } from "@/lib/copy"

const LoginPage = () => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background">
      <div className="grid min-h-screen w-full grid-cols-1 overflow-hidden rounded-[var(--radius-card)] bg-card shadow-[var(--shadow-card)] md:grid-cols-2">
        <BrandPanel copy={LOGIN_COPY.brand} />
        <LoginForm />
      </div>
    </main>
  )
}

export default LoginPage
