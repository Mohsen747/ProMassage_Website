"use client";

import { useTransition } from "react";
import { useRouter } from "@/i18n/navigation";
import { setCoursePublishedAction } from "@/modules/education/server/actions/courseActions";
import Button from "@/components/ui/Button";

interface CoursePublishToggleProps {
  courseId: string;
  published: boolean;
}

// One-click publish/unpublish (soft-delete style). Unpublishing hides a course
// from the public site without deleting it or its enrollment history.
export default function CoursePublishToggle({ courseId, published }: CoursePublishToggleProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function toggle(): void {
    startTransition(async () => {
      await setCoursePublishedAction(courseId, !published);
      router.refresh();
    });
  }

  return (
    <Button
      type="button"
      variant={published ? "outlineStone" : "primary"}
      onClick={toggle}
      disabled={pending}
    >
      {pending ? "Saving…" : published ? "Unpublish" : "Publish"}
    </Button>
  );
}
