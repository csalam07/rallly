import {
  BillingPlan,
  BillingPlanFooter,
  BillingPlanHeader,
  BillingPlanPeriod,
  BillingPlanPerk,
  BillingPlanPerks,
  BillingPlanPrice,
  BillingPlanTitle,
} from "@rallly/ui/billing-plan";
import { Label } from "@rallly/ui/label";
import { Switch } from "@rallly/ui/switch";
import React from "react";

import { Trans } from "@/components/trans";
import { UpgradeButton } from "@/components/upgrade-button";
import { usePlan } from "@/contexts/plan";

const monthlyPriceUsd = 5;
const annualPriceUsd = 30;

export const BillingPlans = () => {
  const [isBilledAnnually, setBilledAnnually] = React.useState(true);
  const plan = usePlan();
  const isPlus = plan === "paid";

  return (
    <div className="space-y-4">
      <div>
        <Label className="mb-4">
          <Trans i18nKey="subscriptionPlans" defaults="Plans" />
        </Label>
        <p className="text-muted-foreground mb-4 text-sm">
          <Trans
            i18nKey="subscriptionDescription"
            defaults="By subscribing, you not only gain access to all features but you are also directly supporting further development of Rallly."
          />
        </p>
      </div>
      <div className="flex items-center gap-2.5">
        <Switch
          id="annual-switch"
          checked={isBilledAnnually}
          onCheckedChange={(checked) => {
            setBilledAnnually(checked);
          }}
        />
        <Label htmlFor="annual-switch">
          <Trans
            i18nKey="annualBilling"
            defaults="Annual billing (Save {discount}%)"
            values={{
              discount: Math.round(100 - (annualPriceUsd / 12 / 5) * 100),
            }}
          />
        </Label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <BillingPlan>
          <BillingPlanHeader>
            <BillingPlanTitle>
              <Trans i18nKey="planFree" defaults="Free" />
            </BillingPlanTitle>
            <BillingPlanPrice>$0</BillingPlanPrice>
            <BillingPlanPeriod>
              <Trans i18nKey="freeForever" defaults="free forever" />
            </BillingPlanPeriod>
          </BillingPlanHeader>
          <BillingPlanPerks>
            <BillingPlanPerk>
              <Trans i18nKey="plan_unlimitedPolls" defaults="Unlimited polls" />
            </BillingPlanPerk>
            <BillingPlanPerk>
              <Trans
                i18nKey="plan_unlimitedParticipants"
                defaults="Unlimited participants"
              />
            </BillingPlanPerk>
          </BillingPlanPerks>
        </BillingPlan>

        <ProPlan annual={isBilledAnnually}>
          {!isPlus ? (
            <UpgradeButton annual={isBilledAnnually}>
              <Trans i18nKey="planUpgrade" defaults="Upgrade" />
            </UpgradeButton>
          ) : null}
        </ProPlan>
      </div>
    </div>
  );
};

export const ProPlan = ({
  annual,
  children,
}: React.PropsWithChildren<{
  annual?: boolean;
}>) => {
  return (
    <BillingPlan variant="primary">
      <BillingPlanHeader>
        <BillingPlanTitle className="text-primary">
          <Trans i18nKey="planPro" defaults="Pro" />
        </BillingPlanTitle>
        {annual ? (
          <>
            <BillingPlanPrice discount={`$${(annualPriceUsd / 12).toFixed(2)}`}>
              ${monthlyPriceUsd}
            </BillingPlanPrice>
            <BillingPlanPeriod>
              <Trans
                i18nKey="annualBillingDescription"
                defaults="per month, billed annually"
              />
            </BillingPlanPeriod>
          </>
        ) : (
          <>
            <BillingPlanPrice>${monthlyPriceUsd}</BillingPlanPrice>
            <BillingPlanPeriod>
              <Trans i18nKey="monthlyBillingDescription" defaults="per month" />
            </BillingPlanPeriod>
          </>
        )}
      </BillingPlanHeader>
      <BillingPlanPerks>
        <BillingPlanPerk>
          <Trans i18nKey="plan_unlimitedPolls" defaults="Unlimited polls" />
        </BillingPlanPerk>
        <BillingPlanPerk>
          <Trans
            i18nKey="plan_unlimitedParticipants"
            defaults="Unlimited participants"
          />
        </BillingPlanPerk>
        <BillingPlanPerk>
          <Trans i18nKey="plan_finalizePolls" defaults="Finalize polls" />
        </BillingPlanPerk>
        <BillingPlanPerk>
          <Trans
            i18nKey="planCustomizablePollSettings"
            defaults="Customizable poll settings"
          />
        </BillingPlanPerk>
        <BillingPlanPerk>
          <Trans
            i18nKey="plan_extendedPollLife"
            defaults="Extended poll life"
          />
        </BillingPlanPerk>
        <BillingPlanPerk>
          <Trans i18nKey="plan_prioritySupport" defaults="Priority support" />
        </BillingPlanPerk>
      </BillingPlanPerks>
      <BillingPlanFooter>{children}</BillingPlanFooter>
    </BillingPlan>
  );
};
