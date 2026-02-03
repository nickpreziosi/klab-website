/**
 * Support Contact Form Component
 *
 * A comprehensive support request form with:
 * - Multi-field form with validation (personal info, issue type, product)
 * - File upload support for screenshots/videos/examples (max 5 files, 10MB each)
 * - Client and server-side validation using Zod
 * - reCAPTCHA spam protection
 * - Success/error state management with animations
 * - Form reset and reCAPTCHA reset on successful submission
 *
 * @route /contact/support
 */

"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {
  TextField,
  Label,
  Input,
  TextArea,
  ComboBox,
  ListBox,
  Button as ComboboxButton,
  ListBoxItem,
  Popover,
  FieldError,
  Checkbox as AriaCheckbox,
} from "react-aria-components";
import styles from "./support-contact-form.module.css";
import Button from "@/ui/shared/components/button/button";
import { FileUpload } from "@/ui/shared/components/file-upload/file-upload";
import HeroText from "@/ui/shared/components/hero-text/hero-text";

// Available issue type options for support requests
const issueTypes = [
  { id: "onboarding", name: "Onboarding" },
  { id: "account-issue", name: "Account Issue" },
  { id: "technical-issue", name: "Technical Issue" },
  { id: "software-bug", name: "Software Bug" },
];

// Available product options for support requests
const products = [
  { id: "keo-rails", name: "KEO Rails" },
  { id: "kena", name: "Kena" },
];

// Extract IDs for validation purposes
const issueTypeIds = issueTypes.map((t) => t.id);
const productIds = products.map((p) => p.id);

/**
 * Client-side form validation schema using Zod.
 * This schema matches the server-side validation for consistency.
 * Includes file upload validation for screenshots/videos/examples.
 */
const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(2, "Phone number is required"),
  issueType: z
    .string()
    .min(1, "Please select an issue type")
    .refine((val) => issueTypeIds.includes(val), "Please select a valid issue type"),
  product: z
    .string()
    .min(1, "Please select a product")
    .refine((val) => productIds.includes(val), "Please select a valid product"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  // File upload validation: max 5 files (screenshots, videos, examples)
  // Accepted types: JPG, PNG, MP4, MOV, PDF
  files: z.array(z.instanceof(File)).max(5, "Maximum 5 files allowed").optional(),
  emailUpdates: z.boolean().default(false),
  recaptcha: z.string().min(1, "Please complete the reCAPTCHA verification"),
});

type FormData = z.infer<typeof formSchema>;

/**
 * Main Support Contact Form Component
 */
export function SupportContactForm() {
  // Refs and state management
  const recaptchaRef = useRef<ReCAPTCHA>(null); // Reference to reCAPTCHA component
  const [isSubmitting, setIsSubmitting] = useState(false); // Submission loading state
  const [isSuccess, setIsSuccess] = useState(false); // Success state for showing success view
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" }); // Status message for errors/success

  // Scroll to top of page when submission is successful
  useEffect(() => {
    if (isSuccess) {
      // Small delay to ensure the view is rendered
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 100);
    }
  }, [isSuccess]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    trigger,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      issueType: "",
      product: "",
      message: "",
      files: [],
      emailUpdates: false,
      recaptcha: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Create FormData object
      const formData = new FormData();

      // Append all form fields
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("issueType", data.issueType);
      formData.append("product", data.product);
      formData.append("message", data.message);
      formData.append("recaptcha", data.recaptcha);

      // Append file uploads (screenshots, videos, examples) to FormData
      if (data.files && data.files.length > 0) {
        data.files.forEach((file) => {
          formData.append("files", file);
        });
      }

      // Send to API route
      const response = await fetch("/api/contact/support", {
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
        throw new Error(result.error || result.details || "Failed to submit support request");
      }

      // Success - reset form and reCAPTCHA
      reset();
      recaptchaRef.current?.reset();
      setIsSuccess(true);
      setSubmitStatus({
        type: "success",
        message: result.message || "Support request submitted successfully!",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to submit support request. Please try again.",
      });
      // Reset reCAPTCHA on error so user can try again
      recaptchaRef.current?.reset();
      setValue("recaptcha", "");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Custom handler for submit button
  const handleRecaptchaAndSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = await recaptchaRef.current?.executeAsync();
      setValue("recaptcha", token || "");
      handleSubmit(onSubmit, () => {
        // Error callback - validation failed
        setIsSubmitting(false);
      })();
    } catch (error) {
      console.error("reCAPTCHA execution error:", error);
      setIsSubmitting(false);
    }
  };

  // Success view
  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.formContainer}
      >
        <div className={styles.successContainer}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }}
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className={styles.successContent}
          >
            <HeroText maxWidth="800px" text="Support Request Submitted!" center={true} />
            <p className={styles.successMessage}>
              Thank you for reaching out. We&apos;ve received your support request and our team will
              review it promptly. We&apos;ll get back to you as soon as possible to help resolve
              your issue.
            </p>
            <div className={styles.successActions}>
              <Button
                variant="accent-brand-outline"
                onClick={() => {
                  setIsSuccess(false);
                  setSubmitStatus({ type: null, message: "" });
                  reset();
                }}
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
                iconPosition="right"
              >
                Submit Another Request
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Form view
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.formContainer}
    >
      <div className={styles.headingContainer}>
        <HeroText
          maxWidth="720px"
          text="Get the help you need from our support team"
          center={true}
        ></HeroText>
      </div>

      {submitStatus.type === "error" && (
        <div className={`${styles.statusMessage} ${styles.statusError}`}>
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleRecaptchaAndSubmit} className={styles.form}>
        <div className={styles.grid}>
          {/* First Row: First Name, Last Name */}
          <div className={styles.row}>
            <TextField className={styles.fieldGroup} isInvalid={!!errors.firstName}>
              <Label className={styles.label}>
                First Name<span className={styles.required}>*</span>
              </Label>
              <Input
                autoComplete="off"
                {...register("firstName")}
                placeholder="John"
                className={`${styles.input} ${errors.firstName && styles.inputError}`}
              />
              {errors.firstName && (
                <FieldError className={styles.error}>{errors.firstName.message}</FieldError>
              )}
            </TextField>
            <TextField className={styles.fieldGroup} isInvalid={!!errors.lastName}>
              <Label className={styles.label}>
                Last Name<span className={styles.required}>*</span>
              </Label>
              <Input
                autoComplete="off"
                {...register("lastName")}
                placeholder="Doe"
                className={`${styles.input} ${errors.lastName && styles.inputError}`}
              />
              {errors.lastName && (
                <FieldError className={styles.error}>{errors.lastName.message}</FieldError>
              )}
            </TextField>
          </div>

          {/* Second Row: Email, Phone */}
          <div className={styles.row}>
            <TextField className={styles.fieldGroup} isInvalid={!!errors.email}>
              <Label className={styles.label}>
                Email<span className={styles.required}>*</span>
              </Label>
              <Input
                autoComplete="off"
                {...register("email")}
                type="email"
                placeholder="john@example.com"
                className={`${styles.input} ${errors.email && styles.inputError}`}
              />
              {errors.email && (
                <FieldError className={styles.error}>{errors.email.message}</FieldError>
              )}
            </TextField>
            <TextField className={styles.fieldGroup} isInvalid={!!errors.phone}>
              <Label className={styles.label}>
                Phone<span className={styles.required}>*</span>
              </Label>
              <Input
                autoComplete="off"
                {...register("phone")}
                type="tel"
                placeholder="+1 (555) 000-0000"
                className={`${styles.input} ${errors.phone && styles.inputError}`}
              />
              {errors.phone && (
                <FieldError className={styles.error}>{errors.phone.message}</FieldError>
              )}
            </TextField>
          </div>

          {/* Third Row: Issue Type, Product */}
          <div className={styles.row}>
            <Controller
              name="issueType"
              control={control}
              render={({ field }) => (
                <ComboBox
                  className={styles.fieldGroup}
                  selectedKey={field.value}
                  onSelectionChange={async (key) => {
                    const value = key as string;
                    setValue("issueType", value, { shouldValidate: true });
                    await trigger("issueType");
                  }}
                  isInvalid={!!errors.issueType}
                >
                  <Label className={styles.label}>
                    Issue Type<span className={styles.required}>*</span>
                  </Label>
                  <div className={styles.comboboxWrapper}>
                    <Input
                      autoComplete="off"
                      placeholder="Choose or type an option"
                      className={`${styles.input} ${errors.issueType && styles.inputError}`}
                    />
                    <ComboboxButton className={styles.comboboxButton}>
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M4 6H11L7.5 10.5L4 6Z" fill="currentColor"></path>
                      </svg>
                    </ComboboxButton>
                  </div>
                  <Popover className={styles.popover}>
                    <ListBox className={styles.listbox}>
                      {issueTypes.map((issue) => (
                        <ListBoxItem key={issue.id} id={issue.id} className={styles.listboxItem}>
                          {issue.name}
                        </ListBoxItem>
                      ))}
                    </ListBox>
                  </Popover>
                  {errors.issueType && (
                    <FieldError className={styles.error}>{errors.issueType.message}</FieldError>
                  )}
                </ComboBox>
              )}
            />
            <Controller
              name="product"
              control={control}
              render={({ field }) => (
                <ComboBox
                  className={styles.fieldGroup}
                  selectedKey={field.value}
                  onSelectionChange={async (key) => {
                    const value = key as string;
                    setValue("product", value, { shouldValidate: true });
                    await trigger("product");
                  }}
                  isInvalid={!!errors.product}
                >
                  <Label className={styles.label}>
                    Product<span className={styles.required}>*</span>
                  </Label>
                  <div className={styles.comboboxWrapper}>
                    <Input
                      autoComplete="off"
                      placeholder="Choose or type an option"
                      className={`${styles.input} ${errors.product && styles.inputError}`}
                    />
                    <ComboboxButton className={styles.comboboxButton}>
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M4 6H11L7.5 10.5L4 6Z" fill="currentColor"></path>
                      </svg>
                    </ComboboxButton>
                  </div>
                  <Popover className={styles.popover}>
                    <ListBox className={styles.listbox}>
                      {products.map((product) => (
                        <ListBoxItem
                          key={product.id}
                          id={product.id}
                          className={styles.listboxItem}
                        >
                          {product.name}
                        </ListBoxItem>
                      ))}
                    </ListBox>
                  </Popover>
                  {errors.product && (
                    <FieldError className={styles.error}>{errors.product.message}</FieldError>
                  )}
                </ComboBox>
              )}
            />
          </div>

          {/* Fourth Row: Message, File Upload */}
          <div className={styles.rowEqualHeight}>
            <Controller
              name="files"
              control={control}
              render={({ field }) => (
                <div className={styles.fieldGroup}>
                  <Label className={styles.label}>Screenshots, Videos, or Examples</Label>

                  <FileUpload
                    files={field.value || []}
                    onChange={field.onChange}
                    error={errors.files?.message}
                    maxFiles={5}
                    fileTypes={[".jpg", ".png", ".jpeg", ".mp4", ".mov", ".pdf"]}
                  />
                </div>
              )}
            />
            <TextField className={styles.fieldGroup} isInvalid={!!errors.message}>
              <Label className={styles.label}>
                Message<span className={styles.required}>*</span>
              </Label>
              <TextArea
                {...register("message")}
                placeholder="Please describe your issue in detail..."
                className={`${styles.textarea} ${errors.message && styles.inputError}`}
              />
              {errors.message && (
                <FieldError className={styles.error}>{errors.message.message}</FieldError>
              )}
            </TextField>
          </div>
        </div>
        <div className={styles.lastRow}>
          <div className={styles.checkboxWrapper}>
            <Controller
              name="emailUpdates"
              control={control}
              render={({ field }) => (
                <AriaCheckbox
                  isSelected={field.value}
                  onChange={field.onChange}
                  className={styles.checkboxContainer}
                >
                  <div className={styles.checkboxBox}>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className={styles.checkboxLabel}>
                    I would like to receive updates via email.
                  </span>
                </AriaCheckbox>
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
                  />
                  {errors.recaptcha && (
                    <FieldError className={styles.error}>{errors.recaptcha.message}</FieldError>
                  )}
                </>
              )}
            />
          </div>

          <div className={styles.submitWrapperDesktop}>
            <Button
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
              {isSubmitting ? "Submitting..." : "Submit Form"}
            </Button>
          </div>
          <div className={styles.submitWrapperMobile}>
            <Button
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
              {isSubmitting ? "Submitting..." : "Submit Form"}
            </Button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
