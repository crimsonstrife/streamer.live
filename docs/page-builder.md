---
title: Page Builder
---

# 🧩 Streamer.live Page Builder (Fabricator)

Streamer.live uses a visual page builder powered by [Filament Fabricator](https://filamentphp.com/plugins/fabricator) to
let you create rich, customizable pages without writing HTML.

## 🏗️ How It Works

- Pages are created in the Admin Panel under **CMS → Pages**
- Each page can use a layout (e.g., `Default`, `Store`, `Product Detail`)
- Layouts define how content is structured (e.g., sidebar, header, footer)
- Pages are built by adding **Blocks** in a visual drag-and-drop editor

## ✏️ Creating a Page

1. Go to **Admin → Pages**
2. Click **Create Page**
3. Choose a layout (e.g., `store`, `product_detail`)
4. Add content blocks (see [Block Library](./block-library) for details)
5. Set the slug (URL path)
6. Save and publish

## 📚 Supported Layout Types

- `default` – Basic layout for static content
- `store` – Storefront page with catalog filtering
- `product_detail` – Dynamic product pages
- `collection_detail` – Product collection landing pages
- `blog` – Blog index for listing posts
- `post_detail` – Individual blog post layout

> Some layouts (like `product_detail`, and `post_detail`) are **dynamic** and don’t require manually creating pages for
> each product.
