import { Controller } from "react-hook-form";
import { useState } from "react";

interface Props {
  name: "required_skills" | "prefered_skills";
  label: string;
  control: any;
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
          <div className="p-2 border border-border-default rounded-lg bg-gray-300">
            <div className="flex flex-wrap gap-2 mb-2">
              {field.value?.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="flex items-center gap-1 px-2 py-1 text-sm rounded-md bg-white text-black"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() =>
                      field.onChange(
                        field.value.filter((_: any, i: number) => i !== index)
                      )
                    }
                    className="text-state-error hover:opacity-80"
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

                  // ❗ prevent duplicates
                  if (!field.value.includes(newSkill)) {
                    field.onChange([...field.value, newSkill]);
                  }

                  setInput("");
                }
              }}
              placeholder="Type skill and press Enter"
              className="w-full bg-transparent outline-none text-sm text-black placeholder:text-text-muted"
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
