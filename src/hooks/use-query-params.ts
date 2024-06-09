import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const useQueryParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return {
    get: (paramKey: string) => searchParams.get(paramKey),
    set: (paramKey: string, value: string) => {
      router.push(pathname + "?" + createQueryString(paramKey, value));
    },
  };
};

export default useQueryParams;
