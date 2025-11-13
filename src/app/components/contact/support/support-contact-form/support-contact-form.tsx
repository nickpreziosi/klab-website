"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
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
} from "react-aria-components";
import styles from "./support-contact-form.module.css";
import Button from "@/app/components/ui/button/button";
import { FileUpload } from "@/app/components/ui/file-upload/file-upload";
import HeroText from "@/app/components/ui/hero-text/hero-text";

const issueTypes = [
  { id: "onboarding", name: "Onboarding" },
  { id: "account-issue", name: "Account Issue" },
  { id: "technical-issue", name: "Technical Issue" },
  { id: "software-bug", name: "Software Bug" },
];

const products = [
  { id: "keo-rails", name: "KEO Rails" },
  { id: "kena", name: "Kena" },
];

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(2, "Phone number is required"),
  issueType: z.string().min(1, "Please select an issue type"),
  product: z.string().min(1, "Please select a product"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  files: z
    .array(z.instanceof(File))
    .max(3, "Maximum 3 files allowed")
    .optional(),
  recaptcha: z.string().min(1, "Please complete the reCAPTCHA verification"),
});

type FormData = z.infer<typeof formSchema>;

export function SupportContactForm() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
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
      recaptcha: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      console.log("[v0] Support form submitted:", data);
      // TODO: Implement form submission logic

      // Reset reCAPTCHA after successful submission
      recaptchaRef.current?.reset();
      setValue("recaptcha", "");
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.grid}>
          {/* First Row: First Name, Last Name */}
          <div className={styles.row}>
            <TextField
              className={styles.fieldGroup}
              isInvalid={!!errors.firstName}
            >
              <Label className={styles.label}>
                First Name<span className={styles.required}>*</span>
              </Label>
              <Input
                autoComplete="off"
                {...register("firstName")}
                placeholder="John"
                className={`${styles.input} ${
                  errors.firstName && styles.inputError
                }`}
              />
              {errors.firstName && (
                <FieldError className={styles.error}>
                  {errors.firstName.message}
                </FieldError>
              )}
            </TextField>
            <TextField
              className={styles.fieldGroup}
              isInvalid={!!errors.lastName}
            >
              <Label className={styles.label}>
                Last Name<span className={styles.required}>*</span>
              </Label>
              <Input
                autoComplete="off"
                {...register("lastName")}
                placeholder="Doe"
                className={`${styles.input} ${
                  errors.lastName && styles.inputError
                }`}
              />
              {errors.lastName && (
                <FieldError className={styles.error}>
                  {errors.lastName.message}
                </FieldError>
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
                className={`${styles.input} ${
                  errors.email && styles.inputError
                }`}
              />
              {errors.email && (
                <FieldError className={styles.error}>
                  {errors.email.message}
                </FieldError>
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
                className={`${styles.input} ${
                  errors.phone && styles.inputError
                }`}
              />
              {errors.phone && (
                <FieldError className={styles.error}>
                  {errors.phone.message}
                </FieldError>
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
                  onSelectionChange={(key) =>
                    setValue("issueType", key as string)
                  }
                  isInvalid={!!errors.issueType}
                >
                  <Label className={styles.label}>
                    Issue Type<span className={styles.required}>*</span>
                  </Label>
                  <div className={styles.comboboxWrapper}>
                    <Input
                      autoComplete="off"
                      placeholder="Select an issue type"
                      className={`${styles.input} ${
                        errors.issueType && styles.inputError
                      }`}
                    />
                    <ComboboxButton className={styles.comboboxButton}>
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 6H11L7.5 10.5L4 6Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </ComboboxButton>
                  </div>
                  <Popover className={styles.popover}>
                    <ListBox className={styles.listbox}>
                      {issueTypes.map((issue) => (
                        <ListBoxItem
                          key={issue.id}
                          id={issue.id}
                          className={styles.listboxItem}
                        >
                          {issue.name}
                        </ListBoxItem>
                      ))}
                    </ListBox>
                  </Popover>
                  {errors.issueType && (
                    <FieldError className={styles.error}>
                      {errors.issueType.message}
                    </FieldError>
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
                  onSelectionChange={(key) =>
                    setValue("product", key as string)
                  }
                  isInvalid={!!errors.product}
                >
                  <Label className={styles.label}>
                    Product<span className={styles.required}>*</span>
                  </Label>
                  <div className={styles.comboboxWrapper}>
                    <Input
                      autoComplete="off"
                      placeholder="Select a product"
                      className={`${styles.input} ${
                        errors.product && styles.inputError
                      }`}
                    />
                    <ComboboxButton className={styles.comboboxButton}>
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 6H11L7.5 10.5L4 6Z"
                          fill="currentColor"
                        ></path>
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
                    <FieldError className={styles.error}>
                      {errors.product.message}
                    </FieldError>
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
                  <Label className={styles.label}>
                    Screenshots, Videos, or Examples
                  </Label>

                  <FileUpload
                    files={field.value || []}
                    onChange={field.onChange}
                    error={errors.files?.message}
                    maxFiles={5}
                    fileTypes={[
                      ".jpg",
                      ".png",
                      ".jpeg",
                      ".mp4",
                      ".mov",
                      ".pdf",
                    ]}
                  />
                </div>
              )}
            />
            <TextField
              className={styles.fieldGroup}
              isInvalid={!!errors.message}
            >
              <Label className={styles.label}>
                Message<span className={styles.required}>*</span>
              </Label>
              <TextArea
                {...register("message")}
                placeholder="Please describe your issue in detail..."
                className={`${styles.textarea} ${
                  errors.message && styles.inputError
                }`}
              />
              {errors.message && (
                <FieldError className={styles.error}>
                  {errors.message.message}
                </FieldError>
              )}
            </TextField>
          </div>
        </div>
        <div className={styles.lastRow}>
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
                  />
                  {errors.recaptcha && (
                    <FieldError className={styles.error}>
                      {errors.recaptcha.message}
                    </FieldError>
                  )}
                </>
              )}
            />
          </div>

          <div className={styles.submitWrapperDesktop}>
            <Button
              text={isSubmitting ? "Submitting..." : "Submit Form"}
              width="fit"
              variant="full"
              iconPosition="end"
              disabled={isSubmitting}
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
            />
          </div>
          <div className={styles.submitWrapperMobile}>
            <Button
              text={isSubmitting ? "Submitting..." : "Submit Form"}
              width="full"
              variant="full"
              iconPosition="end"
              disabled={isSubmitting}
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
            />
          </div>
        </div>
      </form>
    </motion.div>
  );
}
