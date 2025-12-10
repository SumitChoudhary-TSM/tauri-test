import CheckIcon from "@/styles/icons/CheckIcon";
import ClockIcon from "@/styles/icons/ClockIcon";
import ErrorIcon from "@/styles/icons/ErrorIcon";
import ShippingIcon from "@/styles/icons/ShippingIcon";

export const stats = [
    { label: 'Pending Review', value: 12, icon: <ErrorIcon />, bgColor: 'bg-badge-amber' },
    { label: 'In Production', value: 24, icon: <ClockIcon />, bgColor: 'bg-badge-blue' },
    { label: 'Ready to Ship', value: 8, icon: <CheckIcon />, bgColor: 'bg-badge-orange' },
    { label: 'This Month Revenue', value: '$45,230', icon: <ShippingIcon />, bgColor: 'bg-muted' },
  ];