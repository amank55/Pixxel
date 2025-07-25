import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <div className="flex justify-center pt-48">{children}</div>;
};

export default AuthLayout;