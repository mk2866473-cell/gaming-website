/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GameInfo {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  color: string;
  borderColor: string;
  accentColor: string;
  icon: string;
  badge?: string;
}

export interface CategoryInfo {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export interface ToolFAQ {
  question: string;
  answer: string;
}

export interface ToolStep {
  title: string;
  description: string;
}

export interface ToolItem {
  id: string;
  slug: string;
  name: string;
  gameId: string;
  categoryId: string;
  icon: string;
  shortDescription: string;
  description: string;
  badge?: string;
  rating: number;
  reviewsCount: number;
  userCount: string;
  featured?: boolean;
  tags: string[];
  
  // SEO & Editorial Content
  seoTitle: string;
  metaDescription: string;
  h1: string;
  canonicalPath: string;

  howToGuide: {
    overview: string;
    steps: ToolStep[];
  };

  formulaExplained: {
    title: string;
    details: string;
    mathSnippet?: string;
  };

  faqs: ToolFAQ[];
  proTips: string[];
  relatedToolIds: string[];
}
