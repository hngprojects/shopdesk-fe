# **Shopdesk**

## Project Description

Shopdesk is a web-based retail management system that simplifies stock tracking for retailers. It solves the problem of inefficient stock management by providing a user-friendly interface for adding, viewing, editing, and soft-deleting stock items. With secure user authentication, retailers can confidently manage their inventory and ensure accurate stock records.

---

## Figma design

[Shopdesk figma design](https://www.figma.com/design/MswwRaThuPkTBwTIlYLJ5Y/New-shopdesk?node-id=124-3816&p=f&t=r3i8ejHJkCD6gIFO-0)

---

## Live Demo

[Shopdesk Live Demo](http://157.180.27.189:7777/)

---

## Features

**User Authentication**:

- Users can log in with their email and password.
- Incorrect credentials block access to the system.

**Stock Management**:

- **Add Stock**: Users can add new stock items with details like name, SKU code, price, and quantity.
- **View Stock**: Users can view a list of all active stock items.
- **Edit Stock**: Users can update stock details (name, price, quantity) while keeping SKU codes read-only.
- **Soft-Delete Stock**: Stock items can be soft-deleted, meaning they are hidden from the stock list but remain stored in the database with a 'deleted' status.

---

## Technologies Used

**Frontend**:

- Next.js (React framework for server-side rendering and static site generation).
- Tailwind CSS (utility-first CSS framework for styling).
- shadcn/ui: A collection of reusable, accessible, and customizable UI components built with Radix UI and Tailwind CSS.

**Package Manager**:

- **Bun**: A fast all-in-one JavaScript runtime and package manager (used for dependency management and running scripts).

---

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Bun: Install Bun by following the official guide: [Bun installation](https://bun.sh/docs/installation)

### Installation

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/hngprojects/shopdesk-fe.git
    ```

2.  **Navigate to the project directory**

        cd SHOPDESK-FE

3.  **Install dependencies**

        bun install

4.  **Run the development server**

        bun run dev

5.  **Access the application**

    Click the http://localhost:{port} link provided to open the project.

---

## Contribution Guidelines

Before you start contributing on this project remember to:

- Ensure that all UI components and pages are implemented to match the Figma design as closely as possible, striving for pixel-perfect accuracy.
- Pay attention to details such as spacing, typography, colors, and component alignment

## Follow these steps to start contributing to the Shopdesk project.

### Step 1: Fork the Repository

1. Go to the original repository: [Github repository link](https://github.com/hngprojects/shopdesk-fe)

2. Click the **Fork** button at the top right of the page.

3. GitHub will prompt you to create a fork. By default, the repository will have the same name (shopdesk-fe).

4. Click Create Fork.

### Step 2: Clone Your Forked Repository

Clone your forked repository to your local machine:

```bash
git clone https://github.com/your-username/shopdesk-fe.git
```

### Step 3: Create a Feature Branch

Create a new branch for your feature or bugfix. Use the following naming convention:

```bash
git checkout -b feat/HNG-2145-your-feature-name
```

Replace your-feature-name with a short description of your feature.

### Branch Naming Convention

---

Use semantic prefixes and hyphen-separated names.
For example:

```bash
git checkout -b feat/HNG-2145-add-user-login-functionality

git checkout -b fix/HNG-2145-resolve-issue-with-stock-deletion

git checkout -b chore/HNG-2145-update-dependencies

git checkout -b docs/HNG-2145-update-README.md
```

### Step 4: Commit changes

When you're done making changes, add them to the branch.

```bash
git add .
```

**Follow this Conventional Commits standard to commit your changes**

**type**: description

Examples:

```bash
git commit -m feat:HNG-2145-add-user-login-functionality

git commit -m fix:HNG-2145-resolve-issue-with-stock-deletion

git commit -m chore:HNG-2145-update-dependencies

git commit -m docs:HNG-2145-update-README.md
```

**Final checklist**

Branch names and Commit messages use prefixes like:

✅ feat/ - (New feature)

✅ fix/ - (Bug fix)

✅ chore/ - (Maintenance task)

✅ docs/ - (Documentation changes)

### Step 5 : Push changes

Push your branch to your forked repository:

```bash
git push origin feat/HNG-2145-your-feature-name
```

### Step 6 : Create a Pull Request

1. Go to your forked repository on GitHub.

2. Click **Compare & Pull Request** for your newly pushed branch.

3. Add a title and description for your PR. A good pr should have:

- **Title** - The default PR message is the commit message which describes the changes. You can edit it as needed.
- **PR Description** - A good PR description should clearly explain what you did, why you did it, and how you tested it. Here’s an example:

```markdown
#### Follow this template:

## What?

I've added support for user authentication to implement the login feature as per the Figma design. This includes the login page, authentication logic, and API integration.

## Why?

These changes complete the user login experience, allowing users to securely log in and manage their stock. For more background, see ticket #HNG-2145.

## How?

This includes a new login page built with Next.js and Tailwind CSS, along with API integration for authentication. I used shadcn/ui for reusable components like buttons and forms.

## Testing?

I've tested the login functionality with valid and invalid credentials. I also verified that the UI matches the Figma design.

## Screenshots (optional)

Screenshot/s of the login page.
```

---

## Syncing Your Fork with the HNG Repository

To keep your forked repository up-to-date with the main HNG repository, follow these steps:

### Step 1: Add the HNG Repository as Upstream

1. Add the HNG Repository as an Upstream

```bash
git remote add upstream https://github.com/hngprojects/shopdesk-fe.git

```

2. Verify the remote was added

```bash
git remote -v
```

### Step 2: Fetch and Merge Changes

3. Fetch and Merge Changes
   Fetch the latest changes from the HNG repository:

```bash
git fetch upstream
```

4. Switch to your main branch:

```bash
git checkout main
```

5. Merge the changes from the HNG repository:

```bash
git merge upstream/main
```

6. Push the updated main branch to your forked repository:

```bash
git push origin main
```

### Step 3: Update Your Feature Branch

7. Since we are working on a feature branch, rebase it with the updated main branch:

```bash
git checkout feat/HNG-2145-your-feature-name
```

```bash
git rebase main
```

---
