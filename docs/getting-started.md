---
title: Getting Started
---

# 🚀 Getting Started with Streamer.live

Welcome! Follow this guide to set up your self-hosted Streamer.live instance.

## Prerequisites

- PHP 8.3+
- Laravel 11
- MySQL
- Node.js (for front-end assets)
- Composer
- Redis (recommended)
- Git

## Installation

```bash
git clone https://github.com/crimsonstrife/streamer.live.git
cd streamer.live
composer install
npm install && npm run build
php artisan migrate
php artisan db:seed
php artisan serve
