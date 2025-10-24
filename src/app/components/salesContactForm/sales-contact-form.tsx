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
  Button,
  ComboBox,
  ListBox,
  ListBoxItem,
  Popover,
  Checkbox as AriaCheckbox,
  FieldError,
} from "react-aria-components";
import { countries } from "../../lib/countries";
import styles from "./sales-contact-form.module.css";

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

const revenueRanges = [
  { id: "pre-revenue", name: "Pre-revenue" },
  { id: "under-500k", name: "< $500K" },
  { id: "500k-1m", name: "$500K - 1M" },
  { id: "1m-5m", name: "$1M - $5M" },
  { id: "5m-10m", name: "$5M - $10M" },
  { id: "10m-25m", name: "$10M - $25M" },
  { id: "25m-50m", name: "$25M - $50M" },
  { id: "50m-plus", name: "$50M+" },
];

const countryOptions = countries.map((c) => ({ id: c.value, name: c.label }));

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().min(2, "Company name is required"),
  position: z.string().min(2, "Position is required"),
  companyWebsite: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  companyType: z.string().min(1, "Please select a company type"),
  annualRevenue: z.string().min(1, "Please select annual B2B revenue"),
  country: z.string().min(1, "Please select a country"),
  message: z.string().optional(),
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
      annualRevenue: "",
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
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={styles.heading}
      >
        Share a few details and we&apos;ll get in touch
      </motion.h1>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.grid}>
          {/* Left Column */}
          <div className={styles.column}>
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
                className={styles.input}
              />
              {errors.fullName && (
                <FieldError className={styles.error}>
                  {errors.fullName.message}
                </FieldError>
              )}
            </TextField>

            <TextField
              className={styles.fieldGroup}
              isInvalid={!!errors.position}
            >
              <Label className={styles.label}>
                Position<span className={styles.required}>*</span>
              </Label>
              <Input
                autoComplete="off"
                {...register("position")}
                placeholder="CEO"
                className={styles.input}
              />
              {errors.position && (
                <FieldError className={styles.error}>
                  {errors.position.message}
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
                className={styles.input}
              />
              {errors.companyWebsite && (
                <FieldError className={styles.error}>
                  {errors.companyWebsite.message}
                </FieldError>
              )}
            </TextField>

            <Controller
              name="annualRevenue"
              control={control}
              render={({ field }) => (
                <ComboBox
                  className={styles.fieldGroup}
                  selectedKey={field.value}
                  onSelectionChange={(key) =>
                    setValue("annualRevenue", key as string)
                  }
                  isInvalid={!!errors.annualRevenue}
                >
                  <Label className={styles.label}>
                    Annual B2B Revenue<span className={styles.required}>*</span>
                  </Label>
                  <div className={styles.comboboxWrapper}>
                    <Input
                      autoComplete="off"
                      placeholder="Choose an option"
                      className={styles.input}
                    />
                    <Button className={styles.comboboxButton}>▼</Button>
                  </div>
                  <Popover className={styles.popover}>
                    <ListBox className={styles.listbox}>
                      {revenueRanges.map((range) => (
                        <ListBoxItem
                          key={range.id}
                          id={range.id}
                          className={styles.listboxItem}
                        >
                          {range.name}
                        </ListBoxItem>
                      ))}
                    </ListBox>
                  </Popover>
                  {errors.annualRevenue && (
                    <FieldError className={styles.error}>
                      {errors.annualRevenue.message}
                    </FieldError>
                  )}
                </ComboBox>
              )}
            />
            <TextField className={styles.fieldGroup} isInvalid={!!errors.phone}>
              <Label className={styles.label}>Phone</Label>
              <Input
                autoComplete="off"
                {...register("phone")}
                type="tel"
                placeholder="+1 (555) 000-0000"
                className={styles.input}
              />
              {errors.phone && (
                <FieldError className={styles.error}>
                  {errors.phone.message}
                </FieldError>
              )}
            </TextField>
          </div>

          {/* Right Column */}
          <div className={styles.column}>
            <TextField className={styles.fieldGroup} isInvalid={!!errors.email}>
              <Label className={styles.label}>
                Email<span className={styles.required}>*</span>
              </Label>
              <Input
                autoComplete="off"
                {...register("email")}
                type="email"
                placeholder="john@example.com"
                className={styles.input}
              />
              {errors.email && (
                <FieldError className={styles.error}>
                  {errors.email.message}
                </FieldError>
              )}
            </TextField>

            <TextField
              className={styles.fieldGroup}
              isInvalid={!!errors.company}
            >
              <Label className={styles.label}>
                Company Name<span className={styles.required}>*</span>
              </Label>
              <Input
                autoComplete="off"
                {...register("company")}
                placeholder="Acme Inc."
                className={styles.input}
              />
              {errors.company && (
                <FieldError className={styles.error}>
                  {errors.company.message}
                </FieldError>
              )}
            </TextField>

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
                    Type of company<span className={styles.required}>*</span>
                  </Label>
                  <div className={styles.comboboxWrapper}>
                    <Input
                      autoComplete="off"
                      placeholder="Choose an option"
                      className={styles.input}
                    />
                    <Button className={styles.comboboxButton}>▼</Button>
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
                    Country<span className={styles.required}>*</span>
                  </Label>
                  <div className={styles.comboboxWrapper}>
                    <Input
                      autoComplete="off"
                      placeholder="Choose an option"
                      className={styles.input}
                    />
                    <Button className={styles.comboboxButton}>▼</Button>
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
                      <svg viewBox="0 0 18 18" aria-hidden="true">
                        <polyline
                          points="1 9 7 14 15 4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
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

        <TextField className={styles.fieldGroup} isInvalid={!!errors.message}>
          <Label className={styles.label}>Message</Label>
          <TextArea
            {...register("message")}
            placeholder="Write your message here"
            className={styles.textarea}
            rows={6}
          />
          {errors.message && (
            <FieldError className={styles.error}>
              {errors.message.message}
            </FieldError>
          )}
        </TextField>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={styles.submitWrapper}
        >
          <Button type="submit" className={styles.submitButton}>
            Submit
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}
