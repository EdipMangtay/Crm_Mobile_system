/**
 * TRAVIA CRM — Central Component Exports
 * All CRM UI primitives, shell layouts, views, and modal components in one place
 */

// UI Primitives
export { default as Badge } from './ui/Badge';
export { default as KPICard } from './ui/KPICard';
export { default as EmptyState } from './ui/EmptyState';
export { default as LoadingSkeleton } from './ui/LoadingSkeleton';

// Shell Layout
export { default as CrmSidebar } from './shell/Sidebar';
export { default as CrmHeader } from './shell/Header';
export { default as CommandPalette } from './shell/CommandPalette';

// Feature Modals & Components
export { default as PaymentLinkModal } from './payments/PaymentLinkModal';
export { default as ProposalModal } from './proposal/ProposalModal';
export { default as SmartReplies } from './concierge/SmartReplies';

// Views
export { default as ConciergeView } from './views/ConciergeView';
