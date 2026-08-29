import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check, AlertCircle, Github, Linkedin, Instagram, ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import CopyEmail from "./CopyEmail";
import Reveal from "./Reveal";

/**
 * IMPORTANT:
 * The FormSubmit recipient is configured via its hash, which FormSubmit
 * ties to the email account that activated the address. We keep the
 * existing hash so form submission continues to work; the *visible* email
 * is the new one (see `VISIBLE_EMAIL`).
 */
const FORMSUBMIT_HASH = "461b982e7ee2afee2721432c7ea971fa";
const VISIBLE_EMAIL = "nevilbiju.dev@gmail.com";
const EASE = [0.22, 1, 0.36, 1];

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const res = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_HASH}`, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("Form submission failed");
      form.reset();
      setStatus("success");
      window.setTimeout(() => setStatus("idle"), 4500);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try emailing me directly.");
      setStatus("error");
      window.setTimeout(() => setStatus("idle"), 5000);
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
                <CopyEmail email={VISIBLE_EMAIL} />
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
