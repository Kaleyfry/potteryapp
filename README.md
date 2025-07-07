# Pottery Order Calculator App

## Project Summary

The Pottery Order Calculator App replaces a manual and error-prone process used in a community pottery studio to track firing fees. The previous system relied on handwritten labels and Excel sheets, creating inaccuracies, lack of accountability, and confusion around billing and item status.

This application introduces a streamlined digital workflow that automates order entry, calculates fees using submitted dimensions, and stores the data securely for tracking and invoicing.

---

## Problem Statement

### Previous State (Manual System)

- Manual data entry using paper labels and Excel spreadsheets
- No reliable way to link physical pottery pieces to digital records
- Manual calculations for each item based on dimensions
- No automated billing or confirmation sent to members
- Limited transparency for users and staff regarding charges

---

## Current App Features

| Area      | Feature                                                                             |
| --------- | ----------------------------------------------------------------------------------- |
| Frontend  | Built in React with modular components: PotteryForm and PotteryList                 |
| Backend   | Java Spring Boot API with RESTful endpoints to submit and retrieve data             |
| Database  | Snowflake integration via JDBC for persistent storage                               |
| Privacy   | Email addresses are masked before display                                           |
| Timezone  | Dates are formatted to NYC time                                                     |
| Reporting | Admins can query order totals by email in Snowflake to assist with manual invoicing |

---

## Value Delivered

**Replaces:**

- Manual measurement and pricing
- Spreadsheets for order logs
- Lack of transparency in billing

**Provides:**

- Automatic price calculation using length × width × height × 0.04
- Simplee UI for submitting and viewing orders
- Centralized database for accurate reporting
- Email field as unique identifier for monthly billing
- Improved accountability and ease of use for staff and members

---

## Future State Vision

| Feature                      | Description                                                           |
| ---------------------------- | --------------------------------------------------------------------- |
| Authentication               | Add login system with member/admin roles                              |
| Email Notifications          | Automatically send monthly invoices with breakdowns                   |
| Admin Dashboard              | Interface for analytics and monthly reporting                         |
| Configurable Pricing Formula | Make price-per-inch value adjustable by admin for larger sized pieces |
| Form Validation              | Improve user feedback with client and server-side validation          |

---

## Architecture Overview

```plaintext
React Frontend
  ├─ PotteryForm.js → POST /pottery
  ├─ PotteryList.js ← GET /pottery
       ↳ Email masking
       ↳ Date formatting (NYC timezone)
  ↓
Spring Boot API
  ├─ Receives JSON payload
  ├─ Stores order in Snowflake DB
  ├─ Calculates and returns order price
  ↓
Snowflake DB
  ├─ Stores order records
  ├─ Queryable by email/month
```
