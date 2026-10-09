import { CaseStudyGrid } from "@/components/CaseStudyGrid";
import { getCaseStudies } from "@/lib/casestudies";

type Props = {
  tone?: "dark" | "light" | "onPink";
};

export async function CaseStudyCards({ tone = "dark" }: Props) {
  const items = await getCaseStudies();
  return <CaseStudyGrid items={items} tone={tone} />;
}
