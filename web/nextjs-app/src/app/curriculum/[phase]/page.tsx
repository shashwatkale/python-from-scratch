import { PHASES } from "@/lib/curriculum";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Props {
  params: Promise<{ phase: string }>;
}

export function generateStaticParams() {
  return PHASES.map((p) => ({ phase: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { phase: phaseSlug } = await params;
  const phase = PHASES.find((p) => p.slug === phaseSlug);
  if (!phase) return {};
  return { title: phase.title, description: phase.description };
}

const DIFFICULTY_COLOR = {
  beginner: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  intermediate: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  advanced: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
};

export default async function PhasePage({ params }: Props) {
  const { phase: phaseSlug } = await params;
  const phase = PHASES.find((p) => p.slug === phaseSlug);
  if (!phase) notFound();

  const prev = PHASES.find((p) => p.order === phase.order - 1);
  const next = PHASES.find((p) => p.order === phase.order + 1);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/curriculum/"
        className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 mb-6 transition-colors"
      >
        <ArrowLeft size={14} /> Curriculum
      </Link>

      <div className="flex items-center gap-3 mb-2">
        <span className="text-sm font-mono text-zinc-400">
          Phase {String(phase.order).padStart(2, "0")}
        </span>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${DIFFICULTY_COLOR[phase.difficulty]}`}>
          {phase.difficulty}
        </span>
      </div>

      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">{phase.title}</h1>
      <p className="text-zinc-500 mb-10">{phase.description}</p>

      {phase.lessons.length > 0 ? (
        <div className="space-y-2">
          {phase.lessons.map((lesson) => (
            <Link
              key={lesson.slug}
              href={`/curriculum/${phase.slug}/${lesson.slug}/`}
              className="group flex items-center gap-4 border border-zinc-200 dark:border-zinc-800 rounded-lg px-5 py-4 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
            >
              <span className="text-sm font-mono text-zinc-400 w-6 shrink-0">{lesson.order}</span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {lesson.title}
                </p>
                <p className="text-sm text-zinc-500 truncate">{lesson.description}</p>
              </div>
              <ArrowRight size={16} className="text-zinc-400 group-hover:text-indigo-500 shrink-0 transition-colors" />
            </Link>
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg p-8 text-center text-zinc-400">
          <p className="text-sm">Lessons coming soon.</p>
          <a
            href="https://github.com/your-username/python-from-scratch"
            className="text-sm text-indigo-500 hover:underline mt-1 inline-block"
          >
            Contribute on GitHub →
          </a>
        </div>
      )}

      <div className="flex justify-between mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-800">
        {prev ? (
          <Link
            href={`/curriculum/${prev.slug}/`}
            className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <ArrowLeft size={14} /> {prev.title}
          </Link>
        ) : <span />}
        {next && (
          <Link
            href={`/curriculum/${next.slug}/`}
            className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            {next.title} <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </div>
  );
}
