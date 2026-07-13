# Documentation Standards

**Project:** PokéDex Manager *(Working Title)*

**Document:** Documentation Standards

**Version:** 0.1.0

**Status:** Approved

**Last Updated:** 2026-07-12

---

## Revision History

| Version | Date | Description |
|----------|------------|-------------------------------------------|
| 0.1.0 | 2026-07-12 | Initial documentation standards |

---

## Purpose

This document defines the documentation standards used throughout the PokéDex Manager project.

Its purpose is to ensure consistency, readability, and maintainability across all project documentation.

---

## Language

- All technical documentation shall be written in English.
- Code comments should be written in English whenever possible.
- Commit messages may follow the project's Git convention.
- User interface language is independent from documentation language.

---

## Document Header

Every document shall begin with the following header:

```md
    # Document Title

    **Project:** PokéDex Manager *(Working Title)*

    **Document:** Document Name

    **Version:** X.Y.Z

    **Status:** Draft | Review | Approved | Deprecated

    **Last Updated:** YYYY-MM-DD

---

## Revision History

| Version | Date | Description |
|----------|------------|----------------|
| X.Y.Z | YYYY-MM-DD | Description |
```

---

## Versioning

Documentation follows Semantic Versioning.

## Major

Significant structural changes.

Example:

- New sections
- Major rewrites

Example:

```text
1.0.0
```

---

## Minor

New content added.

Example:

```text
0.2.0
```

---

## Patch

Minor corrections.

Example:

```text
0.1.1
```

---

## Document Status

| Status | Description |
|----------|-------------|
| Draft | Work in progress |
| Review | Ready for review |
| Approved | Official version |
| Deprecated | Replaced by another version |

---

## Date Format

All dates shall use the ISO 8601 format.

```text
YYYY-MM-DD
```

Example:

```text
2026-07-12
```

---

## Markdown Conventions

### Heading Hierarchy

The project documentation shall follow this heading hierarchy:

```md
    # Document Title

    ## Main Section

    ### Subsection

    #### Nested Section (only when necessary)
```
Rules:

- Each document shall contain only one level-1 heading (#).
- Main sections shall use level-2 headings (##).
- Subsections shall use level-3 headings (###).
- Level-4 headings (####) should be used only when necessary.
- Avoid using deeper heading levels.

---

### Lists

Use unordered lists whenever order is not required.

```md
- Item
- Item
- Item
```

Use ordered lists only when sequence matters.

---

### Tables

Use tables for structured information whenever appropriate.

Example:

| Name | Description |
|------|-------------|

---

### Code Blocks

Always specify the language.

Example:

````md
```ts
const app = express();
```

## Requirement Identifiers

Requirements shall use standardized identifiers.

| Type | Prefix | Example |
|------|--------|---------|
| Functional Requirement | FR | FR-001 |
| Non-Functional Requirement | NFR | NFR-001 |
| Business Rule | BR | BR-001 |
| Constraint | C | C-001 |

---

## File Naming

All documentation files shall use lowercase names.

Examples:

```text
vision.md
requirements.md
architecture.md
database.md
roadmap.md
api.md
contributing.md
documentation-standards.md
changelog.md
```

---

## Folder Structure

```text
docs/
│
├── documentation-standards.md
├── vision.md
├── requirements.md
├── architecture.md
├── database.md
├── roadmap.md
├── api.md
├── contributing.md
└── changelog.md
```

---

## General Guidelines

- Keep documentation concise and objective.
- Avoid duplicated information.
- Update the Revision History whenever the document changes.
- Keep documents synchronized with the project implementation.
- Use consistent terminology throughout the project.

---

## Approval

This document defines the official documentation standard for the PokéDex Manager project.