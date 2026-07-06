"use client";

import { useState, useTransition, type FormEvent } from "react";
import { useRouter } from "@/i18n/navigation";
import {
  createCourseAction,
  updateCourseAction,
} from "@/modules/education/server/actions/courseActions";
import { COURSE_CATEGORY_LABELS, COURSE_CATEGORY_ORDER } from "@/modules/education/constants";
import type { CourseCategory } from "@/modules/education/types/course";
import FormAlert from "@/shared/auth/FormAlert";
import Button from "@/components/ui/Button";

export interface CourseFormValues {
  slug: string;
  name: string;
  category: CourseCategory;
  theoryHours: number;
  practicalHours: number;
  priceGroup: number;
  priceSemiIndividual: number;
  priceIndividual: number;
  prerequisites: string;
  description: string;
  highlights: string[];
  tag: string;
  instructor: string;
  published: boolean;
}

interface CourseFormProps {
  mode: "create" | "edit";
  /** Present in edit mode — the course being updated. */
  courseId?: string;
  defaults?: CourseFormValues;
}

const inputClass =
  "w-full rounded-sm border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder:text-stone-400 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-500";
const labelClass = "mb-1.5 block text-sm font-medium text-stone-700";
const fieldErrorClass = "mt-1.5 block text-xs text-red-600";

const EMPTY: CourseFormValues = {
  slug: "",
  name: "",
  category: "Introductory",
  theoryHours: 0,
  practicalHours: 0,
  priceGroup: 0,
  priceSemiIndividual: 0,
  priceIndividual: 0,
  prerequisites: "",
  description: "",
  highlights: [],
  tag: "",
  instructor: "",
  published: true,
};

export default function CourseForm({ mode, courseId, defaults }: CourseFormProps) {
  const router = useRouter();
  const initial = defaults ?? EMPTY;
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setFieldErrors({});
    setFormError(null);

    const data = new FormData(event.currentTarget);
    const num = (name: string): number => Number(data.get(name) ?? 0);
    const str = (name: string): string => String(data.get(name) ?? "").trim();

    const payload = {
      slug: str("slug"),
      name: str("name"),
      category: str("category") as CourseCategory,
      theoryHours: num("theoryHours"),
      practicalHours: num("practicalHours"),
      priceGroup: num("priceGroup"),
      priceSemiIndividual: num("priceSemiIndividual"),
      priceIndividual: num("priceIndividual"),
      prerequisites: str("prerequisites"),
      description: str("description"),
      // One highlight per line.
      highlights: String(data.get("highlights") ?? "")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
      tag: str("tag"),
      instructor: str("instructor"),
      published: data.get("published") === "on",
    };

    startTransition(async () => {
      const result =
        mode === "create"
          ? await createCourseAction(payload)
          : await updateCourseAction(courseId as string, payload);

      if (!result.ok) {
        setFieldErrors(result.fieldErrors ?? {});
        setFormError(result.fieldErrors ? "Please fix the highlighted fields." : result.error);
        return;
      }
      router.push("/admin/courses");
      router.refresh();
    });
  }

  const err = (name: string): string | null => fieldErrors[name]?.[0] ?? null;

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {formError ? <FormAlert tone="error">{formError}</FormAlert> : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Course name
          </label>
          <input id="name" name="name" type="text" required defaultValue={initial.name} className={inputClass} />
          {err("name") ? <span className={fieldErrorClass}>{err("name")}</span> : null}
        </div>
        <div>
          <label htmlFor="slug" className={labelClass}>
            Slug <span className="font-normal text-stone-400">(kebab-case)</span>
          </label>
          <input id="slug" name="slug" type="text" required defaultValue={initial.slug} placeholder="deep-tissue-massage" className={inputClass} />
          {err("slug") ? <span className={fieldErrorClass}>{err("slug")}</span> : null}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className={labelClass}>
            Category
          </label>
          <select id="category" name="category" defaultValue={initial.category} className={inputClass}>
            {COURSE_CATEGORY_ORDER.map((category) => (
              <option key={category} value={category}>
                {COURSE_CATEGORY_LABELS[category]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="tag" className={labelClass}>
            Tag
          </label>
          <input id="tag" name="tag" type="text" required defaultValue={initial.tag} placeholder="Most popular" className={inputClass} />
          {err("tag") ? <span className={fieldErrorClass}>{err("tag")}</span> : null}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="theoryHours" className={labelClass}>
            Theory hours
          </label>
          <input id="theoryHours" name="theoryHours" type="number" min={0} required defaultValue={initial.theoryHours} className={inputClass} />
          {err("theoryHours") ? <span className={fieldErrorClass}>{err("theoryHours")}</span> : null}
        </div>
        <div>
          <label htmlFor="practicalHours" className={labelClass}>
            Practical hours
          </label>
          <input id="practicalHours" name="practicalHours" type="number" min={0} required defaultValue={initial.practicalHours} className={inputClass} />
          {err("practicalHours") ? <span className={fieldErrorClass}>{err("practicalHours")}</span> : null}
        </div>
      </div>

      <fieldset className="grid gap-5 sm:grid-cols-3">
        <legend className="mb-2 text-sm font-medium text-stone-700">Pricing tiers (CAD, whole dollars)</legend>
        <div>
          <label htmlFor="priceGroup" className={labelClass}>
            Group
          </label>
          <input id="priceGroup" name="priceGroup" type="number" min={0} required defaultValue={initial.priceGroup} className={inputClass} />
          {err("priceGroup") ? <span className={fieldErrorClass}>{err("priceGroup")}</span> : null}
        </div>
        <div>
          <label htmlFor="priceSemiIndividual" className={labelClass}>
            Semi-individual
          </label>
          <input id="priceSemiIndividual" name="priceSemiIndividual" type="number" min={0} required defaultValue={initial.priceSemiIndividual} className={inputClass} />
        </div>
        <div>
          <label htmlFor="priceIndividual" className={labelClass}>
            Individual
          </label>
          <input id="priceIndividual" name="priceIndividual" type="number" min={0} required defaultValue={initial.priceIndividual} className={inputClass} />
        </div>
      </fieldset>

      <div>
        <label htmlFor="instructor" className={labelClass}>
          Instructor
        </label>
        <input id="instructor" name="instructor" type="text" required defaultValue={initial.instructor} className={inputClass} />
        {err("instructor") ? <span className={fieldErrorClass}>{err("instructor")}</span> : null}
      </div>

      <div>
        <label htmlFor="prerequisites" className={labelClass}>
          Prerequisites
        </label>
        <textarea id="prerequisites" name="prerequisites" rows={2} defaultValue={initial.prerequisites} placeholder="None" className={inputClass} />
        {err("prerequisites") ? <span className={fieldErrorClass}>{err("prerequisites")}</span> : null}
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          Description
        </label>
        <textarea id="description" name="description" rows={5} required defaultValue={initial.description} className={inputClass} />
        {err("description") ? <span className={fieldErrorClass}>{err("description")}</span> : null}
      </div>

      <div>
        <label htmlFor="highlights" className={labelClass}>
          Highlights <span className="font-normal text-stone-400">(one per line)</span>
        </label>
        <textarea id="highlights" name="highlights" rows={5} required defaultValue={initial.highlights.join("\n")} className={inputClass} />
        {err("highlights") ? <span className={fieldErrorClass}>{err("highlights")}</span> : null}
      </div>

      <label className="flex items-center gap-3 text-sm font-medium text-stone-700">
        <input
          type="checkbox"
          name="published"
          defaultChecked={initial.published}
          className="h-4 w-4 rounded border-stone-300 text-brand-forest focus:ring-brand-500"
        />
        Published (visible on the public site)
      </label>

      <div className="flex gap-3">
        <Button type="submit" variant="primary" disabled={pending}>
          {pending ? "Saving…" : mode === "create" ? "Create course" : "Save changes"}
        </Button>
        <Button href="/admin/courses" variant="outlineStone">
          Cancel
        </Button>
      </div>
    </form>
  );
}
