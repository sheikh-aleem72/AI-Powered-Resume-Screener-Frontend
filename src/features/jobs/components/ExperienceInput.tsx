import { Controller } from "react-hook-form";

interface Props {
  control: any;
}

export const ExperienceInput = ({ control }: Props) => {
  const inputClass =
    "w-full px-3 py-2 bg-gray-300 border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-action-primary text-black";

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Experience Level */}
      <Controller
        control={control}
        name="experience_level"
        render={({ field }) => (
          <div>
            <label className="text-sm text-text-secondary font-medium mb-1 block">
              Experience Level
            </label>
            <select {...field} className={inputClass}>
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
              Minimum Experience (years)
            </label>

            <input type="number" min={0} {...field} className={inputClass} />

            {fieldState.error && (
              <p className="text-sm text-state-error mt-1">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
};
