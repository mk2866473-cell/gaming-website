/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const STORAGE_KEY = 'gth_pinned_tools';

export function getPinnedToolSlugs(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return ['minecraft-circle-generator', 'palworld-breeding-calculator', 'universal-mouse-sensitivity-converter'];
    return JSON.parse(raw);
  } catch (e) {
    return ['minecraft-circle-generator', 'palworld-breeding-calculator'];
  }
}

export function togglePinTool(slug: string): boolean {
  try {
    const current = getPinnedToolSlugs();
    let updated: string[];
    const isPinned = current.includes(slug);
    if (isPinned) {
      updated = current.filter(s => s !== slug);
    } else {
      updated = [...current, slug];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('gth_favorites_updated'));
    return !isPinned;
  } catch (e) {
    return false;
  }
}
