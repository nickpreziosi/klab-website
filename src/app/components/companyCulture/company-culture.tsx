"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import styles from "./company-culture.module.css";
import SectionHeader from "../sectionHeader/section-header";
import Button from "../ui/button/button";

export default function CompanyCulture() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Text Content */}
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <SectionHeader
            highlight={["Teamwork", "Inclusion"]}
            heading="Innovation Through Teamwork & Inclusion."
            align="center"
            animateOnce={true}
          />
          <h2 style={{ display: "none" }} className={styles.title}>
            Innovation Through <br></br>
            <span className={styles.accent}>Teamwork</span> &
            <span className={styles.accent}> Inclusion</span>.
          </h2>
          <p className={styles.description}>
            Our strength is built on combining start-up energy with extensive
            industry experience to develop innovative solutions that change the
            way companies grow. We have a deep commitment to advancing
            diversity, equality, and inclusion, essential to our mission of
            helping businesses and attracting exceptional people who think
            outside the box.
          </p>
          <Button
            href="/careers"
            text="KEO Careers"
            variant="outline"
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
        </motion.div>

        {/* */}
        <div style={{ display: "none" }} className={styles.imagesGrid}>
          <motion.div
            className={styles.imageWrapper}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              priority
              src="/keo-company-2.jpeg"
              alt="KEO team collaborating in modern office workspace"
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
          <motion.div
            className={styles.imageWrapper}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Image
              priority
              src="/keo-company-3.jpeg"
              alt="KEO team members enjoying foosball in office recreation area"
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
