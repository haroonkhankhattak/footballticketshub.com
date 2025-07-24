import {
  Apple,
  Armchair,
  Baby,
  BadgeMinus,
  Ban,
  EyeOff,
  FileWarning,
  User,
  UserMinus,
  Users,
} from "lucide-react";
import {
  QrCode,
  Smartphone,
  Handshake,
  Tag,
  ShieldCheck,
  Eye,
  UserCheck,
  ParkingCircle,
} from "lucide-react";

export const restrictionsList = [
  {
    label: "Restricted View",
    icon: Eye,
    color: "bg-yellow-100 text-yellow-800",
    description:
      "Seats may have a partially obstructed view of the pitch or stage.",
  },
  {
    label: "Severely Restricted View",
    icon: EyeOff,
    color: "bg-yellow-200 text-yellow-900",
    description:
      "Seats have a major obstruction, limiting clear visibility of the event.",
  },
  {
    label: "Passport Copy Required",
    icon: FileWarning,
    color: "bg-rose-100 text-rose-700",
    description: "Ticket holder must provide a valid passport copy to attend.",
  },
  {
    label: "No Hospitality Included",
    icon: BadgeMinus,
    color: "bg-red-100 text-red-700",
    description: "Ticket does not include any food, drinks, or lounge access.",
  },
  {
    label: "No Away Team Nationals",
    icon: Ban,
    color: "bg-orange-100 text-orange-700",
    description:
      "Restricted to home supporters only. Away team fans are not permitted.",
  },
  {
    label: "Standing Section",
    icon: Users,
    color: "bg-yellow-100 text-yellow-800",
    description:
      "This area has no seats; attendees must stand during the event.",
  },
  {
    label: "Unreserved Seating",
    icon: Users,
    color: "bg-yellow-100 text-yellow-800",
    description:
      "Seats are not assigned. First-come, first-served within the section.",
  },
  {
    label: "iPhone Users Only",
    icon: Apple,
    color: "bg-green-100 text-green-800",
    description: "Ticket can only be used via Apple Wallet or iOS device.",
  },
  {
    label: "Android Users Only",
    icon: Smartphone,
    color: "bg-green-100 text-green-800",
    description: "Ticket is compatible only with Android devices and apps.",
  },
  {
    label: "Junior Ticket",
    icon: Baby,
    color: "bg-blue-100 text-blue-800",
    description: "Valid for children. Age requirements may vary by event.",
  },
  {
    label: "Junior Ticket (Under 20yrs)",
    icon: Baby,
    color: "bg-blue-100 text-blue-800",
    description: "For attendees under 20 years old. ID may be required.",
  },
  {
    label: "Junior Ticket (Under 18yrs)",
    icon: Baby,
    color: "bg-blue-100 text-blue-800",
    description: "For attendees under 18 years old. Age must be verified.",
  },
  {
    label: "Junior Ticket (Under 17yrs)",
    icon: Baby,
    color: "bg-blue-100 text-blue-800",
    description:
      "For juniors 17 years old or younger. Age limit strictly enforced.",
  },
  {
    label: "Junior Ticket (18-21yrs)",
    icon: Baby,
    color: "bg-blue-100 text-blue-800",
    description: "For young attendees aged 18 to 21. Proof of age required.",
  },
  {
    label: "Junior Ticket (18-20yrs)",
    icon: Baby,
    color: "bg-blue-100 text-blue-800",
    description: "Valid for those aged between 18 and 20 years only.",
  },
  {
    label: "Young Adult Ticket (17-21yrs)",
    icon: User,
    color: "bg-indigo-100 text-indigo-800",
    description: "Ticket for attendees aged 17 to 21. Age check may apply.",
  },
  {
    label: "Young Adult Ticket (17-18yrs)",
    icon: User,
    color: "bg-indigo-100 text-indigo-800",
    description: "For young adults aged 17 to 18 only. Bring valid ID.",
  },
  {
    label: "Adult + Junior (Under 21yrs)",
    icon: Users,
    color: "bg-pink-100 text-pink-700",
    description:
      "Admits one adult and one junior under 21. Both must attend together.",
  },
  {
    label: "Adult + Junior (Under 20yrs)",
    icon: Users,
    color: "bg-pink-100 text-pink-700",
    description: "Admits one adult and one junior under 20 years of age.",
  },
  {
    label: "Adult + Junior (Under 18yrs)",
    icon: Users,
    color: "bg-pink-100 text-pink-700",
    description: "One adult and one junior under 18 must attend together.",
  },
  {
    label: "Adult + Junior (Under 17yrs)",
    icon: Users,
    color: "bg-pink-100 text-pink-700",
    description:
      "Age restriction applies, only usable for an adult and a junior 17 years of age and under.",
  },
  {
    label: "Adult + Junior (Under 16yrs)",
    icon: Users,
    color: "bg-pink-100 text-pink-700",
    description: "Valid for one adult and one junior aged under 16.",
  },
  {
    label: "Adult + Junior (Under 11yrs)",
    icon: Users,
    color: "bg-pink-100 text-pink-700",
    description: "Junior must be 11 or younger. Must attend with an adult.",
  },
  {
    label: "Adult + Junior",
    icon: Users,
    color: "bg-pink-100 text-pink-700",
    description: "Admits one adult and one junior. Age limit may vary.",
  },
  {
    label: "Adult + Senior",
    icon: Users,
    color: "bg-pink-100 text-pink-700",
    description: "Admits one adult and one senior. Senior age policy applies.",
  },
  {
    label: "Senior Ticket",
    icon: UserMinus,
    color: "bg-pink-100 text-pink-700",
    description:
      "For senior citizens. Age requirement typically 60+ or as specified.",
  },
];
