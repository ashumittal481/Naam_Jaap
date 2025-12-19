"use client";

import { AuthProvider as FirebaseAuthProvider } from "@/hooks/useAuth";
import { ReactNode } from "react";

export default function AuthProvider({ children }: { children: ReactNode }) {
  return <FirebaseAuthProvider>{children}</FirebaseAuthProvider>;
}
