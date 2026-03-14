# Code Review: Portfolio Site

**Date:** March 14, 2026  
**Reviewer:** OpenCode AI  
**Project:** iOS & Flutter Developer Portfolio

---

## Overall Assessment

A well-structured Next.js portfolio with good use of animations (framer-motion), clean component architecture, and a handy AI chat widget. The code is generally maintainable with some areas for improvement.

---

## Strengths

1. **Clean Component Architecture** - Components are small, focused, and follow single responsibility principle
2. **Type Safety** - Good use of TypeScript interfaces and proper typing throughout
3. **Consistent Styling** - Tailwind CSS used consistently with design tokens in `tailwind.config.ts`
4. **Smooth Animations** - Framer-motion provides polished UX with hover/tap effects
5. **Centralized Data** - Profile data in `data/profile.ts` makes content easy to update
6. **Responsive Design** - Mobile-first approach with proper breakpoints

---

## Issues & Recommendations

### High Priority

1. **`Hero.tsx:34-39` - Hardcoded image path**  
   Using `<img src="/profile.png">` without Next.js Image optimization. Should use `next/image` for better performance:
   ```tsx
   import Image from "next/image";
   // ...
   <Image src="/profile.png" alt={profile.name} width={260} height={420} />
   ```

2. **`Projects.tsx:9` - Only showing first project**  
   The component hardcodes `profile.projects[0]`, displaying only one project:
   ```tsx
   const project = profile.projects[0]; // Should map over all projects
   ```

3. **`AIChatWidget.tsx:45` - Stale closure issue**  
   The `messages` state used in `sendMessage` may be stale due to closure:
   ```tsx
   // Line 45 uses `messages` but should use the updated reference
   body: JSON.stringify({ messages: [...messages, userMessage] })
   ```
   Should use functional update or ref to ensure latest messages are sent.

4. **Missing image optimization config in `next.config.mjs`**  
   Add `images` config to allow external domains if needed.

### Medium Priority

5. **`Hero.tsx:12-15` - Using `document.getElementById`**  
   Direct DOM manipulation instead of Next.js navigation or ref-based approach. Consider using `next/navigation` or React refs.

6. **`ExperienceTimeline.tsx:16` - Weak key**  
   Using `exp.company` as key could cause issues with duplicate company names. Consider adding a unique ID to experience objects.

7. **`AIChatWidget.tsx:16` - Ref type**  
   `useRef<HTMLDivElement | null>(null)` - the `null` default is unnecessary for refs.

8. **`Footer.tsx:4` - Hardcoded year and name**  
   Should derive from profile data or use dynamic year (`new Date().getFullYear()`).

9. **`Contact.tsx:41` - Component name typo**  
   `MobileDropPhone` should probably be `MobileDropDown` or similar.

### Low Priority

10. **Missing error boundaries** - No error handling wrapper for component failures
11. **No loading states on initial page load** - Consider skeleton loaders
12. **Accessibility improvements needed**:
    - Missing `aria-label` on some icon buttons
    - Keyboard navigation not fully tested for modal
    - `ResumeModal` should trap focus when open
13. **`ParticlesBackground.tsx:5-8` - Recreates particles on every render**  
    `Array.from({ length: PARTICLE_COUNT })` runs on each render. Should use `useMemo`.

---

## Security

- No security issues detected
- API route properly handles JSON parsing
- External links have `rel="noreferrer"`

---

## Performance

- Consider adding `loading="lazy"` to below-fold images
- The particles animation could impact low-end devices (consider `prefers-reduced-motion`)
- AI chat widget fetches on each message - consider caching

---

## Summary

| Category | Rating |
|----------|--------|
| Code Quality | Good |
| Maintainability | Good |
| Performance | Acceptable |
| Accessibility | Needs Work |
| Security | Good |

Overall a solid portfolio implementation. The main concerns are the single-project display bug, the stale closure in the chat widget, and missing image optimization. Addressing these would significantly improve the site.
