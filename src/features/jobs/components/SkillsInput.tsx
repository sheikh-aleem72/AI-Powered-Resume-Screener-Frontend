import { Controller, type Control } from "react-hook-form";
import { useState } from "react";
import type { CreateJobPayload } from "./JobForm";

interface Props {
  name: "required_skills" | "prefered_skills";
  label: string;
  control: Control<CreateJobPayload>;
  required?: boolean;
}

export const SkillsInput = ({ name, label, control, required }: Props) => {
  const [input, setInput] = useState("");

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        validate: (value) =>
          required && (!value || value.length === 0)
            ? "At least one skill is required"
            : true,
      }}
      render={({ field, fieldState }) => (
        <div className="space-y-2">
          <label className="text-sm text-text-secondary font-medium">
            {label}
          </label>

          {/* Input container */}
          <div
            className="
              rounded-2xl
              border
              border-border-default
              bg-bg-primary
              p-4
              transition-all
              focus-within:border-action-primary
              focus-within:ring-2
              focus-within:ring-action-primary/20
            
            "
          >
            <div className="flex flex-wrap gap-2 mb-2">
              {field.value?.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-action-primary/20
                      bg-action-primary/10
                      px-3
                      py-1.5
                      text-sm
                      font-medium
                      text-action-primary
                    "
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() =>
                      field.onChange(
                        field.value?.filter(
                          (_: string, i: number) => i !== index
                        )
                      )
                    }
                    className="
                    rounded-full
                    p-0.5
                    transition-colors
                    hover:bg-red-500/10
                    hover:text-red-400
                  "
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && input.trim()) {
                  e.preventDefault();

                  const newSkill = input.trim();

                  const exists = field.value?.some(
                    (skill: string) =>
                      skill.toLowerCase() === newSkill.toLowerCase()
                  );

                  if (!exists) {
                    field.onChange([...field.value, newSkill]);
                  }

                  setInput("");
                }
              }}
              placeholder="Type a skill and press Enter..."
              className="  w-full
                bg-transparent
                text-text-primary
                placeholder:text-text-secondary
                outline-none"
            />
          </div>

          {fieldState.error && (
            <p className="text-sm text-state-error">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};
