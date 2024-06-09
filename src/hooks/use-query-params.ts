import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const useQueryParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPageLoading, setIsPageLoading] = useState(false);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    setIsPageLoading(false);
  }, [pathname, searchParams]);

  return {
    get: (paramKey: string) => searchParams.get(paramKey),
    set: (paramKey: string, value: string) => {
      if (value !== searchParams.get(paramKey)) {
        setIsPageLoading(true);
        router.replace(pathname + "?" + createQueryString(paramKey, value));
      }
    },
    isPageLoading,
  };
};

export default useQueryParams;
