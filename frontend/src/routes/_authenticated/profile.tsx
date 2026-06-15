import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "./-profile";

// Authenticated profile route — read-only for now
export const Route = createFileRoute("/_authenticated/profile")({
  component: ProfilePage,
});
