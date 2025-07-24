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

export const attributesList = [
  {
    label: "E-ticket",
    icon: QrCode,
    color: "bg-blue-100 text-blue-800",
    description: "Digital ticket with QR code for entry.",
  },
  {
    label: "Mobile Ticket",
    icon: Smartphone,
    color: "bg-indigo-100 text-indigo-800",
    description: "Use your phone to access your ticket.",
  },
  {
    label: "Hardcopy",
    icon: Tag,
    color: "bg-yellow-100 text-yellow-800",
    description: "Physical paper ticket required at entry.",
  },
  {
    label: "Unrestricted View",
    icon: Eye,
    color: "bg-green-100 text-green-800",
    description: "No view obstruction during the event.",
  },
  {
    label: "Home Area",
    icon: ShieldCheck,
    color: "bg-sky-100 text-sky-800",
    description: "Seat is within the home supporters section.",
  },
  {
    label: "Away Fans Allowed",
    icon: ShieldCheck,
    color: "bg-red-100 text-red-800",
    description: "Away team fans are welcome in this section.",
  },
  {
    label: "Neutral Fans Allowed",
    icon: Eye,
    color: "bg-purple-100 text-purple-800",
    description: "Open to both home and away supporters.",
  },
  {
    label: "VIP Entry",
    icon: UserCheck,
    color: "bg-green-100 text-green-800",
    description: "Includes fast-track or exclusive entrance access.",
  },
  {
    label: "Premium Hospitality",
    icon: Handshake,
    color: "bg-amber-100 text-amber-800",
    description: "High-end services like lounge access and meals.",
  },
  {
    label: "Parking Included",
    icon: ParkingCircle,
    color: "bg-gray-100 text-gray-800",
    description: "Includes a parking spot at the venue.",
  },
];
