import { PHASES } from "@/lib/curriculum";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Props {
  params: Promise<{ phase: string; lesson: string }>;
}

export function generateStaticParams() {
  const params: { phase: string; lesson: string }[] = [];
  for (const phase of PHASES) {
    for (const lesson of phase.lessons) {
      params.push({ phase: phase.slug, lesson: lesson.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { phase: phaseSlug, lesson: lessonSlug } = await params;
  const phase = PHASES.find((p) => p.slug === phaseSlug);
  const lesson = phase?.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return {};
  return { title: lesson.title, description: lesson.description };
}

export default async function LessonPage({ params }: Props) {
  const { phase: phaseSlug, lesson: lessonSlug } = await params;
  const phase = PHASES.find((p) => p.slug === phaseSlug);
  if (!phase) notFound();

  const lessonIndex = phase.lessons.findIndex((l) => l.slug === lessonSlug);
  if (lessonIndex === -1) notFound();

  const lesson = phase.lessons[lessonIndex];
  const prevLesson = phase.lessons[lessonIndex - 1];
  const nextLesson = phase.lessons[lessonIndex + 1];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-20">
            <Link
              href={`/curriculum/${phase.slug}/`}
              className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 mb-4 transition-colors"
            >
              <ArrowLeft size={12} /> {phase.title}
            </Link>
            <nav className="space-y-1">
              {phase.lessons.map((l) => (
                <Link
                  key={l.slug}
                  href={`/curriculum/${phase.slug}/${l.slug}/`}
                  className={`block text-sm px-3 py-1.5 rounded-md transition-colors ${
                    l.slug === lesson.slug
                      ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-medium"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  {l.order}. {l.title}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <article className="flex-1 min-w-0 max-w-2xl">
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-4">
            <Link href="/curriculum/" className="hover:text-zinc-600 dark:hover:text-zinc-300">Curriculum</Link>
            <span>/</span>
            <Link href={`/curriculum/${phase.slug}/`} className="hover:text-zinc-600 dark:hover:text-zinc-300">{phase.title}</Link>
            <span>/</span>
            <span className="text-zinc-600 dark:text-zinc-300">{lesson.title}</span>
          </div>

          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{lesson.title}</h1>
          <p className="text-zinc-500 mb-6">{lesson.description}</p>

          {lesson.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {lesson.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="border border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg p-8 text-center text-zinc-400 mb-8">
            <p className="text-sm">
              Full lesson content is in{" "}
              <code className="font-mono text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                curriculum/{phase.slug}/{lesson.order}-{lesson.slug}/README.md
              </code>
            </p>
            <p className="text-xs mt-2">
              MDX rendering coming soon.{" "}
              <a
                href="https://github.com/your-username/python-from-scratch"
                className="text-indigo-500 hover:underline"
              >
                Contribute →
              </a>
            </p>
          </div>

          <div className="flex justify-between pt-6 border-t border-zinc-200 dark:border-zinc-800">
            {prevLesson ? (
              <Link
                href={`/curriculum/${phase.slug}/${prevLesson.slug}/`}
                className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                <ArrowLeft size={14} /> {prevLesson.title}
              </Link>
            ) : <span />}
            {nextLesson && (
              <Link
                href={`/curriculum/${phase.slug}/${nextLesson.slug}/`}
                className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                {nextLesson.title} <ArrowRight size={14} />
              </Link>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
