/**
 * TRAVIA / TRAVELOS CRM — Central Component Exports
 * All CRM UI primitives, shell layouts, views, and modal components in one place
 */

// TravelOS Core Primitives (Phase 1)
export * from '@/components/ui/travel';

// Shell Layout & Context (Phase 2)
export * from './shell';

// Universal Table System (Phase 3)
export * from './table';
export * from './sheets';

// Legacy UI Primitives (Preserved for compatibility)
export { default as Badge } from './ui/Badge';
export { default as KPICard } from './ui/KPICard';
export { default as EmptyState } from './ui/EmptyState';
export { default as LoadingSkeleton } from './ui/LoadingSkeleton';

// Feature Modals & Components
export { default as PaymentLinkModal } from './payments/PaymentLinkModal';
export { default as ProposalModal } from './proposal/ProposalModal';
export { default as SmartReplies } from './concierge/SmartReplies';

// Views
export { default as ConciergeView } from './views/ConciergeView';
