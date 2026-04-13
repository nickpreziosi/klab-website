/**
 * Careers Contact Form Component
 *
 * A comprehensive job application form with:
 * - Multi-field form with validation (personal info, department, optional fields)
 * - File upload support for resume/cover letter (max 3 files, 10MB each)
 * - Client and server-side validation using Zod
 * - reCAPTCHA spam protection
 * - Success/error state management with animations
 * - Form reset and reCAPTCHA reset on successful submission
 *
 * @route /contact/careers
 */

"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslations } from "next-intl";
import { cn } from "@/ui/shared/utils/utils";
import styles from "./careers-contact-form.module.css";
import Button from "@/ui/shared/components/button/button";
import { FileUpload } from "@/ui/shared/components/file-upload/file-upload";
import HeroText from "@/ui/shared/components/hero-text/hero-text";
import { FormField, FormFieldInput } from "@/ui/shared/components/form-field/form-field";
import { Checkbox } from "@/ui/shared/components/checkbox/checkbox";
import { Combobox as KLabCombobox } from "@/ui/shared/components/combobox/combobox";
import { toast } from "sonner";

const NAME_MIN = 2;
const NAME_MAX = 100;
const PHONE_MIN_DIGITS = 10;
const PHONE_MAX_DIGITS = 15;
const MESSAGE_MIN = 10;
const phoneDigitCount = (val: string) => val.replace(/\D/g, "").length;

const departmentIds = [
  "engineering",
  "product",
  "design",
  "marketing",
  "sales",
  "operations",
  "finance",
  "legal",
  "hr",
  "customer-success",
  "other",
];

type CareersFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  title?: string;
  position?: string;
  department: string;
  message: string;
  files?: File[];
  emailUpdates?: boolean;
  recaptcha: string;
};

type CareersContactFormProps = {
  /** When true, skip entrance animations (e.g. locale switch). */
  skipAnimation?: boolean;
};

/**
 * Main Careers Contact Form Component
 */
export function CareersContactForm({ skipAnimation = false }: CareersContactFormProps = {}) {
  const t = useTranslations("careersForm");
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const departmentComboboxOptions = useMemo(
    () => departmentIds.map((id) => ({ value: id, label: t(`departments.${id}`) })),
    [t]
  );

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
        company: z.string().optional(),
        title: z.string().optional(),
        position: z.string().optional(),
        department: z
          .string()
          .min(1, t("validation.departmentRequired"))
          .refine((val) => departmentIds.includes(val), t("validation.departmentInvalid")),
        message: z.string().min(MESSAGE_MIN, t("validation.messageMin")),
        files: z.array(z.instanceof(File)).max(3, t("validation.maxFiles")).optional(),
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
    getValues,
    formState: { errors, touchedFields },
    setValue,
    reset,
    trigger,
  } = useForm<CareersFormValues>({
    resolver: zodResolver(formSchema) as never,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      title: "",
      position: "",
      department: "",
      message: "",
      files: [],
      emailUpdates: false,
      recaptcha: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (data: CareersFormValues) => {
    setSubmitStatus({ type: null, message: "" });

    try {
      // Create FormData object
      const formData = new FormData();

      // Append all form fields
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      if (data.company) {
        formData.append("company", data.company);
      }
      if (data.title) {
        formData.append("title", data.title);
      }
      if (data.position) {
        formData.append("position", data.position);
      }
      formData.append("department", data.department);
      formData.append("message", data.message);
      formData.append("recaptcha", data.recaptcha);

      // Append file uploads (resume, cover letter, etc.) to FormData
      if (data.files && data.files.length > 0) {
        data.files.forEach((file: File) => {
          formData.append("files", file);
        });
      }

      // Send to API route
      const response = await fetch("/api/contact/careers", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle validation errors
        if (result.details && Array.isArray(result.details)) {
          const errorMessages = result.details
            .map((detail: { message?: string; path?: string[] }) => {
              const field = detail.path?.[0] || "field";
              return detail.message || `${field} is invalid`;
            })
            .join(", ");
          throw new Error(errorMessages || result.error || "Validation failed");
        }
        throw new Error(result.error || result.details || "Failed to submit application");
      }

      // Success - reset form and reCAPTCHA
      reset();
      recaptchaRef.current?.reset();
      setIsSuccess(true);
      setSubmitStatus({
        type: "success",
        message: result.message || "Application submitted successfully!",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to submit application. Please try again.";
      console.error("Form submission error:", error);
      setSubmitStatus({ type: "error", message: errorMessage });
      toast.error(errorMessage);
      recaptchaRef.current?.reset();
      setValue("recaptcha", "");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRecaptchaAndSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[Careers] Submit clicked – form values before reCAPTCHA:", getValues());
    setIsSubmitting(true);
    try {
      const RECAPTCHA_TIMEOUT_MS = 15_000;
      const tokenPromise = recaptchaRef.current?.executeAsync() ?? Promise.resolve(null);
      const timeoutPromise = new Promise<null>((_, reject) =>
        setTimeout(() => reject(new Error("reCAPTCHA timed out")), RECAPTCHA_TIMEOUT_MS)
      );
      const token = await Promise.race([tokenPromise, timeoutPromise]);
      console.log("[Careers] reCAPTCHA token received:", token ? `${token.slice(0, 20)}...` : "(empty)");
      setValue("recaptcha", token || "", { shouldValidate: true });
      const wrappedHandler = async (data: CareersFormValues) => {
        console.log("[Careers] Validation passed – calling onSubmit with:", { ...data, recaptcha: data.recaptcha ? "[set]" : "(empty)", files: data.files?.length ?? 0 });
        try {
          await onSubmit(data);
        } finally {
          setIsSubmitting(false);
        }
      };
      const onInvalid = (validationErrors: unknown) => {
        console.log("[Careers] Validation failed – validationErrors:", validationErrors, "form values:", getValues());
        setIsSubmitting(false);
        recaptchaRef.current?.reset();
        setValue("recaptcha", "");
      };
      const runSubmit = handleSubmit(wrappedHandler, onInvalid);
      await new Promise<void>((resolve) => setTimeout(resolve, 0));
      console.log("[Careers] Form values after defer (before runSubmit):", getValues());
      await runSubmit(e);
      setIsSubmitting(false);
    } catch (error) {
      console.error("reCAPTCHA execution error:", error);
      setIsSubmitting(false);
      recaptchaRef.current?.reset();
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
        <HeroText maxWidth="800px" text={t("formHeadline")} center={true} skipAnimation={skipAnimation}></HeroText>
      </div>
      <motion.div
        initial={skipAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: skipAnimation ? 0 : 0.3, delay: skipAnimation ? 0 : 0.55 }}
        className={styles.headerEmailRow}
      >
        <a className={styles.headerEmailLink} href="mailto:careers@k-lab.ai">
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
          <span>careers@k-lab.ai</span>
        </a>
      </motion.div>

      {submitStatus.type === "error" && (
        <div className={`${styles.statusMessage} ${styles.statusError}`}>
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleRecaptchaAndSubmit} className={styles.form}>
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
            <FormField error={errors.position?.message} className={styles.fieldGroup}>
              <Controller
                name="position"
                control={control}
                render={({ field }) => (
                  <FormFieldInput
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      if (touchedFields.position) setTimeout(() => trigger("position"), 0);
                    }}
                    label={t("position")}
                    type="text"
                    useFloatingLabel
                    autoComplete="off"
                  />
                )}
              />
            </FormField>
            <FormField
              error={errors.department?.message}
              required
              hideLabel
              className={styles.fieldGroup}
            >
              <Controller
                name="department"
                control={control}
                render={({ field }) => (
                  <KLabCombobox
                    name={field.name}
                    label={`${t("department")}*`}
                    options={departmentComboboxOptions}
                    value={field.value}
                    onValueChange={async (value) => {
                      field.onChange(value);
                      setValue("department", value, { shouldValidate: true });
                      await trigger("department");
                    }}
                    onBlur={field.onBlur}
                    placeholder={t("comboboxPlaceholder")}
                    searchPlaceholder={t("searchPlaceholder")}
                    emptyMessage={t("emptyMessage")}
                    error={!!errors.department}
                  />
                )}
              />
            </FormField>
          </div>

          <div className={styles.rowEqualHeight}>
            <Controller
              name="files"
              control={control}
              render={({ field }) => (
                <div className={styles.fieldGroup}>
                  <FileUpload
                    label={t("resumeLabel")}
                    maxFiles={3}
                    files={field.value || []}
                    onChange={field.onChange}
                    error={errors.files?.message}
                    fileTypes={[".pdf", ".doc", ".docx"]}
                  />
                </div>
              )}
            />
            <FormField error={errors.message?.message} required className={styles.fieldGroup}>
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
                    id="careers-email-updates"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    brand
                    aria-label={t("emailUpdatesAria")}
                  />
                  <label htmlFor="careers-email-updates" className={styles.checkboxLabel}>
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
                    ref={recaptchaRef}
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
                  ></path>
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
                  ></path>
                </svg>
              }
            >
              {isSubmitting ? t("submitting") : t("submitButton")}
            </Button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
