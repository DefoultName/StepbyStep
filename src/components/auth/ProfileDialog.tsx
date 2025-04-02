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
        className="bg-black border border-purple-700 text-white p-0 max-h-[90vh] overflow-hidden max-w-3xl w-full"
        hideClose
      >
        {view === "login" && (
          <LoginForm onRegisterClick={() => setView("register")} />
        )}

        {view === "register" && (
          <RegisterForm onLoginClick={() => setView("login")} />
        )}

        {view === "profile" && (
          <UserProfile
            onPurchaseMembership={() => setView("membership")}
            open={open}
            onOpenChange={handleOpenChange}
          />
        )}

        {view === "membership" && (
          <MembershipPurchase
            open={true}
            onOpenChange={(isOpen) => {
              if (!isOpen) setView("profile");
            }}
            onSuccess={() => setView("profile")}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
