# Hoffman Agency - App UI Kit

A product-interface companion to the marketing website kit. These components are
for dashboards, admin tools, campaign trackers, client portals, and workflow
surfaces where density, scanability, and predictable controls matter more than
editorial drama.

## Files

- `index.html` - interactive product UI demo and component catalog
- `AppUI.jsx` - React primitives for forms, navigation, feedback, data display,
  disclosure, and progress
- `COMPONENTS.md` - compact usage examples and component selection guidance

## Component Coverage

- Forms: `TextField`, `TextareaField`, `SelectField`, `DateField`, `FileField`,
  `SliderField`, `Checkbox`, `RadioGroup`, `Toggle`
- Navigation: `Tabs`, `Breadcrumbs`, `Pagination`, `Sidebar`, `MobileMenu`
- Feedback: `AlertBanner`, `Toast`, `Modal`, `Tooltip`, `Popover`
- Data display: `DataTable`, `DataList`, `Avatar`, `Badge`, `Divider`
- Disclosure: `Accordion`, `Drawer`, `Menu`
- Progress: `ProgressBar`, `Spinner`, `Skeleton`
- Actions: `AppButton`

## Notes

- Built on the existing Hoffman tokens in `colors_and_type.css`.
- Uses restrained product UI styling: square actions, 6px form controls, hairline
  borders, dense spacing, and native controls where possible.
- The app kit is intentionally not a marketing page. Start with the working
  dashboard pattern in `index.html` when building operational tools.
