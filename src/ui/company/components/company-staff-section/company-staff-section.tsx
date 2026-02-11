"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
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
  linkedin: string;
  x: string;
  email: string;
}

interface CompanyStaffSectionProps {
  employees: StaffMember[];
  board: StaffMember[];
}

export default function CompanyStaffSection({ employees, board }: CompanyStaffSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref}>
      <div className={styles.header}>
        <CompanySectionTitle title="Our Team" inView={inView} />
        <div className={styles.tabWrap}>
          <Tabs defaultValue="leadership">
            <TabsList>
              <TabsTrigger value="leadership">Leadership</TabsTrigger>
              <TabsTrigger value="board">Board</TabsTrigger>
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
