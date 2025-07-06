import Verify from "@/components/Verify";
import { Suspense } from "react";
import Loading from "@/components/shared/loading";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <Verify />
    </Suspense>
  );
}
