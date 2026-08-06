export function parsePokemonApiResourceId(url: string): number | null {
  const normalizedUrl = url.trim().replace(/\/+$/, "");

  if (!normalizedUrl) {
    return null;
  }

  const lastPathSegment = normalizedUrl.split("/").pop();

  if (!lastPathSegment || !/^\d+$/.test(lastPathSegment)) {
    return null;
  }

  const resourceId = Number(lastPathSegment);

  if (!Number.isSafeInteger(resourceId) || resourceId <= 0) {
    return null;
  }

  return resourceId;
}
