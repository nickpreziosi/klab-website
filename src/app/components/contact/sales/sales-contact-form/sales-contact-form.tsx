"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
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
  Checkbox as AriaCheckbox,
  FieldError,
  ListBoxSection,
  Header,
} from "react-aria-components";
import { countries } from "@/app/lib/countries";
import styles from "./sales-contact-form.module.css";
import HeroText from "@/app/components/ui/hero-text/hero-text";
import Button from "@/app/components/ui/button/button";

const companyTypes = [
  { id: "automotive", name: "Automotive" },
  { id: "construction", name: "Construction" },
  { id: "consumer-package-goods", name: "Consumer Package Goods" },
  { id: "food-grocery-convenience", name: "Food/Grocery/Convenience Store" },
  { id: "food-beverage-industry", name: "Food/Beverage Industry" },
  { id: "franchise", name: "Franchise" },
  { id: "retail", name: "Retail" },
  { id: "technology-electronics", name: "Technology/Electronics" },
  { id: "truck-freight-industry", name: "Truck/Freight Industry" },
  { id: "other", name: "Other" },
];

const products = [
  { id: "keo-rails", name: "KEO Rails" },
  { id: "kena", name: "Kena" },
];

const countryOptions = countries.map((c) => ({ id: c.value, name: c.label }));

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(2, "Phone number is required"),
  company: z.string().optional(),
  position: z.string().optional(),
  companyWebsite: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  companyType: z.string().optional(),
  product: z.string().optional(),
  country: z.string().optional(),
  message: z.string().min(2, "Message is required"),
  emailUpdates: z.boolean().default(false),
});

type FormData = z.infer<typeof formSchema>;

export function SalesContactForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
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
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log("[v0] Form submitted:", data);
    // TODO: Implement form submission logic
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
          text="Share a few details and we'll get in touch!"
          center={true}
        ></HeroText>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.grid}>
          {/* First Row */}
          <div className={styles.row}>
            <TextField
              className={styles.fieldGroup}
              isInvalid={!!errors.fullName}
            >
              <Label className={styles.label}>
                Full Name<span className={styles.required}>*</span>
              </Label>
              <Input
                autoComplete="off"
                {...register("fullName")}
                placeholder="John Doe"
                className={`${styles.input} ${
                  errors.fullName && styles.inputError
                }`}
              />
              {errors.fullName && (
                <FieldError className={styles.error}>
                  {errors.fullName.message}
                </FieldError>
              )}
            </TextField>
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
          </div>

          <div className={styles.row}>
            <TextField className={styles.fieldGroup} isInvalid={!!errors.phone}>
              <Label className={styles.label}>Phone*</Label>
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
            <TextField
              className={styles.fieldGroup}
              isInvalid={!!errors.position}
            >
              <Label className={styles.label}>
                Position<span className={styles.required}></span>
              </Label>
              <Input
                autoComplete="off"
                {...register("position")}
                placeholder="CEO"
                className={`${styles.input} ${
                  errors.position && styles.inputError
                }`}
              />
              {errors.position && (
                <FieldError className={styles.error}>
                  {errors.position.message}
                </FieldError>
              )}
            </TextField>
          </div>

          <div className={styles.row}>
            <TextField
              className={styles.fieldGroup}
              isInvalid={!!errors.company}
            >
              <Label className={styles.label}>
                Company Name<span className={styles.required}></span>
              </Label>
              <Input
                autoComplete="off"
                {...register("company")}
                placeholder="Acme Inc."
                className={`${styles.input} ${
                  errors.company && styles.inputError
                }`}
              />
              {errors.company && (
                <FieldError className={styles.error}>
                  {errors.company.message}
                </FieldError>
              )}
            </TextField>
            <TextField
              className={styles.fieldGroup}
              isInvalid={!!errors.companyWebsite}
            >
              <Label className={styles.label}>Company Website</Label>
              <Input
                autoComplete="off"
                {...register("companyWebsite")}
                type="url"
                placeholder="https://example.com"
                className={`${styles.input} ${
                  errors.companyWebsite && styles.inputError
                }`}
              />
              {errors.companyWebsite && (
                <FieldError className={styles.error}>
                  {errors.companyWebsite.message}
                </FieldError>
              )}
            </TextField>
          </div>

          <div className={styles.row}>
            <div className={styles.comboboxContainer}>
              <div className={styles.comboboxRow}>
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
                        Product of Interest
                        <span className={styles.required}></span>
                      </Label>
                      <div className={styles.comboboxWrapper}>
                        <Input
                          autoComplete="off"
                          placeholder="Choose or type an option"
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
                          <ListBoxSection>
                            <Header />
                            <ListBoxItem />
                          </ListBoxSection>
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
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <ComboBox
                      className={styles.fieldGroup}
                      selectedKey={field.value}
                      onSelectionChange={(key) =>
                        setValue("country", key as string)
                      }
                      isInvalid={!!errors.country}
                    >
                      <Label className={styles.label}>
                        Country<span className={styles.required}></span>
                      </Label>
                      <div className={styles.comboboxWrapper}>
                        <Input
                          autoComplete="off"
                          placeholder="Choose or type an option"
                          className={`${styles.input} ${
                            errors.country && styles.inputError
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
                          {countryOptions.map((country) => (
                            <ListBoxItem
                              key={country.id}
                              id={country.id}
                              className={styles.listboxItem}
                            >
                              {country.name}
                            </ListBoxItem>
                          ))}
                        </ListBox>
                      </Popover>
                      {errors.country && (
                        <FieldError className={styles.error}>
                          {errors.country.message}
                        </FieldError>
                      )}
                    </ComboBox>
                  )}
                />
              </div>
              <div className={styles.comboboxRow}>
                <Controller
                  name="companyType"
                  control={control}
                  render={({ field }) => (
                    <ComboBox
                      className={styles.fieldGroup}
                      selectedKey={field.value}
                      onSelectionChange={(key) =>
                        setValue("companyType", key as string)
                      }
                      isInvalid={!!errors.companyType}
                    >
                      <Label className={styles.label}>
                        Type of company
                        <span className={styles.required}></span>
                      </Label>
                      <div className={styles.comboboxWrapper}>
                        <Input
                          autoComplete="off"
                          placeholder="Choose or type an option"
                          className={`${styles.input} ${
                            errors.companyType && styles.companyType
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
                          {companyTypes.map((type) => (
                            <ListBoxItem
                              key={type.id}
                              id={type.id}
                              className={styles.listboxItem}
                            >
                              {type.name}
                            </ListBoxItem>
                          ))}
                        </ListBox>
                      </Popover>
                      {errors.companyType && (
                        <FieldError className={styles.error}>
                          {errors.companyType.message}
                        </FieldError>
                      )}
                    </ComboBox>
                  )}
                />
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
              </div>
            </div>

            <TextField
              className={styles.fieldGroup}
              isInvalid={!!errors.message}
            >
              <Label className={styles.label}>
                Message<span className={styles.required}></span>*
              </Label>
              <TextArea
                {...register("message")}
                placeholder="Write your message here"
                className={`${styles.textarea} ${
                  errors.message && styles.inputError
                }`}
                rows={5}
              />
              {errors.message && (
                <FieldError className={styles.error}>
                  {errors.message.message}
                </FieldError>
              )}
            </TextField>
          </div>
        </div>

        <div className={styles.submitWrapper}>
          <Button
            text="Submit"
            width="fit"
            variant="full"
            iconPosition="end"
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
      </form>
    </motion.div>
  );
}
