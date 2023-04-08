import React from "react";

// hooks
import useEstimate from "hooks/use-estimate";
// ui
import { CustomSelect, Tooltip } from "components/ui";
// types
import { IIssue } from "types";
// services
import trackEventServices from "services/track-event.service";

type Props = {
  issue: IIssue;
  partialUpdateIssue: (formData: Partial<IIssue>) => void;
  position?: "left" | "right";
  selfPositioned?: boolean;
  isNotAllowed: boolean;
};

export const ViewEstimateSelect: React.FC<Props> = ({
  issue,
  partialUpdateIssue,
  position = "left",
  selfPositioned = false,
  isNotAllowed,
}) => {
  const { isEstimatesInUse, estimatePoints, estimateValue } = useEstimate(issue.estimate_point);

  return (
    <CustomSelect
      value={issue.priority}
      onChange={(data: string) => {
        partialUpdateIssue({ priority: data, state: issue.state, target_date: issue.target_date });
        trackEventServices.trackIssuePartialPropertyUpdateEvent(
          {
            workspaceSlug: issue.workspace_detail.slug,
            workspaceId: issue.workspace_detail.id,
            projectId: issue.project_detail.id,
            projectIdentifier: issue.project_detail.identifier,
            projectName: issue.project_detail.name,
            issueId: issue.id,
          },
          "ISSUE_PROPERTY_UPDATE_PRIORITY"
        );
      }}
      label={
        <Tooltip tooltipHeading="Estimate" tooltipContent={estimateValue}>
          <>{estimateValue}</>
        </Tooltip>
      }
      maxHeight="md"
      noChevron
      disabled={isNotAllowed}
      position={position}
      selfPositioned={selfPositioned}
    >
      {estimatePoints?.map((estimate) => (
        <CustomSelect.Option key={estimate.id} value={estimate.key} className="capitalize">
          <>{estimate.value}</>
        </CustomSelect.Option>
      ))}
    </CustomSelect>
  );
};
