import { useParams, usePathname, useSearchParams } from "next/navigation";

export default function useRoute() {
  const param = useParams();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const queryObject = Object.fromEntries(searchParams.entries());
  const queryString =
    "?" +
    Array.from(searchParams.entries())
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

  return {
    param,
    pathName,
    query: queryObject,
    fullPath: `${pathName}${queryString}`,
  };
}
