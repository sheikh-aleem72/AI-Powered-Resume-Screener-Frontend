import {
  Controller,
  type Control,
  type UseFormSetValue,
} from "react-hook-form";
import type { CreateJobPayload } from "./JobForm";

interface Props {
  control: Control<CreateJobPayload>;
  setValue: UseFormSetValue<CreateJobPayload>;
}

const LEVEL_TO_YEARS: Record<string, number> = {
  Junior: 0,
  Mid: 2,
  Senior: 5,
  Lead: 8,
};

const getLevelFromYears = (years: number) => {
  if (years >= 8) return "Lead";
  if (years >= 5) return "Senior";
  if (years >= 2) return "Mid";
  return "Junior";
};

export const ExperienceInput = ({ control, setValue }: Props) => {
  const inputClass = `w-full rounded-xl border border-border-default bg-bg-primary px-4 py-3 text-text-primary outline-none transition-all focus:border-action-primary focus:ring-2 focus:ring-action-primary/20`;

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Experience Level */}
        <Controller
          control={control}
          name="experience_level"
          render={({ field }) => (
            <div>
              <label className="text-sm text-text-secondary font-medium mb-1 block">
                Experience Level
              </label>
              <select
                {...field}
                onChange={(e) => {
                  const level = e.target.value;

                  field.onChange(level);

                  setValue("min_experience_years", LEVEL_TO_YEARS[level], {
                    shouldDirty: true,
                  });
                }}
                className={`${inputClass} cursor-pointer`}
              >
                <option value="Junior">Junior</option>
                <option value="Mid">Mid</option>
                <option value="Senior">Senior</option>
                <option value="Lead">Lead</option>
              </select>
            </div>
          )}
        />

        {/* Min Experience */}
        <Controller
          control={control}
          name="min_experience_years"
          rules={{
            required: "Minimum experience required",
            min: { value: 0, message: "Cannot be negative" },
          }}
          render={({ field, fieldState }) => (
            <div>
              <label className="text-sm text-text-secondary font-medium mb-1 block">
                Minimum Experience
              </label>

              <input
                type="number"
                min={0}
                placeholder="0"
                {...field}
                onChange={(e) => {
                  const years = Number(e.target.value);

                  field.onChange(years);

                  setValue("experience_level", getLevelFromYears(years), {
                    shouldDirty: true,
                  });
                }}
                className={inputClass}
              />

              {fieldState.error && (
                <p className="text-sm text-state-error mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>
      <div className="mt-5 rounded-2xl bg-bg-primary px-5 py-4">
        <p className="text-sm text-text-secondary">
          Used as one of several AI ranking signals alongside skills and
          semantic relevance.
        </p>
      </div>
    </>
  );
};
