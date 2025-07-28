// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
    // By default, Docusaurus generates a sidebar from the docs folder structure
    tutorialSidebar: [
        {
            type: 'doc',
            id: 'getting-started',
            label: 'Getting Started',
        },
        {
            type: 'doc',
            id: 'features',
            label: 'Features',
        },
        {
            type: 'category',
            label: 'Core Modules',
            collapsible: true,
            collapsed: false,
            items: [
                'filament-admin',
                'twitch-discord',
                'store-setup',
                'self-updater',
            ],
        },
        {
            type: 'doc',
            id: 'faq',
            label: 'FAQ',
        },
        {
            type: 'doc',
            id: 'changelog',
            label: 'Changelog',
        },
    ],
};

export default sidebars;
