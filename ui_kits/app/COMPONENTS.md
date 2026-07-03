# App UI Components

Examples assume React and either direct imports from `AppUI.jsx` or the compiled
namespace `window.HoffmanAgencyDesignSystem_d10f7f`.

## Actions

```jsx
<AppButton>Save brief</AppButton>
<AppButton variant="neutral">Cancel</AppButton>
<AppButton variant="danger">Delete</AppButton>
<AppButton loading>Syncing</AppButton>
```

Use `AppButton` for product commands. Keep labels direct verbs. Do not use
marketing CTA copy such as "Learn more" inside app workflows.

## Forms

```jsx
<TextField label="Client" placeholder="NovaGraph" />
<TextField label="Budget" prefix="$" suffix="USD" defaultValue="84000" />
<TextareaField label="What changed?" rows={4} />
<SelectField label="Region" options={["APAC", "US", "EMEA"]} />
<DateField label="Target date" defaultValue="2026-07-17" />
<FileField label="Source file" helper="PDF, DOCX, or CSV" />
<SliderField label="Confidence" value={72} />
```

```jsx
<Checkbox label="Notify account team" defaultChecked />
<RadioGroup
  label="Priority channel"
  name="priority"
  value="earned"
  options={[
    { label: "Earned media", value: "earned" },
    { label: "Social", value: "social" },
  ]}
/>
<Toggle label="Client-visible draft" defaultChecked />
```

Use native form controls where possible. The app kit handles label structure,
helper text, error text, compact spacing, and tokenized borders.

## Navigation

```jsx
<Tabs
  tabs={[
    { key: "pipeline", label: "Pipeline" },
    { key: "activity", label: "Activity" },
    { key: "assets", label: "Assets" },
  ]}
  defaultKey="pipeline"
/>
```

```jsx
<Breadcrumbs
  items={[
    { label: "Client portal", href: "#" },
    { label: "Accounts", href: "#" },
    { label: "NovaGraph" },
  ]}
/>
```

```jsx
<Pagination page={2} total={4} />
<Sidebar items={navItems} activeKey="accounts" />
<MobileMenu label="Menu" items={[{ label: "Reports" }, { label: "Settings" }]} />
```

Use `Sidebar` for persistent product navigation. Use `MobileMenu` as a compact
fallback; do not turn product navigation into a marketing nav.

## Feedback

```jsx
<AlertBanner tone="info" title="Weekly report draft is ready">
  Check proof points before sharing with the client.
</AlertBanner>
```

```jsx
<Toast tone="success" title="Saved">
  The client brief is synced.
</Toast>
```

```jsx
<Modal
  open={modalOpen}
  title="Create brief"
  onClose={() => setModalOpen(false)}
  footer={<AppButton>Create</AppButton>}
>
  <TextField label="Client" />
</Modal>
```

```jsx
<Tooltip label="Open details">
  <AppButton variant="ghost">Details</AppButton>
</Tooltip>
<Popover trigger={<AppButton variant="neutral">Queue</AppButton>} title="Review queue">
  Three items need approval.
</Popover>
```

Use status color sparingly. The system should stay navy-led and readable.

## Data Display

```jsx
<DataTable
  columns={[
    { key: "account", label: "Account" },
    { key: "owner", label: "Owner" },
    { key: "health", label: "Health" },
  ]}
  rows={[
    { account: "NovaGraph", owner: "M. Lee", health: <Badge tone="success">Strong</Badge> },
  ]}
/>
```

```jsx
<DataList
  items={[
    { label: "Lead", value: "M. Lee" },
    { label: "Market", value: "Enterprise AI" },
  ]}
/>
<Avatar name="Takeo Hoffman" />
<Badge tone="accent">Launch</Badge>
<Divider label="Workflow" />
```

Use `DataTable` for comparison and repeated records. Use `DataList` for a
single object's metadata.

## Disclosure

```jsx
<Accordion
  items={[
    { title: "Coverage review", content: "Three clips need message checks." },
    { title: "Spokesperson prep", content: "Final talking points need review." },
  ]}
/>
```

```jsx
<Drawer open={drawerOpen} title="Account details" onClose={() => setDrawerOpen(false)}>
  <DataList items={items} />
</Drawer>
<Menu label="Actions" items={[{ label: "Export CSV" }, { label: "Delete", danger: true }]} />
```

Use disclosure for secondary detail. Do not hide primary workflow steps inside
menus or accordions.

## Progress

```jsx
<ProgressBar label="Launch readiness" value={74} />
<Spinner label="Refreshing" />
<Skeleton lines={3} />
```

Use skeletons for page or panel loading. Use spinners for short inline refresh
states. Use progress bars when the percentage has meaning.
