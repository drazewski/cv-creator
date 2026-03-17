# Defects

## How you should solve them
If they are easy to fix - fix them please without asking, just do it. If they require more work, inform me and add them as a Feature to NEW_FEATURES_PLAN.md with proper prio

## Defects list

| # | Description | Status | Notes |
|---|---|---|---|
| 1 | Classic layout / sidebar: when I remove (hide) any contact element the space between existing elements is too big | ✅ Fixed | Sidebar now skips hidden wrapper divs entirely so CSS sibling spacing only applies to visible items |
| 2 | Changing Sidebar text size has no effect on email address and LinkedIn link | ✅ Fixed | `useFitText` now observes `.cv-layout` style attribute via MutationObserver and re-measures on CSS variable change |
| 3 | Body spacing: minimum value should be 1 | ✅ Fixed | `SpacingSlider` min changed from 1.2 → 1 |
| 4 | Sidebar spacing: minimum value should be 1 | ✅ Fixed | Same as above |
| 5 | Section titles: maximum value should be 20 | ✅ Fixed | Both US and Classic section title sliders max changed 18 → 20 |
| 6 | Custom elements in body/sidebar should appear in Elements drawer with drag-to-reorder | ✅ Fixed | Custom sections now appear in the Elements drawer and can be reordered alongside built-in sections with persisted order |
| 7 | On mobile view: drawer tabs should not have labels (too much space) | ✅ Fixed | Labels hidden below 500px via media query in DrawerTabs.css |
| 8 | About Me items rendered as list (`<ul>/<li>`) — should be plain text | ✅ Fixed | About Me now defaults to plain text, and main sections use inline `Add text` / `Add point` actions for mixed content without extra drawer controls |
| 9 | Classic layout entry remove buttons were hidden and close/remove X icons had inconsistent sizing | ✅ Fixed | Experience, Education, and Certifications remove buttons are always visible in Classic; all close/remove controls now use a shared 24px button with a 12px icon |
| 10 | Classic layout printing: on multi-page CVs the sidebar should fill the full height of the last printed page too | ✅ Fixed | Print styling now uses a fixed classic sidebar stripe so browsers redraw the left column on every printed page, including the last one |
| 11 | Default parts of CV, like for example country name in contact or experience (word "Present") should translate to the language of the CV | ✅ Fixed | "Present" in experience periods auto-translates on language change; new entry placeholders (Company, Role, etc.) are localized per CV language |
| 12 | When selecting dates for experience or education, the month and year dropdowns should be in the CV language, not always English (maybe a new feature if too hard to implement) | ❌ Not Fixed | Requires localization of date picker components, which may be a significant effort depending on the library used |
| 13 | Skills and languages in US layout must have dots as they are list items | ✅ Fixed | Added `list-style-type: disc` to `.us-simple-list` in USLayout.css |
| 14 | Languages should be selectable from a dropdown with common languages and their proficiency levels, not free text input (maybe a new feature if too hard to implement) | ❌ Not Fixed | Requires implementation of a new controlled input component with predefined options and proficiency levels, which may be a significant effort |
| 15 | Simple text (not list items) should have possibility to change the alignment (left, center, right, justify) | ❌ Not Fixed | Requires adding alignment controls to the UI and applying corresponding CSS classes to text elements, which may be a significant effort |