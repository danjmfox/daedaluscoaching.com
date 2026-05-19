# Slice 05 — Homepage Hero Maze

## Feature: seed-maze-generator | Effort: ~3h

## Goal

A larger, responsive maze in the homepage hero section using the same seed as the logo.
Staggered animation (starts 0.3s after logo).

## IN Scope

- `MazeHero.vue`: same core calls as MazeLogo, responsive SVG (`viewBox` + `width="100%"`)
- Wire into `pages/index.vue` hero section
- 0.3s animation stagger relative to logo
- Decision on hero size: confirm with owner after first render

## OUT Scope

- Any page other than index.vue
- Copy/headline integration (hero layout is out of scope — just the maze element)

## Learning Hypothesis

Disproves: "a larger responsive SVG maze will break the wing overlay proportions"
Confirms if it succeeds: the wing paths scale correctly with the SVG viewBox

## Acceptance Criteria

- Hero maze renders same maze as logo on same page load (same seed, same graph)
- SVG fills container width, maintains 1:1 aspect ratio
- Animation stagger: hero thread begins 0.3s after logo thread
- Removing `MazeHero` from `index.vue` has no effect on any other page or the logo
- Mobile: hero maze legible at 375px viewport width

## Dependencies

Slice 04 (MazeLogo pattern to follow; shared composable)

## Estimate

~3h
