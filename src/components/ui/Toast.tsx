import type { ToastMessage } from "../../types";
import { Badge } from "./Badge";

export function Toasts({ messages }: { messages: ToastMessage[] }) {
  if (!messages.length) return null;
  return (
    <div className="fixed bottom-24 right-4 z-[60] grid gap-3 md:bottom-5" aria-live="polite">
      {messages.map((message) => (
        <div key={message.id} className="rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-surface-raised)] p-3 shadow-[var(--shadow-float)]">
          <Badge tone={message.tone === "success" ? "accent" : message.tone === "error" ? "danger" : "warning"}>{message.text}</Badge>
        </div>
      ))}
    </div>
  );
}
