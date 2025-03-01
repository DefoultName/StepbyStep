import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import UserProfile from "./UserProfile";
import MembershipPurchase from "./MembershipPurchase";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface ProfileDialogProps {
  trigger: React.ReactNode;
}

const ProfileDialog = ({ trigger }: ProfileDialogProps) => {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<
    "login" | "register" | "profile" | "membership"
  >(isAuthenticated ? "profile" : "login");

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen && isAuthenticated) {
      setView("profile");
    } else if (newOpen && !isAuthenticated) {
      setView("login");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="bg-black border border-purple-700 text-white p-0"
        hideClose
      >
        {view === "login" && (
          <LoginForm
            open={view === "login"}
            onOpenChange={(isOpen) => !isOpen && setOpen(false)}
            onRegisterClick={() => setView("register")}
          />
        )}

        {view === "register" && (
          <RegisterForm
            open={view === "register"}
            onOpenChange={(isOpen) => !isOpen && setOpen(false)}
            onLoginClick={() => setView("login")}
          />
        )}

        {view === "profile" && (
          <UserProfile
            open={view === "profile"}
            onOpenChange={(isOpen) => !isOpen && setOpen(false)}
            onPurchaseMembership={() => setView("membership")}
          />
        )}

        {view === "membership" && (
          <MembershipPurchase
            open={view === "membership"}
            onOpenChange={(isOpen) => !isOpen && setOpen(false)}
            onSuccess={() => setView("profile")}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
