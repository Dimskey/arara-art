export const isAdminEmail = (email?: string | null) => {
  if (!email) return false;

  const admins =
    process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",") || [];

  return admins.includes(email);
};
