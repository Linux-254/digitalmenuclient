# Motion Spec — Digital Menu Rail

## Source review

The supplied `motion-tutorial.mp4` is a 33-second vertical Canva workflow showing a product/menu poster built from a cream canvas, oversized organic circular shape, floating drink/food cut-outs, vertical editorial type, and a simple page/element animation workflow. The visual lesson is **layered editorial composition + directional movement**, not a literal copy of the tutorial's assets or lyrics.

Reference files:

- `../reference/motion-tutorial.mp4`
- `../reference/motion-tutorial-contact-sheet.jpg`
- `../reference/motion-tutorial-transcript.txt`
- `../reference/pasted-menu-reference.png`

## Implemented web motion

The guest menu uses a **touch-first menu rail** on screens under 680px:

1. Category tabs remain pinned and do not animate across the screen.
2. Menu cards become a horizontal `scroll-snap` rail.
3. Cards enter from the right by 18px with opacity; duration is 220ms with a strong ease-out curve.
4. Card delays are staggered by 35ms only for the first three cards.
5. The cart and payment controls never auto-advance or move while the guest is deciding.
6. `prefers-reduced-motion: reduce` removes translation and retains readable state changes.

The hero poster already uses low-frequency organic floating objects. That movement is decorative and stays behind the ordering path.

## Motion tokens

```css
--motion-menu-enter: 220ms cubic-bezier(.22,.8,.28,1);
--motion-feedback: 160ms ease-out;
--motion-hero: 7000ms ease-in-out alternate;
--motion-stagger: 35ms;
```

## Canva-to-web translation

Canva is optional for editorial asset preparation or a social/menu-poster export. Interactive web motion remains in code so it is accessible, responsive, interruptible, and tied to live menu state. Do not copy Canva template internals or Brand Kit data into the website. If a Canva design is made, use this AI direction:

> Create an editorial Kenyan restaurant menu poster: forest-green field, warm cream paper, muted lime accents, organic circular cut-outs, generous serif display type, clean sans-serif labels, one hero dish or drink, high contrast, no gradients, no glassmorphism, no generic stock layout, no fake prices, no decorative motion that blocks ordering.

## Review standard

- Animate only `transform` and `opacity`.
- Keep frequent UI motion below 300ms.
- Use ease-out for entry; never ease-in for interactive entry.
- Never use `scale(0)` or animate layout properties.
- Keep movement interruptible through native scrolling/transitions.
- Gate hover-only motion behind fine-pointer media queries.
- Test keyboard, touch, reduced motion, and slow devices.
- Delete motion that does not improve hierarchy, feedback, spatial continuity, or brand expression.
