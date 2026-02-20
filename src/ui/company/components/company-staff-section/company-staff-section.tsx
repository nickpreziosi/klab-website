"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import CompanySectionTitle from "@/ui/company/components/company-section-title/company-section-title";
import { StaffCard } from "@/ui/company/components/staff-card/staff-card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/ui/shared/components/tabs/tabs";
import styles from "./company-staff-section.module.css";

export interface StaffMember {
  name: string;
  position?: string;
  bio: string;
  image: string;
  imageLight?: string;
  imageDark?: string;
  linkedin?: string;
  x?: string;
  email: string;
}

interface CompanyStaffSectionProps {
  employees: StaffMember[];
  board: StaffMember[];
  /** When true, skip entrance animation (e.g. locale switch). */
  skipAnimation?: boolean;
}

export default function CompanyStaffSection({ employees, board, skipAnimation = false }: CompanyStaffSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const effectiveInView = skipAnimation || inView;
  const t = useTranslations("companyStaff");

  return (
    <section ref={ref}>
      <div className={styles.header}>
        <CompanySectionTitle title={t("title")} inView={effectiveInView} skipAnimation={skipAnimation} />
        <div className={styles.tabWrap}>
          <Tabs defaultValue="leadership">
            <TabsList>
              <TabsTrigger value="leadership">{t("tabLeadership")}</TabsTrigger>
              <TabsTrigger value="board">{t("tabBoard")}</TabsTrigger>
            </TabsList>
            <TabsContent value="leadership">
              <div className={styles.cardGrid}>
                {employees.map((employee) => (
                  <StaffCard
                    key={employee.email}
                    name={employee.name}
                    position={employee.position || ""}
                    bio={employee.bio}
                    image={employee.image}
                    imageLight={employee.imageLight}
                    imageDark={employee.imageDark}
                    linkedin={employee.linkedin}
                    email={employee.email}
                    x={employee.x}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="board">
              <div className={styles.cardGrid}>
                {board.map((member) => (
                  <StaffCard
                    key={member.email}
                    name={member.name}
                    position={member.position || ""}
                    bio={member.bio}
                    image={member.image}
                    imageLight={member.imageLight}
                    imageDark={member.imageDark}
                    linkedin={member.linkedin}
                    email={member.email}
                    x={member.x}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
