import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useAuth } from "@/context/-auth-context";
import { useState } from "react";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Check,
  Edit2,
  X,
  User,
  Mail,
  Phone,
  Shield,
  Activity,
  Fingerprint,
  Globe,
  Sparkles,
  Camera,
  Trash2,
} from "lucide-react";

export function ProfilePage() {
  const { user } = useAuth();

  // Track if we are in "edit mode"
  const [isEditing, setIsEditing] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    mobileNumber: "",
  });

  // Track original data to allow canceling edits
  const [originalData, setOriginalData] = useState({ ...formData });

  // Handle generic input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle save logic
  const handleSave = () => {
    setOriginalData({ ...formData });
    setIsEditing(false);
  };

  // Handle cancel logic
  const handleCancel = () => {
    setFormData({ ...originalData });
    setIsEditing(false);
  };

  // Calculate initials for the avatar
  const nameParts = (formData.name || user?.name || user?.email || "User").trim().split(/\s+/);
  const initials = nameParts.length > 1
    ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
    : nameParts[0].slice(0, 2).toUpperCase();

  // Profile completeness calculation
  const fields = [formData.name, formData.email, formData.mobileNumber];
  const filledCount = fields.filter(Boolean).length;
  const completeness = Math.round((filledCount / fields.length) * 100);

  return (
    <div className="relative mx-auto w-full max-w-4xl space-y-8 pb-12 animate-[fade-in_0.5s_ease-out]">
      {/* Decorative ambient blur spheres */}
      <div className="absolute -top-12 -left-12 -z-10 h-72 w-72 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 -z-10 h-72 w-72 rounded-full bg-pink-600/10 blur-3xl pointer-events-none" />

      <style>{`
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.25); opacity: 0.6; }
        }
        .glow-avatar-ring {
          background: linear-gradient(to right, #6366f1, #ec4899, #14b8a6);
          background-size: 200% 200%;
          animation: rotateSlow 12s linear infinite;
        }
        .pulse-active {
          animation: pulseDot 2s infinite ease-in-out;
        }
        .hover-float {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hover-float:hover {
          transform: translateY(-2px);
          background-color: var(--color-slate-950 / 0.4);
          border-color: rgba(99, 102, 241, 0.25);
        }
      `}</style>

      {/* Header Info */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-50 bg-gradient-to-r from-slate-50 via-slate-100 to-slate-300 bg-clip-text">
            My Profile
          </h1>
          <p className="text-sm text-slate-400">
            Manage your name and contact details.
          </p>
        </div>
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 pulse-active"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Active Account
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
        {/* Left Column: Identity Card & Stats */}
        <div className="md:col-span-2 space-y-6">
          <Card className="overflow-hidden border-slate-800/80 bg-slate-900/40 backdrop-blur-xl shadow-xl">
            {/* Header Banner */}
            <div className="relative h-28 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/25" />
            </div>

            {/* Avatar / Identity Details */}
            <div className="relative flex flex-col items-center -mt-12 pb-6 px-4">
              <div className="relative">
                {/* Rotating Border Glow */}
                <div className="absolute -inset-0.5 rounded-full glow-avatar-ring opacity-80 blur-[2px]" />
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-4 border-slate-900 bg-slate-950 shadow-2xl">
                  {isEditing && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center rounded-full bg-slate-950/80 text-[10px] font-bold text-indigo-400 cursor-default transition-all duration-200">
                      <Camera className="size-4 mb-1" />
                      <span>EDITING</span>
                    </div>
                  )}
                  <span className="text-3xl font-extrabold tracking-wider bg-gradient-to-tr from-indigo-300 via-purple-200 to-pink-300 bg-clip-text text-transparent">
                    {initials}
                  </span>
                </div>
                <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-slate-900 bg-emerald-500 shadow-md pulse-active" />
              </div>

              <h2 className="mt-4 text-xl font-bold text-slate-100 tracking-tight">
                {formData.name || "Barangay Staff"}
              </h2>
              <p className="text-xs text-indigo-400 font-semibold tracking-wider uppercase mt-1">
                Barangay Secretary
              </p>
              <p className="text-xs text-slate-400 mt-1 max-w-[200px] text-center truncate">
                {formData.email}
              </p>

              {/* Dummy Change Photo Button */}
              <Button
                variant="outline"
                size="sm"
                className="mt-3.5 h-8 border-slate-800 bg-slate-950/60 text-slate-300 hover:text-slate-100 hover:bg-slate-900 active:scale-95 transition-all text-xs"
                onClick={() => alert("Change Profile Picture clicked (Dummy function)")}
              >
                <Camera className="mr-1.5 size-3.5 text-indigo-400" />
                Change Photo
              </Button>
            </div>

            <Separator className="bg-slate-800/60" />

            {/* Completeness / Stats */}
            <CardContent className="pt-6 pb-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-400">Profile Completeness</span>
                  <span className="text-indigo-400">{completeness}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-950 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out"
                    style={{ width: `${completeness}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-500 leading-normal">
                  {completeness === 100
                    ? "Your profile details are complete."
                    : "Fill in all fields to complete your profile."}
                </p>
              </div>
            </CardContent>

            <Separator className="bg-slate-800/60" />

            {/* Dummy Account Deletion Block */}
            <div className="p-4 bg-slate-950/10">
              <Button
                variant="ghost"
                className="w-full h-8 justify-start text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 active:scale-[0.98] transition-all text-xs border border-transparent hover:border-rose-500/10"
                onClick={() => alert("Request Account Deletion clicked (Dummy function)")}
              >
                <Trash2 className="mr-1.5 size-3.5 text-rose-400" />
                Request Deletion
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column: Account Registry Form */}
        <div className="md:col-span-3">
          <Card className="flex h-full flex-col border-slate-800/80 bg-slate-900/40 backdrop-blur-xl shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div className="space-y-0.5">
                <CardTitle className="text-lg font-bold text-slate-100 tracking-tight flex items-center gap-2">
                  <User className="size-4 text-indigo-400 shrink-0" />
                  Profile Details
                </CardTitle>
                <CardDescription className="text-slate-400 text-xs">
                  Review or update your personal contact details.
                </CardDescription>
              </div>
              {!isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="border-slate-800 bg-slate-950/60 text-slate-300 hover:text-slate-100 hover:bg-slate-900 active:scale-95 transition-all duration-200"
                >
                  <Edit2 className="mr-1.5 size-3 text-indigo-400" />
                  Edit Profile
                </Button>
              )}
            </CardHeader>

            <CardContent className="space-y-4 flex-1">
              {!isEditing ? (
                // View Mode
                <div className="grid grid-cols-1 gap-3.5">
                  {/* Name Item */}
                  <div className="flex items-center gap-4 rounded-xl border border-slate-800/40 bg-slate-950/20 p-4 hover-float">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      <User className="size-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Full Name</p>
                      <p className="text-sm font-semibold text-slate-200 mt-0.5 truncate">
                        {formData.name || <span className="text-slate-500 font-normal italic">No name provided</span>}
                      </p>
                    </div>
                  </div>

                  {/* Email Item */}
                  <div className="flex items-center gap-4 rounded-xl border border-slate-800/40 bg-slate-950/20 p-4 hover-float">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/20">
                      <Mail className="size-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Email Address</p>
                      <p className="text-sm font-semibold text-slate-200 mt-0.5 truncate">
                        {formData.email || <span className="text-slate-500 font-normal italic">No email provided</span>}
                      </p>
                    </div>
                  </div>

                  {/* Mobile Item */}
                  <div className="flex items-center gap-4 rounded-xl border border-slate-800/40 bg-slate-950/20 p-4 hover-float">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Phone className="size-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Mobile Number</p>
                      <p className="text-sm font-semibold text-slate-200 mt-0.5 truncate">
                        {formData.mobileNumber || <span className="text-slate-500 font-normal italic">No phone added</span>}
                      </p>
                    </div>
                  </div>

                  {/* User ID (Static View) */}
                  <div className="flex items-center gap-4 rounded-xl border border-slate-800/40 bg-slate-950/10 p-4 opacity-75">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-800/50 text-slate-500 border border-slate-700/20">
                      <Shield className="size-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase font-bold tracking-wider text-slate-600">User ID</p>
                      <p className="text-xs font-mono font-medium text-slate-500 mt-0.5 truncate">
                        {user?.id ?? "—"}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                // Edit Mode
                <div className="space-y-4">
                  {/* Name Input */}
                  <div className="space-y-2 animate-[fade-in_0.3s_ease-out]">
                    <Label htmlFor="name" className="text-slate-400 text-xs font-semibold">Full Name</Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                        <User className="size-4" />
                      </div>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="pl-10 border-slate-800 bg-slate-950 text-slate-50 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500 transition-all"
                        placeholder="e.g. John Doe"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2 animate-[fade-in_0.3s_ease-out]">
                    <Label htmlFor="email" className="text-slate-400 text-xs font-semibold">Email Address</Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                        <Mail className="size-4" />
                      </div>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10 border-slate-800 bg-slate-950 text-slate-50 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500 transition-all"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  {/* Mobile Input */}
                  <div className="space-y-2 animate-[fade-in_0.3s_ease-out]">
                    <Label htmlFor="mobileNumber" className="text-slate-400 text-xs font-semibold">Mobile Number</Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                        <Phone className="size-4" />
                      </div>
                      <Input
                        id="mobileNumber"
                        name="mobileNumber"
                        type="tel"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        className="pl-10 border-slate-800 bg-slate-950 text-slate-50 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500 transition-all"
                        placeholder="+63 912 345 6789"
                      />
                    </div>
                  </div>

                  {/* User ID (Static input style) */}
                  <div className="space-y-2">
                    <Label htmlFor="userId" className="text-slate-500 text-xs font-semibold">User ID (Read-only)</Label>
                    <div className="relative opacity-60">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600">
                        <Shield className="size-4" />
                      </div>
                      <Input
                        id="userId"
                        value={user?.id ?? "—"}
                        disabled
                        className="pl-10 border-slate-800/50 bg-slate-950 text-slate-600 cursor-not-allowed font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>

            {/* Edit Mode Buttons */}
            {isEditing && (
              <CardFooter className="flex justify-end gap-2 border-t border-slate-800/60 pt-4 bg-slate-950/20">
                <Button
                  variant="ghost"
                  onClick={handleCancel}
                  className="text-slate-400 hover:text-slate-100 hover:bg-slate-900 transition-colors"
                >
                  <X className="mr-1.5 size-4" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-indigo-600 text-white hover:bg-indigo-500 active:scale-95 transition-all duration-200 shadow-md shadow-indigo-600/25"
                >
                  <Check className="mr-1.5 size-4" />
                  Save Changes
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
