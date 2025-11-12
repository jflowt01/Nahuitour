import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Badge } from './ui/badge';
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

export const AvailabilityBadge = ({ status, percentage }) => {
  const { t } = useLanguage();

  const statusConfig = {
    available: {
      label: t('availableSpots'),
      icon: CheckCircle2,
      className: 'bg-available/10 text-available border-available/20',
    },
    medium: {
      label: t('mediumOccupancy'),
      icon: AlertCircle,
      className: 'bg-warning/10 text-warning border-warning/20',
    },
    full: {
      label: t('fullyBooked'),
      icon: XCircle,
      className: 'bg-full/10 text-full border-full/20',
    },
  };

  const config = statusConfig[status] || statusConfig.available;
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={`gap-1.5 ${config.className}`}>
      <Icon className="h-3.5 w-3.5" />
      {config.label} ({percentage}%)
    </Badge>
  );
};