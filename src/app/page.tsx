import JwtDecoder from "../components/JwtDecoder";
import { MdCode } from "react-icons/md";

const SITE_URL = "https://miguelacm.es/tools/jwt-decoder";
const EMBED_URL = "https://miguelacm.es/embed/jwt-decoder";

const features = [
  {
    icon: "🔓",
    title: "Header + Payload",
    desc: "Decodifica las dos partes visibles del JWT con base64url y las muestra como JSON formateado con resaltado de sintaxis por colores.",
  },
  {
    icon: "⏰",
    title: "Verificación exp",
    desc: "Detecta automáticamente el claim exp y muestra si el token ha expirado, incluyendo la fecha y hora exacta de expiración.",
  },
  {
    icon: "🏷️",
    title: "Claims estándar",
    desc: "Identifica y muestra los claims estándar RFC 7519: sub, iss, aud, iat, exp, nbf y jti de forma legible.",
  },
];

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      {/* Hero */}
      <div className="mb-10 text-center">
        <h1 className="mb-3 text-3xl font-bold tracking-tight gradient-text">
          Decodificador JWT Online
        </h1>
        <p className="text-text-muted">
          Decodifica cualquier JWT al instante. Header, payload, claims y verificación de expiración.
        </p>
      </div>

      {/* Tool */}
      <div className="glass mb-10 rounded-2xl p-6">
        <JwtDecoder locale="es" />
      </div>

      {/* Features */}
      <section className="mb-10">
        <h2 className="mb-5 text-xl font-semibold text-text">Características</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="glass rounded-xl p-5">
              <div className="mb-2 text-2xl">{f.icon}</div>
              <h3 className="mb-1 font-semibold text-text">{f.title}</h3>
              <p className="text-sm text-text-muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How to use */}
      <section className="mb-10">
        <h2 className="mb-5 text-xl font-semibold text-text">Cómo usar</h2>
        <ol className="space-y-3 text-sm text-text-muted">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">1</span>
            <p>Pega tu token JWT en el campo de texto. Puedes usar el botón "Cargar ejemplo" para probar con un JWT de muestra.</p>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">2</span>
            <p>El decodificador mostrará automáticamente el header y el payload como JSON formateado con resaltado de sintaxis.</p>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">3</span>
            <p>Si el token contiene el claim exp, verás si está expirado o no, junto con la fecha y hora exacta.</p>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">4</span>
            <p>Usa los botones de copia para copiar el header o payload formateado al portapapeles con un clic.</p>
          </li>
        </ol>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="mb-5 text-xl font-semibold text-text">Preguntas frecuentes</h2>
        <div className="space-y-5">
          <div>
            <h3 className="mb-1 font-medium text-text">¿Qué es un JWT?</h3>
            <p className="text-sm text-text-muted">
              Un JSON Web Token (JWT) es un estándar abierto (RFC 7519) para transmitir información de forma segura entre partes como un objeto JSON. Consta de tres partes separadas por puntos: header, payload y signature.
            </p>
          </div>
          <div>
            <h3 className="mb-1 font-medium text-text">¿Es seguro pegar mi JWT aquí?</h3>
            <p className="text-sm text-text-muted">
              Sí. Toda la decodificación ocurre en tu navegador. Ningún dato se envía a ningún servidor. Sin embargo, evita compartir tokens de producción con permisos sensibles en herramientas públicas.
            </p>
          </div>
          <div>
            <h3 className="mb-1 font-medium text-text">¿Puedo verificar la firma del JWT?</h3>
            <p className="text-sm text-text-muted">
              No. Esta herramienta solo decodifica el header y el payload (que son base64url). La verificación de firma requiere la clave secreta o la clave pública del emisor.
            </p>
          </div>
          <div>
            <h3 className="mb-1 font-medium text-text">¿Qué son los claims estándar?</h3>
            <p className="text-sm text-text-muted">
              Los claims estándar definidos en RFC 7519 son: sub (subject), iss (issuer), aud (audience), iat (issued at), exp (expiration), nbf (not before) y jti (JWT ID). Esta herramienta los detecta y muestra de forma legible.
            </p>
          </div>
          <div>
            <h3 className="mb-1 font-medium text-text">¿Qué pasa si el JWT está mal formado?</h3>
            <p className="text-sm text-text-muted">
              El decodificador mostrará un mensaje de error claro indicando que el JWT no tiene el formato correcto (tres partes separadas por puntos con JSON base64url válido en header y payload).
            </p>
          </div>
        </div>
      </section>

      {/* Embed */}
      <section className="mb-10">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-text">
          <MdCode className="text-primary" />
          Embeber en tu web
        </h2>
        <p className="mb-4 text-sm text-text-muted">
          Copia este iframe y pégalo en tu HTML para incluir el decodificador en tu web:
        </p>
        <pre className="overflow-x-auto rounded-xl border border-border/30 bg-surface/60 p-4 font-mono text-xs text-text-muted">
{`<iframe
  src="${EMBED_URL}"
  width="100%"
  height="700"
  style="border:none;border-radius:12px;"
  title="JWT Decoder — miguelacm.es"
  loading="lazy"
></iframe>`}
        </pre>
        <p className="mt-3 text-xs text-text-muted/60">
          Demo completa:{" "}
          <a href={SITE_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            {SITE_URL}
          </a>
        </p>
      </section>
    </main>
  );
}
