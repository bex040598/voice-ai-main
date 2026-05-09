import type { SearchSuggestion } from "../../types";

const phoneticDictionary: Record<string, string[]> = {
  registrar: ["rekstrar", "registrar", "registry", "ro'yxat"],
  "command room": ["kommanda", "commandroom", "komanda room", "control"],
  "department office": ["kafedra", "kafedra zal", "department", "office"],
  "dekan xonasi": ["dekanat", "dekanat honasi", "dean", "dekan xonasi"],
  kutubxona: ["library", "kutubhona", "biblioteka", "kitobxona"]
};

export const normalizeSearchText = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/g'/g, "g")
    .replace(/o'/g, "o")
    .replace(/sh/g, "s")
    .replace(/ch/g, "c")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, " ");

export const levenshteinDistance = (source: string, target: string): number => {
  const a = normalizeSearchText(source);
  const b = normalizeSearchText(target);
  const matrix = Array.from({ length: a.length + 1 }, () => Array<number>(b.length + 1).fill(0));

  for (let row = 0; row <= a.length; row += 1) {
    matrix[row][0] = row;
  }

  for (let column = 0; column <= b.length; column += 1) {
    matrix[0][column] = column;
  }

  for (let row = 1; row <= a.length; row += 1) {
    for (let column = 1; column <= b.length; column += 1) {
      const cost = a[row - 1] === b[column - 1] ? 0 : 1;
      matrix[row][column] = Math.min(
        matrix[row - 1][column] + 1,
        matrix[row][column - 1] + 1,
        matrix[row - 1][column - 1] + cost
      );
    }
  }

  return matrix[a.length][b.length];
};

export const resolveAlias = (query: string): string | null => {
  const normalized = normalizeSearchText(query);

  const matchedAlias = Object.entries(phoneticDictionary).find(([, aliases]) =>
    aliases.some((alias) => normalizeSearchText(alias) === normalized)
  );

  return matchedAlias?.[0] ?? null;
};

export const fuzzySearch = <T extends { name: string; aliases?: string[] }>(
  query: string,
  collection: T[],
  limit = 5
): SearchSuggestion<T>[] => {
  const normalizedQuery = normalizeSearchText(query);
  const aliasMatch = resolveAlias(normalizedQuery);

  return collection
    .map((item) => {
      const normalizedName = normalizeSearchText(item.name);
      const aliasCandidates = item.aliases?.map(normalizeSearchText) ?? [];

      if (normalizedName === normalizedQuery || aliasCandidates.includes(normalizedQuery)) {
        return {
          score: 0,
          normalizedQuery,
          target: item,
          matchedBy: "exact" as const
        };
      }

      if (aliasMatch && (normalizedName.includes(aliasMatch) || aliasCandidates.includes(aliasMatch))) {
        return {
          score: 1,
          normalizedQuery,
          target: item,
          matchedBy: "alias" as const
        };
      }

      const phoneticHit = aliasCandidates.find((candidate) =>
        candidate.includes(normalizedQuery) || normalizedQuery.includes(candidate)
      );

      if (phoneticHit) {
        return {
          score: 2,
          normalizedQuery,
          target: item,
          matchedBy: "phonetic" as const
        };
      }

      return {
        score: levenshteinDistance(normalizedQuery, normalizedName),
        normalizedQuery,
        target: item,
        matchedBy: "levenshtein" as const
      };
    })
    .sort((first, second) => first.score - second.score)
    .slice(0, limit);
};

export const searchStrings = (query: string, values: string[]): SearchSuggestion<string>[] =>
  fuzzySearch(
    query,
    values.map((name) => ({ name })),
    5
  ).map((result) => ({
    ...result,
    target: result.target.name
  }));
