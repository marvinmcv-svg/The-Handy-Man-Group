# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: homepage.spec.ts >> Homepage — public site >> Marvin chat widget opens and responds
- Location: tests/homepage.spec.ts:88:7

# Error details

```
Error: Channel closed
```

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('button').filter({ hasText: /send/i }).last()
    - locator resolved to <button tabindex="0" type="submit" class="inline-flex h-12 items-center justify-center gap-2 bg-[#D2151E] px-8 text-[15px] font-semibold text-white transition-colors hover:bg-[#B01118] disabled:cursor-not-allowed disabled:bg-[#CCCCCC]">Send my request</button>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words bg-[#F3F4F6] text-[#121117]">Hi! I'm Marvin, Joe's AI bot assistant 👋 I help v…</div> from <div role="dialog" aria-modal="true" aria-label="Marvin chat" class="fixed z-[61] inset-2 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[380px] sm:h-[560px] flex flex-col bg-white shadow-2xl shadow-black/40 border border-[#121117]/10">…</div> subtree intercepts pointer events
  - retrying click action
    - waiting for element to be visible, enabled and stable
    - element is not stable
  - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not stable
    - retrying click action
      - waiting 100ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling

```

```
Error: apiRequestContext._wrapApiCall: Target page, context or browser has been closed
```