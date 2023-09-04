import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useUpdateSearchParams = (params: { key: string; value: string}[]) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const current = new URLSearchParams(Array.from(searchParams.entries()));

  params.forEach(({ key, value }) => current.set(key, value));

  const search = current.toString();

  const query = search ? `?${search}` : "";

  router.push(`${pathName}${query}`);
};

export default useUpdateSearchParams;
