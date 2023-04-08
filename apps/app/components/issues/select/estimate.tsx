import React from "react";

// hooks
import useEstimate from "hooks/use-estimate";
// ui
import { CustomSelect } from "components/ui";
// icons
import { PlayIcon } from "@heroicons/react/24/outline";

type Props = {
  value: number;
  onChange: (value: number) => void;
};

export const IssueEstimateSelect: React.FC<Props> = ({ value, onChange }) => {
  const { isEstimatesInUse, estimatePoints } = useEstimate();

  if (!isEstimatesInUse) return null;

  return (
    <CustomSelect
      value={value}
      label={
        <div className="flex items-center gap-2 text-xs">
          <span>
            <PlayIcon className="h-4 w-4 text-gray-700 -rotate-90" />
          </span>
          <span className={`${value ? "text-gray-600" : "text-gray-500"}`}>
            {estimatePoints?.find((e) => e.key === value)?.value ?? "Estimate points"}
          </span>
        </div>
      }
      onChange={onChange}
      position="right"
      noChevron
    >
      {estimatePoints &&
        estimatePoints.map((point) => (
          <CustomSelect.Option className="w-full " key={point.key} value={point.key}>
            <>
              <span>
                <PlayIcon className="h-4 w-4 -rotate-90" />
              </span>
              {point.value}
            </>
          </CustomSelect.Option>
        ))}
    </CustomSelect>
  );
};
