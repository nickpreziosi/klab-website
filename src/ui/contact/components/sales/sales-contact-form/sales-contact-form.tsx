/**
 * Sales Contact Form Component
 *
 * A comprehensive contact form for sales inquiries with:
 * - Multi-field form with validation (company info, product interest, country selection)
 * - Client and server-side validation using Zod
 * - reCAPTCHA spam protection
 * - Success/error state management with animations
 * - Form reset and reCAPTCHA reset on successful submission
 *
 * @route /contact/sales
 */

"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslations } from "next-intl";
import { Combobox as KLabCombobox } from "@/ui/shared/components/combobox/combobox";
import { countries } from "@/ui/shared/utils/countries";
import { cn } from "@/ui/shared/utils/utils";
import styles from "./sales-contact-form.module.css";
import HeroText from "@/ui/shared/components/hero-text/hero-text";
import Button from "@/ui/shared/components/button/button";
import { FormField, FormFieldInput } from "@/ui/shared/components/form-field/form-field";
import { Checkbox } from "@/ui/shared/components/checkbox/checkbox";
import { toast } from "sonner";

const NAME_MIN = 2;
const NAME_MAX = 100;
const PHONE_MIN_DIGITS = 10;
const PHONE_MAX_DIGITS = 15;
const MESSAGE_MIN = 10;
const phoneDigitCount = (val: string) => val.replace(/\D/g, "").length;

const companyTypeIds = [
  "automotive",
  "construction",
  "consumer-package-goods",
  "food-grocery-convenience",
  "food-beverage-industry",
  "franchise",
  "retail",
  "technology-electronics",
  "truck-freight-industry",
  "other",
];
const productIds = [
  "krails",
  "kena",
  "kcard",
  "kleads",
  "ktalk",
  "kaxis",
  "krisk",
  "kai",
  "kabl",
  "kbpm",
  "kim",
  "other",
];
const countryComboboxOptions = countries.map((c) => ({ value: c.value, label: c.label }));
const countryIds = countries.map((c) => c.value);

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  position?: string;
  companyWebsite?: string;
  companyType?: string;
  product?: string;
  country: string;
  message: string;
  emailUpdates?: boolean;
  recaptcha: string;
};

type SalesContactFormProps = {
  /** When true, skip entrance animations (e.g. locale switch). */
  skipAnimation?: boolean;
};

/**
 * Main Sales Contact Form Component
 */
export function SalesContactForm({ skipAnimation = false }: SalesContactFormProps = {}) {
  const t = useTranslations("salesForm");
  const recaptchaRefNew = useRef<ReCAPTCHA>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const formSchema = useMemo(
    () =>
      z.object({
        firstName: z
          .string()
          .min(NAME_MIN, t("validation.firstNameMin"))
          .max(NAME_MAX, t("validation.firstNameMax")),
        lastName: z
          .string()
          .min(NAME_MIN, t("validation.lastNameMin"))
          .max(NAME_MAX, t("validation.lastNameMax")),
        email: z.string().email(t("validation.emailInvalid")),
        phone: z
          .string()
          .min(1, t("validation.phoneRequired"))
          .refine(
            (val) => {
              const digits = phoneDigitCount(val);
              return digits >= PHONE_MIN_DIGITS && digits <= PHONE_MAX_DIGITS;
            },
            { message: t("validation.phoneInvalid") }
          ),
        company: z.string(),
        position: z.string().optional(),
        companyWebsite: z
          .string()
          .optional()
          .refine(
            (val) => {
              if (!val || val.trim() === "") return true;
              const domainOrUrlPattern =
                /^((https?:\/\/)?(www\.)?)?[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+([\/?#].*)?$/;
              return domainOrUrlPattern.test(val);
            },
            { message: t("validation.companyWebsiteInvalid") }
          ),
        companyType: z.string().optional(),
        product: z.string().optional(),
        country: z
          .string()
          .min(1, t("validation.countryRequired"))
          .refine((val) => countryIds.includes(val), t("validation.countryInvalid")),
        message: z.string().min(MESSAGE_MIN, t("validation.messageMin")),
        emailUpdates: z.boolean().default(false),
        recaptcha: z.string().min(1, t("validation.recaptchaRequired")),
      }),
    [t]
  );

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  }, [isSuccess]);

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
    setValue,
    reset,
    trigger,
  } = useForm({
    resolver: zodResolver(formSchema) as never,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      position: "",
      companyWebsite: "",
      companyType: "",
      product: "",
      country: "",
      message: "",
      emailUpdates: false,
      recaptcha: "",
    },
    mode: "onTouched", // validate on first blur; we revalidate on change via Controller so errors clear when valid
  });

  /**
   * Handles form submission:
   * 1. Creates FormData object with all form fields
   * 2. Sends POST request to /api/contact/sales
   * 3. Handles validation errors and displays user-friendly messages
   * 4. Resets form and reCAPTCHA on success
   * 5. Shows success view with animation
   */
  const onSubmit = async (data: FormData) => {
    setSubmitStatus({ type: null, message: "" });

    try {
      // Create FormData object for multipart/form-data submission
      const formData = new FormData();

      // Append all form fields
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("company", data.company);
      formData.append("position", data.position ?? "");
      formData.append("companyWebsite", data.companyWebsite ?? "");
      formData.append("companyType", data.companyType ?? "");
      formData.append("product", data.product ?? "");
      formData.append("country", data.country);
      formData.append("message", data.message);
      formData.append("recaptcha", data.recaptcha);

      // Send form data to API route
      const response = await fetch("/api/contact/sales", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle validation errors from server
        // Server returns detailed validation errors in result.details array
        if (result.details && Array.isArray(result.details)) {
          const errorMessages = result.details
            .map((detail: { message?: string; path?: string[] }) => {
              const field = detail.path?.[0] || "field";
              return detail.message || `${field} is invalid`;
            })
            .join(", ");
          throw new Error(errorMessages || result.error || "Validation failed");
        }
        throw new Error(result.error || result.details || "Failed to submit inquiry");
      }

      // Success: reset form, clear reCAPTCHA, show success view (errors use toast)
      const successMessage = result.message || "Inquiry submitted successfully!";
      reset();
      recaptchaRefNew.current?.reset();
      setIsSuccess(true);
      setSubmitStatus({ type: "success", message: successMessage });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to submit inquiry. Please try again.";
      console.error("Form submission error:", error);
      console.log("Sales form submission error", {
        error: errorMessage,
        values: { ...data, recaptcha: data.recaptcha ? "[redacted]" : "" },
      });
      toast.error(errorMessage);
      // Reset reCAPTCHA on error so user can try again
      recaptchaRefNew.current?.reset();
      setValue("recaptcha", "");
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Debug submit: log form values to console. Use this to verify values before switching to onSubmit.
   * Pass as third arg to handleRecaptchaAndSubmit(e, recaptchaRefNew, onSubmitLog).
   */
  const onSubmitLog = (data: FormData) => {
    console.log("Sales form values (first form):", data);
    setIsSubmitting(false);
  };

  /**
   * Custom submit handler that executes reCAPTCHA before form submission.
   * This ensures reCAPTCHA is completed before form validation runs.
   * @param recaptchaRefToUse - which ReCAPTCHA instance to run (default: recaptchaRefNew)
   * @param submitHandler - which handler to run after validation (default: onSubmit). Use onSubmitLog to debug.
   */
  const handleRecaptchaAndSubmit = async (
    e: React.FormEvent,
    recaptchaRefToUse: React.RefObject<ReCAPTCHA | null> = recaptchaRefNew,
    submitHandler: (data: FormData) => void | Promise<void> = onSubmit
  ) => {
    if (submitHandler !== onSubmit) {
      console.log(
        "Sales form: using non-default submit handler",
        submitHandler.name || "(anonymous)"
      );
    }
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Invisible reCAPTCHA can hang on second executeAsync() if not reset. Timeout so we never get stuck.
      const RECAPTCHA_TIMEOUT_MS = 15_000;
      const tokenPromise = recaptchaRefToUse.current?.executeAsync() ?? Promise.resolve(null);
      const timeoutPromise = new Promise<null>((_, reject) =>
        setTimeout(() => reject(new Error("reCAPTCHA timed out")), RECAPTCHA_TIMEOUT_MS)
      );
      const token = await Promise.race([tokenPromise, timeoutPromise]);
      setValue("recaptcha", token || "");
      const wrappedHandler = async (data: FormData) => {
        try {
          await submitHandler(data);
        } finally {
          setIsSubmitting(false);
        }
      };
      const onInvalid = () => {
        setIsSubmitting(false);
        recaptchaRefToUse.current?.reset();
        setValue("recaptcha", "");
      };
      const runSubmit = handleSubmit(wrappedHandler, onInvalid);
      await runSubmit();
      setIsSubmitting(false);
    } catch (error) {
      console.error("reCAPTCHA execution error:", error);
      setIsSubmitting(false);
      recaptchaRefToUse.current?.reset();
      setValue("recaptcha", "");
      if (error instanceof Error && error.message === "reCAPTCHA timed out") {
        toast.error(t("recaptchaTimeout"));
      }
    }
  };

  // Success view
  if (isSuccess) {
    return (
      <motion.div
        initial={skipAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: skipAnimation ? 0 : 0.5 }}
        className={styles.formContainer}
      >
        <div className={styles.successContainer}>
          <motion.div
            initial={skipAnimation ? { scale: 1 } : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={
              skipAnimation
                ? { duration: 0 }
                : { type: "spring", stiffness: 200, damping: 15, delay: 0.2 }
            }
            className={styles.successIcon}
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          </motion.div>
          <motion.div
            initial={skipAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: skipAnimation ? 0 : 0.4, duration: skipAnimation ? 0 : 0.5 }}
            className={styles.successContent}
          >
            <HeroText maxWidth="800px" text={t("successHeadline")} center={true} skipAnimation={skipAnimation} />
            <p className={styles.successMessage}>{t("successBody")}</p>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Form view
  return (
    <motion.div
      initial={skipAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: skipAnimation ? 0 : 0.5 }}
      className={styles.formContainer}
    >
      <div className={styles.headingContainer}>
        <HeroText maxWidth="720px" text={t("formHeadline")} center={true} skipAnimation={skipAnimation}></HeroText>
      </div>
      <motion.div
        initial={skipAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: skipAnimation ? 0 : 0.3, delay: skipAnimation ? 0 : 0.55 }}
        className={styles.headerEmailRow}
      >
        <a className={styles.headerEmailLink} href="mailto:sales@k-lab.ai">
          <span className={styles.headerEmailIcon} aria-hidden="true">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 2C0.447715 2 0 2.44772 0 3V12C0 12.5523 0.447715 13 1 13H14C14.5523 13 15 12.5523 15 12V3C15 2.44772 14.5523 2 14 2H1ZM1 3L14 3V3.92494C13.9174 3.92486 13.8338 3.94751 13.7589 3.99505L7.5 7.96703L1.24112 3.99505C1.16621 3.94751 1.0826 3.92486 1 3.92494V3ZM1 4.90797V12H14V4.90797L7.74112 8.87995C7.59394 8.97335 7.40606 8.97335 7.25888 8.87995L1 4.90797Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span>sales@k-lab.ai</span>
        </a>
      </motion.div>

      {/* Sales form */}
      <section className={styles.newFormSection} aria-label="Sales inquiry form">
        <form onSubmit={(e) => handleRecaptchaAndSubmit(e)} className={styles.form}>
          <div className={styles.grid}>
            <div className={styles.row}>
              <FormField error={errors.firstName?.message} required className={styles.fieldGroup}>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <FormFieldInput
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        if (touchedFields.firstName) setTimeout(() => trigger("firstName"), 0);
                      }}
                      label={`${t("firstName")}*`}
                      type="text"
                      useFloatingLabel
                      autoComplete="off"
                    />
                  )}
                />
              </FormField>
              <FormField error={errors.lastName?.message} required className={styles.fieldGroup}>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <FormFieldInput
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        if (touchedFields.lastName) setTimeout(() => trigger("lastName"), 0);
                      }}
                      label={`${t("lastName")}*`}
                      type="text"
                      useFloatingLabel
                      autoComplete="off"
                    />
                  )}
                />
              </FormField>
            </div>
            <div className={styles.row}>
              <FormField error={errors.email?.message} required className={styles.fieldGroup}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <FormFieldInput
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        if (touchedFields.email) setTimeout(() => trigger("email"), 0);
                      }}
                      label={`${t("email")}*`}
                      type="email"
                      useFloatingLabel
                      autoComplete="off"
                    />
                  )}
                />
              </FormField>
              <FormField error={errors.phone?.message} required className={styles.fieldGroup}>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <FormFieldInput
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        if (touchedFields.phone) setTimeout(() => trigger("phone"), 0);
                      }}
                      label={`${t("phone")}*`}
                      type="tel"
                      useFloatingLabel
                      autoComplete="off"
                    />
                  )}
                />
              </FormField>
            </div>
            <div className={styles.row}>
              <div className={styles.comboboxContainer}>
                <div className={styles.comboboxRow}>
                  <FormField
                    label={t("company")}
                    error={errors.company?.message}
                    className={styles.fieldGroup}
                  >
                    <Controller
                      name="company"
                      control={control}
                      render={({ field }) => (
                        <FormFieldInput
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            if (touchedFields.company) setTimeout(() => trigger("company"), 0);
                          }}
                          type="text"
                          useFloatingLabel
                          autoComplete="off"
                        />
                      )}
                    />
                  </FormField>
                </div>
                <div className={styles.comboboxRow}>
                  <FormField error={errors.companyWebsite?.message} className={styles.fieldGroup}>
                    <Controller
                      name="companyWebsite"
                      control={control}
                      render={({ field }) => (
                        <FormFieldInput
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            if (touchedFields.companyWebsite)
                              setTimeout(() => trigger("companyWebsite"), 0);
                          }}
                          type="text"
                          label={t("companyWebsite")}
                          useFloatingLabel
                          autoComplete="off"
                        />
                      )}
                    />
                  </FormField>
                </div>
                <div className={styles.comboboxRow}>
                  <FormField
                    error={errors.country?.message}
                    required
                    hideLabel
                    className={styles.fieldGroup}
                  >
                    <Controller
                      name="country"
                      control={control}
                      render={({ field }) => (
                        <KLabCombobox
                          name={field.name}
                          label={`${t("country")}*`}
                          options={countryComboboxOptions}
                          value={field.value}
                          onValueChange={async (value) => {
                            field.onChange(value);
                            setValue("country", value, { shouldValidate: true });
                            await trigger("country");
                          }}
                          onBlur={field.onBlur}
                          placeholder={t("comboboxPlaceholder")}
                          searchPlaceholder={t("searchPlaceholder")}
                          emptyMessage={t("emptyMessage")}
                          error={!!errors.country}
                        />
                      )}
                    />
                  </FormField>
                </div>
              </div>
              <FormField
                error={errors.message?.message}
                required
                className={cn(styles.fieldGroup, styles.messageFieldGroup)}
              >
                <Controller
                  name="message"
                  control={control}
                  render={({ field }) => (
                    <FormFieldInput
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        if (touchedFields.message) setTimeout(() => trigger("message"), 0);
                      }}
                      label={`${t("message")}*`}
                      type="textarea"
                      useFloatingLabel
                      className={styles.messageTextarea}
                    />
                  )}
                />
              </FormField>
            </div>
          </div>
          <div className={styles.lastRow}>
            <div className={styles.checkboxWrapper}>
              <Controller
                name="emailUpdates"
                control={control}
                render={({ field }) => (
                  <div className={styles.checkboxContainerNew}>
                    <Checkbox
                      id="sales-email-updates"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      brand
                      aria-label={t("emailUpdatesAria")}
                    />
                    <label htmlFor="sales-email-updates" className={styles.checkboxLabel}>
                      {t("emailUpdatesLabel")}
                    </label>
                  </div>
                )}
              />
            </div>
            <div className={styles.recaptchaWrapper}>
              <Controller
                name="recaptcha"
                control={control}
                render={() => (
                  <>
                    <ReCAPTCHA
                      className={styles.recaptcha}
                      ref={recaptchaRefNew}
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                      onChange={(value) => setValue("recaptcha", value || "")}
                      theme="dark"
                      size="invisible"
                      tabIndex={-1}
                    />
                    {errors.recaptcha && (
                      <span className={styles.error}>{errors.recaptcha.message}</span>
                    )}
                  </>
                )}
              />
            </div>
            <div className={styles.submitWrapperDesktop}>
              <Button
                type="submit"
                variant="accent-brand"
                iconPosition="right"
                disabled={isSubmitting}
                loading={isSubmitting}
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              >
                {isSubmitting ? t("submitting") : t("submitButton")}
              </Button>
            </div>
            <div className={styles.submitWrapperMobile}>
              <Button
                type="submit"
                variant="accent-brand"
                iconPosition="right"
                disabled={isSubmitting}
                loading={isSubmitting}
                className={styles.buttonFullWidth}
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              >
{isSubmitting ? t("submitting") : t("submitButton")}
            </Button>
          </div>
        </div>
      </form>
    </section>
    </motion.div>
  );
}
