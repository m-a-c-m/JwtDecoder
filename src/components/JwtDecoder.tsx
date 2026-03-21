"use client";

import { useState, useCallback, useMemo } from "react";
import { FiCopy, FiCheck, FiAlertTriangle, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { MdLock } from "react-icons/md";

interface Props {
  locale?: string;
}

function base64UrlDecode(str: string): string {
  let s = str.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4 !== 0) s += "=";
  try {
    return decodeURIComponent(
      atob(s)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );
  } catch {
    return atob(s);
  }
}

function syntaxHighlight(json: string): string {
  return json.replace(
    /("(\\u[\dA-Fa-f]{4}|\\[^u]|[^\\"])*"(?:\s*:)?|\b(?:true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
    (match) => {
      let cls = "text-yellow-400"; // number
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "text-blue-400"; // key
        } else {
          cls = "text-green-400"; // string
        }
      } else if (/true|false/.test(match)) {
        cls = "text-orange-400";
      } else if (/null/.test(match)) {
        cls = "text-red-400";
      }
      return `<span class="${cls}">${match}</span>`;
    }
  );
}

interface Decoded {
  header: Record<string, unknown> | null;
  payload: Record<string, unknown> | null;
  signature: string;
  headerRaw: string;
  payloadRaw: string;
  error: string | null;
}

function decodeJWT(token: string): Decoded {
  const parts = token.trim().split(".");
  if (parts.length !== 3) {
    return {
      header: null,
      payload: null,
      signature: "",
      headerRaw: "",
      payloadRaw: "",
      error: "JWT must have exactly 3 parts separated by dots",
    };
  }
  try {
    const headerRaw = base64UrlDecode(parts[0]);
    const payloadRaw = base64UrlDecode(parts[1]);
    const header = JSON.parse(headerRaw) as Record<string, unknown>;
    const payload = JSON.parse(payloadRaw) as Record<string, unknown>;
    return {
      header,
      payload,
      signature: parts[2],
      headerRaw: JSON.stringify(header, null, 2),
      payloadRaw: JSON.stringify(payload, null, 2),
      error: null,
    };
  } catch {
    return {
      header: null,
      payload: null,
      signature: "",
      headerRaw: "",
      payloadRaw: "",
      error: "Invalid JWT — could not parse header or payload",
    };
  }
}

function ExpiryBadge({ payload, isEs }: { payload: Record<string, unknown>; isEs: boolean }) {
  const exp = payload.exp as number | undefined;
  if (!exp) return null;
  const now = Math.floor(Date.now() / 1000);
  const expired = now > exp;
  const date = new Date(exp * 1000);
  const iat = payload.iat as number | undefined;

  return (
    <div
      className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm ${
        expired
          ? "border-red-500/30 bg-red-500/10 text-red-400"
          : "border-green-500/30 bg-green-500/10 text-green-400"
      }`}
    >
      {expired ? <FiXCircle /> : <FiCheckCircle />}
      <span>
        {expired
          ? isEs
            ? `Token expirado el ${date.toLocaleString()}`
            : `Token expired on ${date.toLocaleString()}`
          : isEs
          ? `Expira el ${date.toLocaleString()}`
          : `Expires on ${date.toLocaleString()}`}
        {iat && (
          <span className="ml-2 text-xs opacity-70">
            {isEs ? `(emitido ${new Date(iat * 1000).toLocaleString()})` : `(issued ${new Date(iat * 1000).toLocaleString()})`}
          </span>
        )}
      </span>
    </div>
  );
}

function CopyBtn({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        });
      }}
      disabled={!text}
      className="inline-flex items-center gap-1.5 rounded-lg border border-border/30 bg-surface/60 px-3 py-1 text-xs text-text-muted transition-colors hover:border-primary/30 hover:text-primary disabled:opacity-30"
    >
      {copied ? <FiCheck className="text-green-400" /> : <FiCopy />}
      {copied ? (label === "Header" ? "✓" : "✓") : label}
    </button>
  );
}

const SAMPLE_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

export default function JwtDecoder({ locale = "es" }: Props) {
  const isEs = locale === "es";
  const [token, setToken] = useState("");

  const decoded = useMemo<Decoded | null>(() => {
    if (!token.trim()) return null;
    return decodeJWT(token);
  }, [token]);

  const loadSample = useCallback(() => setToken(SAMPLE_JWT), []);

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm font-medium text-text-muted">
            <MdLock className="text-primary" />
            {isEs ? "Token JWT" : "JWT Token"}
          </label>
          <button
            onClick={loadSample}
            className="text-xs text-primary/70 transition-colors hover:text-primary"
          >
            {isEs ? "Cargar ejemplo" : "Load sample"}
          </button>
        </div>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder={isEs ? "Pega tu JWT aquí…  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9…" : "Paste your JWT here…  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9…"}
          rows={4}
          className="w-full resize-none rounded-xl border border-border/30 bg-surface/60 p-4 font-mono text-xs text-text placeholder:text-text-muted/30 outline-none transition-colors focus:border-primary/50"
        />
      </div>

      {decoded?.error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          <FiAlertTriangle />
          {decoded.error}
        </div>
      )}

      {decoded && !decoded.error && decoded.payload && (
        <>
          {/* Expiry check */}
          <ExpiryBadge payload={decoded.payload} isEs={isEs} />

          {/* Structure */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* Header */}
            <div className="rounded-xl border border-blue-500/20 bg-surface/40 lg:col-span-1">
              <div className="flex items-center justify-between border-b border-border/20 px-4 py-2.5">
                <span className="text-xs font-semibold text-blue-400">HEADER</span>
                <CopyBtn text={decoded.headerRaw} label="Header" />
              </div>
              <pre
                className="overflow-x-auto p-4 font-mono text-xs leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: syntaxHighlight(decoded.headerRaw),
                }}
              />
            </div>

            {/* Payload */}
            <div className="rounded-xl border border-green-500/20 bg-surface/40 lg:col-span-2">
              <div className="flex items-center justify-between border-b border-border/20 px-4 py-2.5">
                <span className="text-xs font-semibold text-green-400">PAYLOAD</span>
                <CopyBtn text={decoded.payloadRaw} label="Payload" />
              </div>
              <pre
                className="overflow-x-auto p-4 font-mono text-xs leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: syntaxHighlight(decoded.payloadRaw),
                }}
              />
            </div>
          </div>

          {/* Signature */}
          <div className="rounded-xl border border-orange-500/20 bg-surface/40">
            <div className="flex items-center gap-3 border-b border-border/20 px-4 py-2.5">
              <span className="text-xs font-semibold text-orange-400">SIGNATURE</span>
              <span className="text-xs text-text-muted/50">
                {isEs
                  ? "(No verificable sin la clave secreta)"
                  : "(Not verifiable without the secret key)"}
              </span>
            </div>
            <p className="overflow-x-auto p-4 font-mono text-xs text-orange-300/70 break-all">
              {decoded.signature}
            </p>
          </div>

          {/* Standard claims */}
          {decoded.payload && (
            <div className="rounded-xl border border-border/20 bg-surface/40 p-4">
              <p className="mb-3 text-xs font-semibold text-text-muted">
                {isEs ? "Claims estándar detectados:" : "Standard claims detected:"}
              </p>
              <div className="flex flex-wrap gap-2">
                {(["sub", "iss", "aud", "iat", "exp", "nbf", "jti"] as const).map((claim) => {
                  const val = (decoded.payload as Record<string, unknown>)[claim];
                  if (val === undefined) return null;
                  const display =
                    claim === "iat" || claim === "exp" || claim === "nbf"
                      ? new Date((val as number) * 1000).toISOString()
                      : String(val);
                  return (
                    <span
                      key={claim}
                      className="rounded-full border border-border/30 bg-surface/60 px-3 py-1 font-mono text-xs"
                    >
                      <span className="text-blue-400">{claim}</span>
                      <span className="text-text-muted/60">: </span>
                      <span className="text-green-400">{display}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
