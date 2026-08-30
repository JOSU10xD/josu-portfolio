import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check, AlertCircle, Github, Linkedin, Instagram, ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import CopyEmail from "./CopyEmail";
import Reveal from "./Reveal";

/**
 * Recipient address used by the form. We post to FormSubmit's AJAX
 * endpoint using the email directly in the URL — FormSubmit accepts
 * either an activated hash OR a plain email. Using the email keeps the
 * submission routed to the correct inbox (`nevilbiju.dev@gmail.com`)
 * without depending on the prior hash being re-activated for this
 * address. The first submission triggers FormSubmit's standard
 * confirmation email to the recipient; once acknowledged, all
 * subsequent submissions are delivered.
 */
const RECIPIENT_EMAIL = "nevilbiju.dev@gmail.com";
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`;
const EASE = [0.22, 1, 0.36, 1];

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [error, setError] = useState("");
  const submittingRef = useRef(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Guard against double-submission (rapid clicks, Enter spam, etc.)
    if (submittingRef.current) return;
    submittingRef.current = true;

    setStatus("sending");
    setError("");

    const form = e.currentTarget;

    // Client-side validation: ensure the visible required fields are
    // non-empty before hitting the network. The FormSubmit honeypot
    // blocks spam — we leave it as an empty string here.
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !subject || !message) {
      setError("Please fill in every field before sending.");
      setStatus("error");
      submittingRef.current = false;
      window.setTimeout(() => setStatus("idle"), 5000);
      return;
    }
    // Basic email shape check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("That email address doesn't look right — please double-check it.");
      setStatus("error");
      submittingRef.current = false;
      window.setTimeout(() => setStatus("idle"), 5000);
      return;
    }

    try {
      // Force the reply-to header on the delivered email so the
      // recipient can reply directly to the sender without setting up
      // mailto mappings. FormSubmit copies the value of `_replyto` into
      // the Reply-To header.
      data.set("_replyto", email);
      // Override the static subject with the user's subject so the
      // inbox row reads as the visitor's topic, not the static label.
      data.set(
        "_subject",
        `Portfolio · ${subject} — from ${name}`
      );

      const res = await fetch(FORMSUBMIT_URL, {
        method: "POST",
        body: data,
        // FormSubmit's AJAX endpoint accepts multipart/form-data and
        // returns JSON. Setting `Accept: application/json` is what
        // makes it pick the JSON branch. We deliberately do NOT set
        // a Content-Type header — the browser will set the correct
        // multipart boundary automatically.
        headers: { Accept: "application/json" },
        // No credentials needed for the public FormSubmit endpoint.
        credentials: "omit",
        mode: "cors",
      });

      // FormSubmit returns 200 + `{ success: "..." }` on accepted
      // submissions, 400/422/500 on errors, and may return a 404
      // (HTML page) if the recipient hasn't activated their address
      // yet. Treat anything that's not a 2xx as a failure.
      if (!res.ok) {
        let detail = "";
        try {
          const j = await res.json();
          detail = j?.message || j?.error || "";
        } catch {
          // body wasn't JSON — FormSubmit likely returned an HTML page
        }
        throw new Error(
          detail || `FormSubmit returned HTTP ${res.status}`
        );
      }

      // Some 2xx responses still report failure in the JSON body
      // (e.g. `{ success: "false", message: "..." }` is not the
      // format, but FormSubmit uses `{ success: "true|Thank you..." }`).
      // Inspect the body to be safe.
      let payload = null;
      try {
        payload = await res.json();
      } catch {
        // Not JSON, but status was 2xx — accept the success.
      }
      if (payload && payload.success === false) {
        throw new Error(payload.message || "Form rejected the submission.");
      }

      form.reset();
      setStatus("success");
      window.setTimeout(() => setStatus("idle"), 4500);
    } catch (err) {
      console.error("[Contact] form submission failed:", err);
      setError(
        "Something went wrong. Please try emailing me directly at " +
          RECIPIENT_EMAIL +
          "."
      );
      setStatus("error");
      window.setTimeout(() => setStatus("idle"), 5000);
    } finally {
      submittingRef.current = false;
    }
  };

  return (
    <section id="contact" className="section section-divider" aria-label="Contact">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: pitch + direct contact */}
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Contact"
              title={
                <>
                  Let&rsquo;s build{" "}
                  <span className="font-serif italic font-normal">
                    something
                  </span>
                  .
                </>
              }
              description="Open to full-time roles, freelance engagements, and interesting collaborations. The fastest way to reach me is email — I usually reply within a day."
            />

            <Reveal delay={150} className="mt-8 flex flex-col gap-7">
              <div>
                <p className="eyebrow mb-3">Email</p>
                <CopyEmail email={RECIPIENT_EMAIL} />
              </div>

              <div>
                <p className="eyebrow mb-3">Find me online</p>
                <div className="flex flex-wrap items-center gap-2">
                  <ContactSocial
                    href="https://github.com/JOSU10xD"
                    label="GitHub"
                    icon={<Github className="h-4 w-4" />}
                  />
                  <ContactSocial
                    href="https://www.linkedin.com/in/nevil-biju"
                    label="LinkedIn"
                    icon={<Linkedin className="h-4 w-4" />}
                  />
                  <ContactSocial
                    href="https://www.instagram.com/josu10_03"
                    label="Instagram"
                    icon={<Instagram className="h-4 w-4" />}
                  />
                </div>
              </div>

              <div>
                <p className="eyebrow mb-2">Based in</p>
                <p className="body-md text-[color:var(--text-primary)]">
                  Kerala, India · open to remote
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-7">
            <Reveal>
              <form
                onSubmit={onSubmit}
                className="surface rounded-2xl p-6 md:p-8 flex flex-col gap-5"
                noValidate
                action={FORMSUBMIT_URL}
                method="POST"
              >
                <input
                  type="text"
                  name="_honey"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />
                <input
                  type="hidden"
                  name="_subject"
                  value="New message from portfolio — Nevil Biju"
                />
                <input
                  type="hidden"
                  name="_next"
                  value="https://josu10xd.github.io/josu-portfolio/#contact"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="field">
                    <label htmlFor="c-name" className="field-label">
                      Name
                    </label>
                    <input
                      id="c-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      className="field-input"
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="c-email" className="field-label">
                      Email
                    </label>
                    <input
                      id="c-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="field-input"
                    />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="c-subject" className="field-label">
                    Subject
                  </label>
                  <input
                    id="c-subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="A quick line on what it's about"
                    className="field-input"
                  />
                </div>

                <div className="field">
                  <label htmlFor="c-message" className="field-label">
                    Message
                  </label>
                  <textarea
                    id="c-message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me a bit about your project, role, or question…"
                    className="field-textarea"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                  <p className="text-[0.78rem] text-[color:var(--text-muted)]">
                    I&rsquo;ll only use this to reply to your message.
                  </p>
                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn btn-primary min-w-[150px]"
                    whileTap={{ scale: 0.97 }}
                  >
                    {status === "sending" ? (
                      <>
                        <span
                          className="inline-block h-3.5 w-3.5 rounded-full border-2 border-black/30 border-t-black animate-spin"
                          aria-hidden
                        />
                        Sending…
                      </>
                    ) : status === "success" ? (
                      <>
                        <Check className="h-4 w-4" />
                        Sent
                      </>
                    ) : (
                      <>
                        Send message
                        <Send className="h-3.5 w-3.5" />
                      </>
                    )}
                  </motion.button>
                </div>

                <AnimatePresence>
                  {status === "success" && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="rounded-xl border border-emerald-400/30 bg-emerald-400/[0.06] px-4 py-3 text-[0.88rem] text-emerald-200/90"
                      role="status"
                    >
                      Thanks — your message is on its way. I&rsquo;ll get back
                      to you shortly.
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="flex items-start gap-2 rounded-xl border border-rose-400/30 bg-rose-400/[0.06] px-4 py-3 text-[0.88rem] text-rose-200/90"
                      role="alert"
                    >
                      <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>
                        {error ||
                          "Something went wrong. Please email me directly."}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSocial({ href, label, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 h-10 px-4 rounded-full border border-[color:var(--border-subtle)] bg-white/[0.02] hover:bg-white/[0.06] hover:border-[color:var(--border-default)] text-[0.88rem] text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] transition-all"
    >
      {icon}
      {label}
      <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
    </a>
  );
}
