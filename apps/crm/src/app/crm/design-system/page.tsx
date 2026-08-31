'use client';

import * as React from 'react';
import {
  TravelButton,
  TravelBadge,
  TravelInput,
  TravelSelect,
  TravelMetric,
  TravelStatusDot,
  TravelDialog,
  TravelAlertDialog,
  TravelSheet,
  TravelTabs,
  TravelTooltip,
  TravelPopover,
  TravelToast,
  TravelSkeleton,
} from '@/components/ui/travel';
import { Activity, Mail, Search } from 'lucide-react';

export default function DesignSystemPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-32">
      <div>
        <h1 className="text-2xl font-serif text-[#F5F1E8] mb-2">TravelOS Design System</h1>
        <p className="text-sm text-[#F5F1E8]/50">Phase 1 primitives review page.</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-sm font-mono uppercase tracking-wider text-[#C9A66B] border-b border-[rgba(201,166,107,0.2)] pb-2">Buttons</h2>
        <div className="flex flex-wrap items-center gap-4">
          <TravelButton variant="primary">Primary Action</TravelButton>
          <TravelButton variant="secondary">Secondary Tool</TravelButton>
          <TravelButton variant="outline">Outline Button</TravelButton>
          <TravelButton variant="ghost">Ghost Button</TravelButton>
          <TravelButton variant="danger">Destructive</TravelButton>
          <TravelButton variant="primary" loading>Loading</TravelButton>
          <TravelButton variant="primary" disabled>Disabled</TravelButton>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-mono uppercase tracking-wider text-[#C9A66B] border-b border-[rgba(201,166,107,0.2)] pb-2">Badges & Dots</h2>
        <div className="flex flex-wrap items-center gap-4 bg-[#0B0F1A] p-4 rounded-xl border border-[rgba(201,166,107,0.1)]">
          <TravelBadge variant="gold" dot>VIP Member</TravelBadge>
          <TravelBadge variant="success" dot>Confirmed</TravelBadge>
          <TravelBadge variant="warning" dot>Pending</TravelBadge>
          <TravelBadge variant="error" dot>Action Required</TravelBadge>
          <TravelBadge variant="info">New Update</TravelBadge>
          <TravelBadge variant="neutral">Draft</TravelBadge>
          <div className="w-px h-6 bg-[rgba(201,166,107,0.2)] mx-2" />
          <TravelStatusDot status="online" pulse />
          <TravelStatusDot status="in_progress" pulse />
          <TravelStatusDot status="pending" />
          <TravelStatusDot status="danger" pulse />
          <TravelStatusDot status="neutral" />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-mono uppercase tracking-wider text-[#C9A66B] border-b border-[rgba(201,166,107,0.2)] pb-2">Inputs & Selects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          <div className="space-y-2">
            <label className="text-xs text-[#F5F1E8]/70">Standard Input</label>
            <TravelInput placeholder="Enter customer name..." />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-[#F5F1E8]/70">With Icons</label>
            <TravelInput prefixIcon={<Search className="w-3.5 h-3.5" />} placeholder="Search records..." />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-[#F5F1E8]/70">Select Dropdown</label>
            <TravelSelect>
              <option value="1">High Priority</option>
              <option value="2">Medium Priority</option>
              <option value="3">Low Priority</option>
            </TravelSelect>
          </div>
          <div className="space-y-2">
            <label className="text-xs text-[#F5F1E8]/70">Error State</label>
            <TravelInput error defaultValue="Invalid data" />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-mono uppercase tracking-wider text-[#C9A66B] border-b border-[rgba(201,166,107,0.2)] pb-2">Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TravelMetric
            title="Total Revenue"
            value="$1,245,000"
            delta={12.5}
            deltaLabel="vs last month"
            trend="up"
            icon={<Activity className="w-3.5 h-3.5" />}
          />
          <TravelMetric
            title="Active Requests"
            value="34"
            delta={-2.4}
            deltaLabel="vs last week"
            trend="down"
            icon={<Mail className="w-3.5 h-3.5" />}
          />
          <TravelMetric
            title="Processing"
            value="Loading..."
            loading
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-mono uppercase tracking-wider text-[#C9A66B] border-b border-[rgba(201,166,107,0.2)] pb-2">Overlays (Dialog, Sheet, Popover, Tooltip)</h2>
        <div className="flex flex-wrap items-center gap-4">
          <TravelDialog
            trigger={<TravelButton variant="secondary">Open Dialog</TravelButton>}
            title="Customer Details"
            description="View and edit customer information."
            footer={<TravelButton variant="primary">Save Changes</TravelButton>}
          >
            <div className="space-y-4">
              <TravelInput placeholder="Name" />
              <TravelInput placeholder="Email" />
            </div>
          </TravelDialog>

          <TravelAlertDialog
            trigger={<TravelButton variant="danger">Delete Record</TravelButton>}
            title="Are you absolutely sure?"
            description="This action cannot be undone. This will permanently delete the customer record from our servers."
            confirmLabel="Delete"
          />

          <TravelSheet
            trigger={<TravelButton variant="secondary">Open Inspector</TravelButton>}
            title="Trip Inspector"
            description="Detailed view of the selected trip."
            footer={<TravelButton variant="primary" className="w-full">Confirm Trip</TravelButton>}
          >
            <div className="space-y-4">
              <TravelSkeleton className="h-24 w-full" />
              <TravelSkeleton className="h-12 w-full" />
              <TravelSkeleton className="h-12 w-full" />
            </div>
          </TravelSheet>

          <TravelPopover
            trigger={<TravelButton variant="outline">Open Popover</TravelButton>}
          >
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-[#F5F1E8]">Quick Settings</h4>
              <p className="text-xs text-[#F5F1E8]/50">Configure your workspace preferences.</p>
            </div>
          </TravelPopover>

          <TravelTooltip content="Click to view more details" shortcut="⌘K">
            <button className="text-xs text-[#C9A66B] underline hover:text-[#E8C77A]">Hover for tooltip</button>
          </TravelTooltip>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-mono uppercase tracking-wider text-[#C9A66B] border-b border-[rgba(201,166,107,0.2)] pb-2">Tabs</h2>
        <TravelTabs
          items={[
            { id: 'overview', label: 'Overview', content: <div className="p-4 bg-[#0B0F1A] rounded-xl border border-[rgba(201,166,107,0.1)] mt-4">Overview Content</div> },
            { id: 'itinerary', label: 'Itinerary', badge: <TravelBadge variant="gold">New</TravelBadge>, content: <div className="p-4 bg-[#0B0F1A] rounded-xl border border-[rgba(201,166,107,0.1)] mt-4">Itinerary Content</div> },
            { id: 'finances', label: 'Finances', content: <div className="p-4 bg-[#0B0F1A] rounded-xl border border-[rgba(201,166,107,0.1)] mt-4">Finances Content</div> },
          ]}
        />
      </section>
      
      <section className="space-y-4">
        <h2 className="text-sm font-mono uppercase tracking-wider text-[#C9A66B] border-b border-[rgba(201,166,107,0.2)] pb-2">Toast Notifications</h2>
        <div className="flex gap-4">
          <TravelButton onClick={() => TravelToast.success('Booking confirmed', 'The itinerary has been sent to the client.')}>Success Toast</TravelButton>
          <TravelButton onClick={() => TravelToast.error('Payment failed', 'Please check the credit card details.')}>Error Toast</TravelButton>
        </div>
      </section>
    </div>
  );
}
