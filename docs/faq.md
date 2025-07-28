---
title: FAQ
---

# 🤔 Frequently Asked Questions

## Do I need Laravel knowledge?

Basic familiarity helps, but you can follow the docs step-by-step.

## Can I run this on shared hosting?

Not recommended, and may not even be possible until the installer and self-updater fully work. Use a VPS or
Laravel-friendly host.

## How do I reset admin access?

The best way is to create a new admin user, this will require command line access:

```bash
php artisan make:user
```

You can then add the `admin` or `super-admin` role to the new user either through the command line, or in the database
via the 'model_has_roles' table.
Then log in with the new user.