// src/data/glossary/data-python.ts
import type { GlossaryTerm } from "@/types";

export const DATA_PYTHON_TERMS: GlossaryTerm[] = [
  {
    slug: "numpy-vectorization",
    term: "NumPy & Vectorization",
    category: "data-python",
    categoryLabel: "Python for Data",
    difficulty: "intermediate",
    definition: "NumPy is the foundational Python library for numerical computing; vectorization refers to performing operations on entire arrays at once in compiled C code without Python `for` loops.",
    explanation: "Vectorized operations run 10x to 100x faster than standard Python loops due to SIMD CPU instructions and contiguous C-array memory layouts.",
    example: "# Vectorized element-wise multiplication in NumPy:\n# import numpy as np\n# a = np.array([1, 2, 3])\n# print(a * 2)",
    output: "[2 4 6]",
    whyItMatters: "The computational bedrock of scientific computing, data science, machine learning, and quantitative finance in Python.",
    relatedTerms: ["pandas-dataframe", "data-python"],
    relatedLessons: [{ title: "NumPy & Array Computing", phaseSlug: "18-data-python", lessonSlug: "numpy" }],
    tags: ["data", "numpy", "performance", "scientific"],
  },
  {
    slug: "pandas-dataframe",
    term: "Pandas DataFrame",
    category: "data-python",
    categoryLabel: "Python for Data",
    difficulty: "intermediate",
    definition: "A 2-dimensional labeled data structure with columns of potentially different types, resembling a spreadsheet or SQL table.",
    explanation: "Provides high-performance indexing, slicing, aggregation, grouping (`groupby`), and reshaping capabilities for tabular datasets.",
    example: "# import pandas as pd\n# df = pd.DataFrame({\"name\": [\"A\", \"B\"], \"age\": [20, 25]})\n# print(df[\"age\"].mean())",
    output: "22.5",
    whyItMatters: "The universal data structure for data ingestion, cleaning, transformation, and exploratory analysis in Python.",
    relatedTerms: ["numpy-vectorization", "data-python"],
    relatedLessons: [{ title: "Pandas & Data Analysis", phaseSlug: "18-data-python", lessonSlug: "pandas" }],
    tags: ["data", "pandas", "tabular"],
  },
];

