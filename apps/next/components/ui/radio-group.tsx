"use client";

import * as React from "react";
import { RadioGroup as BaseRadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { cn } from "@/utils/index";
import { Label } from "@/components/ui/label";
import { formControlClasses, formHelpClasses } from "@/components/Input";

type Option<T> = {
  label: string;
  value: T;
  description?: string;
};

type Props<T extends string | number> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  label?: string;
  invalid?: boolean;
  disabled?: boolean;
  help?: string | undefined;
  className?: string;
};

function RadioGroup<T extends string | number>({
  options,
  value,
  onChange,
  label,
  invalid,
  disabled,
  help,
  className,
}: Props<T>) {
  const stringValue = String(value);

  return (
    <fieldset className={cn("group", className)}>
      {label && <legend className="mb-2">{label}</legend>}
      <BaseRadioGroup
        value={stringValue}
        onValueChange={(v) => onChange(options.find((o) => String(o.value) === v)!.value)}
        data-slot="radio-group"
        className="grid auto-cols-fr gap-2 md:grid-flow-col"
        disabled={disabled}
      >
        {options.map((option) => {
          const stringOptionValue = String(option.value);
          return (
            <div key={stringOptionValue} className="flex items-start gap-2">
              <Label
                htmlFor={`radio-${stringOptionValue}`}
                key={option.label}
                className={cn(
                  "flex cursor-pointer items-center gap-2 p-3",
                  disabled ? "cursor-not-allowed opacity-50" : "",
                  invalid ? "text-red-500" : "",
                  `${formControlClasses}`,
                )}
              >
                <RadioGroupItem
                  id={`radio-${stringOptionValue}`}
                  value={stringOptionValue}
                  disabled={disabled}
                  className={cn(
                    "peer border-primary focus-within:ring- size-3 shrink-0 rounded-full border border-gray-300 outline-hidden focus-within:bg-blue-500 focus:border-blue-400 focus-visible:outline-1",
                    "data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500",
                  )}
                />

                <div>
                  <div className="font-medium">{option.label}</div>
                  {option.description && <div className="text-muted-foreground text-sm">{option.description}</div>}
                </div>
              </Label>
            </div>
          );
        })}
      </BaseRadioGroup>
      {help ? <div className={`mt-2 ${formHelpClasses}`}>{help}</div> : null}
    </fieldset>
  );
}

export { RadioGroup };
