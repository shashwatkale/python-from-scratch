import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contributing",
  description: "How to contribute to Python From Scratch.",
};

export default function ContributingPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">Contributing</h1>
      <div className="space-y-6 text-zinc-600 dark:text-zinc-400 leading-7">
        <p>
          Contributions are welcome. See{" "}
          <a
            href="https://github.com/your-username/python-from-scratch/blob/main/CONTRIBUTING.md"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            CONTRIBUTING.md
          </a>{" "}
          for the full guide.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Fix a typo or error in a lesson</li>
          <li>Add a new lesson following the standard structure</li>
          <li>Add exercises or solutions</li>
          <li>Add a project with tests and a README</li>
          <li>Improve the website</li>
        </ul>
        <p>
          Open an issue first for large changes. Small fixes can go straight to a pull request.
        </p>
      </div>
    </div>
  );
}
