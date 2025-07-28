---
title: Block Library
---

# 🧱 Block Library

This is a list of available content blocks in the Streamer.live Page Builder (Fabricator).

## 📝 Blog Blocks

### 🧾 `blog-post`

**Label**: _Blog: Post_  
Displays the main blog post content. Pulls from the current post context.

---

### 🧾 `blog-comments`

**Label**: _Blog: Comments_  
Displays approved comments on a blog post and reflects if comments are locked.

---

### 🧾 `blog-author-bio`

**Label**: _Blog: Author Bio_  
Displays information about the blog post’s author.

---

### 🧾 `blog-featured-posts`

**Label**: _Blog: Featured Posts_  
Displays the 3 most recent published posts tagged `featured`.

---

### 🧾 `blog-post-list`

**Label**: _Blog: Post List_  
Displays a paginated list of published blog posts.

---

## 🧑 Bio & Profile Blocks

### 🧾 `bio-block`

**Label**: _About Bio_  
Displays a streamer’s bio section with optional portrait and Twitch stats.

- Fields:
    - `portrait_image`: Image upload
    - `bio`: Rich text content
    - `read_more_url`: Optional external link
- Auto fetches:
    - Followers, subscribers, total views, etc. from Twitch API

---

## 🧱 Layout & Content Blocks

### 🧾 `columns-block`

**Label**: _Columns Block_  
Displays content in multiple side-by-side columns.

---

### 🧾 `hero-block`

**Label**: _Hero Block_  
Large banner section with headings, text, and optional call to action.

---

### 🧾 `html-block`

**Label**: _Raw HTML Block_  
Write custom HTML directly into the page.

---

### 🧾 `markdown-block`

**Label**: _Markdown Block_  
Displays formatted content using Markdown syntax.

---

## 💬 Community & Social Blocks

### 🧾 `discord-community-block`

**Label**: _Discord Community Block_  
Embeds a link or widget to your Discord community.

---

### 🧾 `next-stream-countdown-block`

**Label**: _Next Stream Countdown_  
Countdown timer for the next scheduled stream.

---

### 🧾 `promotion-banners`

**Label**: _Promotion Banners_  
Renders custom banners for promotions or announcements.

---

### 🧾 `schedule-calendar-block`

**Label**: _Schedule Calendar_  
Shows a weekly schedule of streams.

---

### 🧾 `upcoming-schedule-block`

**Label**: _Upcoming Schedule Block_  
Lists upcoming stream events in a vertical list.

---

## 🛍️ Store Blocks

### 🧾 `store-catalog`

**Label**: _Store Catalog_  
Renders the full catalog of synced products with filtering and pagination.

---

### 🧾 `store-product-grid`

**Label**: _Store Product Grid_  
Grid layout with optional filters, sorting, and tags.

---

### 🧾 `store-featured-products`

**Label**: _Store Featured Products_  
Highlights select featured products.

---

### 🧾 `store-new-releases`

**Label**: _Store New Releases_  
Displays newly added or launched products.

---

### 🧾 `store-product-detail`

**Label**: _Store Product Detail_  
Dynamic product detail page based on slug. Shows images, reviews, and variant options.

---

### 🧾 `store-related-products`

**Label**: _Store Related Products_  
Lists products that share tags or categories with the current product.

---

### 🧾 `store-category-list`

**Label**: _Store Category List_  
Renders product categories in a navigable list or menu.

---

## 🟣 Twitch Blocks

### 🧾 `twitch-embed`

**Label**: _Twitch Embed_  
Embeds your Twitch stream and/or chat.

---

### 🧾 `twitch-stream-status`

**Label**: _Twitch Stream Status_  
Displays current stream status (live or offline) with title/category.
