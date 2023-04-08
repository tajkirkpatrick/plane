import { useRouter } from "next/router";

import useSWR from "swr";

// services
import estimatesService from "services/estimates.service";
// hooks
import useProjectDetails from "hooks/use-project-details";
// fetch-keys
import { ESTIMATE_POINTS_LIST } from "constants/fetch-keys";

const useEstimate = (estimateKey?: number) => {
  const router = useRouter();
  const { workspaceSlug, projectId } = router.query;

  const { projectDetails } = useProjectDetails();

  const { data: estimatePoints } = useSWR(
    workspaceSlug && projectId && projectDetails && projectDetails.estimate
      ? ESTIMATE_POINTS_LIST(projectDetails.estimate as string)
      : null,
    workspaceSlug && projectId && projectDetails && projectDetails.estimate
      ? () =>
          estimatesService.getEstimatesPointsList(
            workspaceSlug as string,
            projectId as string,
            projectDetails.estimate
          )
      : null
  );

  const estimateValue: any =
    (estimateKey && estimatePoints?.find((e) => e.key === estimateKey)?.value) ?? "None";

  return {
    isEstimatesInUse: projectDetails?.estimate ? true : false,
    estimatePoints,
    estimateValue,
  };
};

export default useEstimate;
