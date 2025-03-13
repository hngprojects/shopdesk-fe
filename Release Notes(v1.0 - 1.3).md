# Release Notes (v1.0 - v1.3)

## Version: v1.0
**Release Date:** 09/03/2025

### Features:
- **User Authentication:** Users can log in with email and password, with incorrect attempts blocked.
- **Basic Stock Management:** Users can add, view, edit, and delete stock items.
- **SKU Auto-population:** SKU codes auto-populate based on predefined codes if a user did not include it.
- **Currency Selection:** Users must select a currency when setting stock prices.
- **Soft-delete Protection:** Soft-deleted stock cannot be recreated with the same SKU.
- **Pagination for Stock List:** Users can navigate stock lists easily by allowing them to view and control a limited number of items per page.

## Version: v1.1
**Release Date:** 12/03/2025

### New Features:
- **Search Stock Items:**
  - Users can search for stock by name.
  - A search bar is provided on the home screen.

### Bug Fixes:
- Fixed stock details not editing on the API.

## Version: v1.2
**Release Date:** 12/03/2025

### New Features:
- **Inline Editing of Stock Items:**
  - Users can edit product details directly in the stock list once they click on the “edit” icon without opening a new page.
  - SKU remains read-only.
  - Input validation ensures valid values (numeric price, whole number quantity).
  - System saves updates automatically once the “Saved” icon is pressed.

### Bug Fixes:
- Fixed user session not expiring.

## Version: v1.3
**Release Date:** 13/03/2025

### New Features:
- **Sidebar for Viewing Stock Details:**
  - A sidebar opens when a user clicks on any stock item in the list.
  - The sidebar displays detailed information about the selected stock item.
  - The sidebar slides in from the right side of the screen without disrupting the main page layout.
  - The sidebar can be closed by clicking a ‘Close’ icon.

