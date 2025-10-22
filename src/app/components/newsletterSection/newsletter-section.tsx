"use client";
import styles from "./newsletter-section.module.css";
import { Logo } from "../logo/logo";
import { motion } from "framer-motion";
import { Form } from "radix-ui";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export const NewsletterSection = () => {
  return (
    <>
      <section className={styles.container}>
        <div>
          <div className={styles.logoContainer}>
            <Logo size="xl" animated="constant"></Logo>
          </div>

          <div className={styles.textContent}>
            <h2>Subsribe to our newsletter</h2>

            <Form.Root className={styles.form}>
              <Form.Field className={styles.formField} name="email">
                <VisuallyHidden>
                  <Form.Label className={styles.formLabel}>Email</Form.Label>
                </VisuallyHidden>
                <Form.Message
                  className={styles.formMessage}
                  match="valueMissing"
                >
                  *Please enter your email
                </Form.Message>
                <Form.Message
                  className={styles.formMessage}
                  match="typeMismatch"
                >
                  *Please provide a valid email
                </Form.Message>
                <div className={styles.inputButtonContainer}>
                  <Form.Control asChild>
                    <input
                      placeholder="Email Address"
                      autoComplete="off"
                      className={styles.input}
                      type="email"
                      required
                    ></input>
                  </Form.Control>
                  <Form.Submit asChild>
                    <motion.div
                      className={styles.buttonContainer}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                    >
                      <button className={styles.button}>
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Subscribe
                        </motion.span>
                      </button>
                    </motion.div>
                  </Form.Submit>
                </div>
              </Form.Field>
            </Form.Root>

            <p>
              By submitting this form, you agree to our privacy policy and terms
              of service. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
