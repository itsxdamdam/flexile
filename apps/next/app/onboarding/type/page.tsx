"use client";
import React, { Suspense, useState } from "react";
import { steps as adminSteps } from "@/app/companies/[companyId]/administrator/onboarding";
import { CompanyDetails } from "@/app/companies/[companyId]/administrator/onboarding/details";
import PersonalDetails from "@/app/onboarding/PersonalDetails";
import OnboardingLayout from "@/components/layouts/Onboarding";
import { RadioGroup } from "@/components/ui/radio-group";

import { steps } from "..";

export default function SignUp() {
  const [accessRole, setAccessRole] = useState<"administrator" | "contractor">("administrator");

  return (
    <OnboardingLayout
      stepIndex={1}
      steps={accessRole === "administrator" ? adminSteps : steps}
      title="Let's get to know you"
      subtitle="We'll use this information for contracts and payments."
    >
      <RadioGroup
        options={[
          { value: "administrator", label: "Company", description: "I want to pay my team and manage ownership" },
          { value: "contractor", label: "Freelancer", description: "I want to bill and invoice clients" },
        ]}
        value={accessRole}
        onChange={setAccessRole}
        label="I'm a..."
      />

      <Suspense>
        {accessRole === "administrator" ? <CompanyDetails /> : <PersonalDetails nextLinkTo="/onboarding/legal" />}
      </Suspense>
    </OnboardingLayout>
  );
}
