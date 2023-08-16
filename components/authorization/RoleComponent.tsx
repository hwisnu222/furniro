import { useSession } from "next-auth/react";
import React from "react";

/**
 *
 * @param role {Array} ["Admin","Authenticated"]
 * @returns
 */

export default function AuthorComponent({
  role,
  children,
}: {
  role: string[];
  children: React.ReactNode;
}) {
  const session = useSession();

  if (role.includes(session.data?.user.role as string)) {
    return children;
  }
  return null;
}
