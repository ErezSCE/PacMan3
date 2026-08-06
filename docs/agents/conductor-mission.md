# Requirements Traceability Matrix

**Agent**: conductor  
**Generated**: 2026-08-06T14:15:18.652Z

---

## Requirements Traceability Summary

| Metric | Value |
|--------|-------|
| Total acceptance criteria | 28 |
| Verified (merged + test passed) | 0 |
| Implemented but untested | 4 |
| Planned only (no merged PR) | 0 |
| Missing (no assignment) | 24 |
| Coverage | 0.0% |

## Traceability Matrix

| Epic | Story | AC# | Acceptance Criterion | Status | PRs | Tests |
|------|-------|-----|----------------------|--------|-----|-------|
| E1 | US-001 | 0 | The GameEngine runs at a fixed timestep achieving ~60 frames per second on desktop and mobile browsers. | missing | -- | -- |
| E1 | US-001 | 1 | Pressing the pause key or button freezes all game entities and displays a pause overlay, and unpausing resumes the loop from the same state. | missing | -- | -- |
| E2 | US-002 | 0 | All static maze elements are drawn on the canvas with correct positions and colors. | missing | -- | -- |
| E2 | US-002 | 1 | Dots disappear when Pac‑Man passes over them and power pellets change to a 'eaten' state. | missing | -- | -- |
| E3 | US-003 | 0 | Directional input from any supported source moves Pac‑Man in the intended direction and respects walls. | missing | -- | -- |
| E3 | US-003 | 1 | All control elements show a focus outline when navigated via keyboard and have appropriate ARIA labels. | missing | -- | -- |
| E4 | US-004 | 0 | Each ghost follows its designated AI pattern during chase mode. | missing | -- | -- |
| E4 | US-004 | 1 | When Pac‑Man eats a power pellet, all ghosts enter frightened mode, reverse direction, slow down, and flash before reverting. | missing | -- | -- |
| E5 | US-005 | 0 | Score increments correctly for dots, pellets, ghosts, and fruit according to the table. | missing | -- | -- |
| E5 | US-005 | 1 | An extra life is awarded automatically when the score reaches 10 000 points and is reflected in the HUD. | missing | -- | -- |
| E6 | US-006 | 0 | When the last dot or pellet is eaten, a level‑complete overlay appears and the next level starts after a short delay. | missing | -- | -- |
| E6 | US-006 | 1 | From one level to the next, ghost speed increases, frightened time shortens, and scatter/chase ratios adjust as defined. | missing | -- | -- |
| E7 | US-007 | 0 | Background siren loops during normal play and changes pitch as the level progresses. | missing | -- | -- |
| E7 | US-007 | 1 | All sound effects (dot, pellet, ghost eat, death, fruit, extra life) play at the correct events, and the mute toggle silences every sound. | missing | -- | -- |
| E8 | US-008 | 0 | Start screen shows title, high‑score list and a focusable 'Start Game' button. | missing | -- | -- |
| E8 | US-008 | 1 | After game over, if the score qualifies for the top‑10, an initials entry field appears and can be submitted via keyboard. | missing | -- | -- |
| E9 | US-009 | 0 | Top‑10 high scores are stored in IndexedDB and displayed on the start screen after a page reload. | missing | -- | -- |
| E9 | US-009 | 1 | User preferences such as mute state and color‑blind mode are persisted and restored on game launch. | missing | -- | -- |
| E10 | US-010 | 0 | All interactive elements are reachable via Tab navigation and announce their purpose with ARIA labels. | missing | -- | -- |
| E10 | US-010 | 1 | Activating the color‑blind mode swaps ghost colors to the predefined palette and updates the UI accordingly. | missing | -- | -- |
| E11 | US-011 | 0 | Canvas and HUD scale fluidly from 375 px to 2560 px width while preserving aspect ratio. | missing | -- | -- |
| E11 | US-011 | 1 | On touch devices, on‑screen buttons respond to taps and the swipe detector moves Pac‑Man correctly. | missing | -- | -- |
| E12 | US-012 | 0 | Initial bundle size reported by Vite build is < 2 MB (gzip). | missing | -- | -- |
| E12 | US-012 | 1 | Audio assets are lazy‑loaded only when first needed, and frame time stays below 16 ms during normal play. | missing | -- | -- |
| E13 | US-013 | 0 | Service Worker caches all static assets and serves them from the Cache API when offline. | implemented-untested | #8 (merged) | -- |
| E13 | US-013 | 1 | When the network is unavailable, the fallback offline page loads and the game starts normally. | implemented-untested | #8 (merged) | -- |
| Integration | US-014 | 0 | Launching the app displays the start screen, allows navigation through all screens, and a full playthrough of level 1 is possible. | implemented-untested | #9 (merged) | -- |
| Integration | US-014 | 1 | All integrated features (rendering, input, audio, scoring, persistence, offline support) function together without runtime errors. | implemented-untested | #9 (merged) | -- |

## Orphaned Stories (no assignments -- silent scope loss)

- US-001
- US-002
- US-003
- US-004
- US-005
- US-006
- US-007
- US-008
- US-009
- US-010
- US-011
- US-012

## Orphaned Assignments (storyId matches no user story -- invented work)

- ASSIGN-001
- ASSIGN-002
- ASSIGN-003
- ASSIGN-004
- ASSIGN-005
- ASSIGN-006
- ASSIGN-007
- ASSIGN-008
- ASSIGN-009
- ASSIGN-010
- ASSIGN-011
- ASSIGN-012
- ASSIGN-013
- ASSIGN-014
- ASSIGN-015
- ASSIGN-016
- ASSIGN-017
- ASSIGN-018
- ASSIGN-019
- ASSIGN-020
- ASSIGN-021
- ASSIGN-022
- ASSIGN-023
- ASSIGN-024
- ASSIGN-025
- ASSIGN-026
- ASSIGN-027
- ASSIGN-028
- ASSIGN-029
- ASSIGN-030
- ASSIGN-031
- ASSIGN-032
- ASSIGN-033
- ASSIGN-034
- ASSIGN-035
- ASSIGN-036
- ASSIGN-037
- ASSIGN-038
- ASSIGN-039
- ASSIGN-040
- BUGFIX-1-ASSIGN-046
- BUGFIX-1-ASSIGN-047
- BUGFIX-1-ASSIGN-048
- BUGFIX-1-ASSIGN-049

