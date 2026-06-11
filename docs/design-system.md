# Design System — Visual Reference

A clean, light, functional SaaS aesthetic. White surfaces on a faint gray canvas, hairline borders instead of shadows, one saturated accent color carrying every primary action. Dense but breathable. Quiet, professional, unornamented.

## 1. Color palette

### Neutrals

- **Canvas:** `#F7F7F8` — the page background, a very light gray
- **Surface:** `#FFFFFF` — all cards, panels, and inputs
- **Hairline border:** `#ECECEC` (panels, cards) and `#E5E7EB` (form-row separators)
- **Text primary:** `#1A1A1A` — near-black
- **Text secondary:** `#6B7280` — labels, metadata, timestamps, inactive states
- **Text tertiary / placeholders:** `#9CA3AF`

### Accent

- **Primary:** `#4263EB` — saturated indigo. Used for: solid primary buttons, active-tab underlines, selected states. It is the only strong color on screen; everything else stays neutral.
- **Primary hover:** darken ~8% (`#3654D1` range)
- **Primary tint:** `rgba(66,99,235,.08)` — selected-row and hover backgrounds

### Functional

- **Success / active:** `#22C55E` — small status dots
- **Avatar pastels:** soft desaturated fills (lavender, mint, peach, sky) behind initials, one consistent color per entity

## 2. Typography

- **Family:** a neutral grotesque sans (Inter or equivalent system stack). One family for everything — no display face, no serif.
- **Scale:**
  - Page/pane titles: 18–20px, semibold
  - Row titles and emphasized values: 14px, semibold
  - Body and form values: 14px, regular
  - Labels, metadata, timestamps, time-ago: 12–13px, regular, secondary gray
  - Tabs and buttons: 13–14px, medium
- **Casing:** sentence case everywhere. No uppercase, no letter-spacing tricks.
- Hierarchy is built from weight and gray-value, not size jumps.

## 3. Shape, depth, and texture

- **Radii:** 8px on buttons and inputs; 10–12px on cards and image thumbnails; fully round on avatars and status dots
- **Borders:** 1px hairlines do all the separation — between panels, between list rows, between form rows
- **Shadows:** none in normal state. Depth comes from white-on-gray contrast. At most a whisper of shadow on floating elements (menus, dialogs)
- No gradients, no textures, no decorative elements

## 4. Iconography

- Line icons, ~1.5px stroke (Lucide style), 16–18px
- Color: secondary gray by default, near-black in active states
- Icons accompany — never replace — labels on buttons; icon-only is reserved for compact toolbars and rails

## 5. Components

### Buttons

- **Primary:** solid accent fill, white text, 8px radius, ~32–36px height, 13–14px medium label
- **Secondary:** white fill, hairline border, dark text, optional leading line icon
- **Tertiary / text:** plain secondary-gray text, no border
- Buttons sit bottom-right in cards and forms; primary on the right, secondary to its left

### Tabs

- Horizontal text tabs in a row, 13–14px
- Active: near-black text + 2px accent underline flush to the divider beneath
- Inactive: secondary gray, no underline

### Inputs and forms

- Borderless or hairline-bottom rows inside cards rather than boxed fields
- Form anatomy: label in secondary gray on the left, value in primary text to the right, hairline between rows
- Placeholders in tertiary gray
- Textareas: clean white area with placeholder, no visible border until focus

### Chips and badges

- **Outline pill:** hairline border, white fill, line icon + 12–13px label, fully rounded
- **Source/logo badge:** small rounded square (~18px) carrying a brand mark, optionally followed by a label
- **Avatar chip:** small circular avatar + name inline, used wherever a person is referenced
- **Count chip:** compact rounded rectangle, icon + number, secondary gray

### Lists

- Rows separated by hairlines, ~12px vertical padding, ~56–64px row height
- Row anatomy: optional thumbnail left (rounded), title in 14px semibold, supporting line in 12–13px secondary gray, right-aligned metadata (timestamps, counts) in light gray, optional avatar far right
- Hierarchical groups: parent rows expand via chevron; child rows indent slightly with a thin vertical connector line
- Hover: faint accent-tint background; selection via a checkbox that appears on hover
- Selected: accent-tint background, no heavy highlight

### Cards

- White, 10–12px radius, hairline border, 16–20px padding
- Stacked vertically with 16–24px gaps on the gray canvas
- A card holds one concern: a summary, a form, a feed

### Timeline / feed

- Entries on a thin vertical thread line, each with a line icon in a small circle
- Entry: 14px title, one-line snippet in secondary gray, right-aligned timestamp
- Date headers in semibold break the feed into days

## 6. Layout and density

- Multi-pane layout: a narrow icon rail (~44–48px), a list column (~340px), a fluid detail area
- Panes separated by hairlines, each scrolling independently
- Dense lists, calm details: list columns pack rows tightly; detail areas breathe with generous padding and spacing
- White space is the primary grouping device inside cards; hairlines between, space within

## 7. Feel

Neutral, fast, trustworthy back-office software. Nothing animates beyond instant state changes and subtle hovers. Nothing decorates. The accent color appears rarely enough that anything indigo reads as "this is the action." The interface recedes; the data is the interface.
