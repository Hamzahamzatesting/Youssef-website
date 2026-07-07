import { useState } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "motion/react";
import { Aperture, Loader2, ShieldCheck, Sparkles, Images } from "lucide-react";
import { useAuth } from "@/features/auth/useAuth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { isSupabaseConfigured } from "@/lib/supabaseClient";

const features = [
  { icon: Images, text: "Media, portfolio & homepage in one place" },
  { icon: Sparkles, text: "Changes feel instant — no dev needed" },
  { icon: ShieldCheck, text: "Private login, only you can edit" },
];

export function LoginPage() {
  const { signIn, isAuthenticated, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!loading && isAuthenticated) return <Navigate to="/" replace />;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) setError(error.message);
  }

  return (
    <div className="flex min-h-screen bg-navy-deep">
      {/* Left — brand panel */}
      <div className="relative hidden w-[42%] flex-col justify-between overflow-hidden bg-gradient-to-br from-navy via-navy to-navy-dark p-12 lg:flex">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #ffb443, transparent 70%)" }}
        />

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
            <Aperture size={19} className="text-white" />
          </div>
          <span className="font-display text-xl text-white">Prodyous</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <h1 className="font-display text-4xl leading-[1.05] text-white">
            Run your site
            <br />
            without touching
            <br />
            <span className="text-white/50">a line of code.</span>
          </h1>
          <div className="mt-10 space-y-4">
            {features.map((f, i) => (
              <motion.div
                key={f.text}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
                className="flex items-center gap-3 text-sm text-white/60"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.07] ring-1 ring-white/10">
                  <f.icon size={14} className="text-white/80" />
                </span>
                {f.text}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <p className="relative text-xs text-white/25">ProdYous Visual Production Agency · Morocco</p>
      </div>

      {/* Right — form */}
      <div className="flex flex-1 items-center justify-center bg-surface-muted px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm rounded-3xl bg-white p-9 shadow-[var(--shadow-lift)]"
        >
          <div className="mb-2 flex items-center gap-3 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy text-white">
              <Aperture size={17} />
            </div>
            <span className="font-display text-lg text-ink">Prodyous Admin</span>
          </div>
          <h2 className="font-display text-2xl text-ink">Welcome back</h2>
          <p className="mt-1.5 mb-7 text-sm text-ink/45">Sign in to manage your site</p>

          {!isSupabaseConfigured && (
            <div className="mb-5 rounded-xl border border-amber-300 bg-amber-50 px-3.5 py-3 text-xs leading-relaxed text-amber-800">
              Supabase isn't configured yet. Copy <code>admin/.env.example</code> to{" "}
              <code>admin/.env.local</code> and fill in your project's URL and anon key, then restart the
              dev server.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
            <Input
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            {error && <p className="text-xs text-red-600">{error}</p>}
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting && <Loader2 size={15} className="animate-spin" />}
              Sign in
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
