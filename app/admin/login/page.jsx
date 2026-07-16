import Image from "next/image";

export const metadata = {
  title: "Admin Login | Montex Technical Services L.L.C"
};

export default async function AdminLoginPage({ searchParams }) {
  const params = await searchParams;
  const hasError = params?.error === "invalid";
  const setupRequired = params?.setup === "required";
  const next = params?.next?.startsWith("/admin") ? params.next : "/admin";

  return (
    <main className="adminLoginPage">
      <section className="adminLoginPanel">
        <Image src="/assets/logo.jpg" alt="Montex Technical Services L.L.C" width={210} height={50} priority />
        <div>
          <p className="label arrow">Secure Admin</p>
          <h1>Admin Login</h1>
          <p>Access is restricted to authorized Montex website administrators.</p>
        </div>

        {setupRequired ? (
          <p className="loginAlert">
            Admin credentials are not configured. Add the required environment variables before using the panel.
          </p>
        ) : null}

        {hasError ? (
          <p className="loginAlert">Invalid username or password.</p>
        ) : null}

        <form className="loginForm" action="/api/admin/login" method="post">
          <input name="next" type="hidden" value={next} />
          <label>
            Username
            <input name="username" type="text" autoComplete="username" required />
          </label>
          <label>
            Password
            <input name="password" type="password" autoComplete="current-password" required />
          </label>
          <button className="btn btnGold" type="submit">Login Securely <span>→</span></button>
        </form>
      </section>
    </main>
  );
}
