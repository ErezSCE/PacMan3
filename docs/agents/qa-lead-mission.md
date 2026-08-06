# QA Lead — Test Plan

**Agent**: qa-lead  
**Generated**: 2026-08-06T14:12:58.788Z

---

## Test Plan

{
  "scope": "Test plan covers core functionality of the Pac-Man style game, mapping each acceptance criterion from component-level stories (STORY-001 to STORY-008) to unit, integration, or end-to-end tests.",
  "unit": [
    {
      "target": "src/modules/AssetLoader.ts::loadAssets",
      "description": "Ensures all required image, sprite sheet and audio files are fetched and stored in memory on game start.",
      "framework": "Jest",
      "storyId": "STORY-001",
      "acIndex": 0
    },
    {
      "target": "src/modules/AssetLoader.ts::handleLoadError",
      "description": "Falls back to placeholder assets when a fetch fails.",
      "framework": "Jest",
      "storyId": "STORY-001",
      "acIndex": 1
    },
    {
      "target": "src/modules/Renderer.ts::drawFrame",
      "description": "Verifies that maze walls, Pac‑Man, ghosts, dots and UI overlays are drawn each frame without errors.",
      "framework": "Jest",
      "storyId": "STORY-002",
      "acIndex": 0
    },
    {
      "target": "src/modules/Renderer.ts::measureFPS",
      "description": "Checks that the rendering loop maintains ≥60 fps under typical load.",
      "framework": "Jest",
      "storyId": "STORY-002",
      "acIndex": 1
    },
    {
      "target": "src/modules/AudioManager.ts::playBackgroundMusic",
      "description": "Starts background music on game start.",
      "framework": "Jest",
      "storyId": "STORY-003",
      "acIndex": 0
    },
    {
      "target": "src/modules/AudioManager.ts::toggleMute",
      "description": "Ensures mute flag silences all currently playing and future sounds.",
      "framework": "Jest",
      "storyId": "STORY-003",
      "acIndex": 1
    },
    {
      "target": "src/modules/InputHandler.ts::processKeyboardEvent",
      "description": "Maps Arrow keys and WASD to correct directional commands.",
      "framework": "Jest",
      "storyId": "STORY-004",
      "acIndex": 0
    },
    {
      "target": "src/modules/InputHandler.ts::processTouchSwipe",
      "description": "Translates swipe gestures into directional commands.",
      "framework": "Jest",
      "storyId": "STORY-004",
      "acIndex": 1
    },
    {
      "target": "src/modules/GameEngine.ts::detectCollision",
      "description": "Detects Pac‑Man colliding with a dot and marks it consumed.",
      "framework": "Jest",
      "storyId": "STORY-005",
      "acIndex": 0
    },
    {
      "target": "src/modules/GameEngine.ts::updateGhostAI",
      "description": "Changes ghost behavior after Pac‑Man eats a power pellet.",
      "framework": "Jest",
      "storyId": "STORY-005",
      "acIndex": 1
    },
    {
      "target": "src/modules/GameEngine.ts::updateScore",
      "description": "Updates score correctly for dot, power‑pellet and ghost captures.",
      "framework": "Jest",
      "storyId": "STORY-005",
      "acIndex": 2
    },
    {
      "target": "src/modules/GameEngine.ts::handleGameOver",
      "description": "Triggers high‑score persistence when lives reach zero.",
      "framework": "Jest",
      "storyId": "STORY-005",
      "acIndex": 3
    },
    {
      "target": "src/components/UI/HUD.tsx::render",
      "description": "Renders score, lives and level correctly in the HUD.",
      "framework": "Jest + React Testing Library",
      "storyId": "STORY-006",
      "acIndex": 0
    },
    {
      "target": "src/components/UI/PauseOverlay.tsx::render",
      "description": "Displays pause overlay when game state is paused.",
      "framework": "Jest + React Testing Library",
      "storyId": "STORY-006",
      "acIndex": 1
    },
    {
      "target": "src/components/UI/AccessibilityMenu.tsx::keyboardNavigation",
      "description": "All accessibility options are reachable via keyboard tabbing and have ARIA labels.",
      "framework": "Jest + React Testing Library",
      "storyId": "STORY-006",
      "acIndex": 2
    },
    {
      "target": "src/modules/StorageManager.ts::saveHighScore",
      "description": "Persists a high‑score record in IndexedDB.",
      "framework": "Jest",
      "storyId": "STORY-007",
      "acIndex": 0
    },
    {
      "target": "src/modules/StorageManager.ts::loadPreferences",
      "description": "Loads user preferences (mute, color‑blind) from IndexedDB on startup.",
      "framework": "Jest",
      "storyId": "STORY-007",
      "acIndex": 1
    },
    {
      "target": "src/serviceWorker.ts::install",
      "description": "Caches static assets during Service Worker install phase.",
      "framework": "Jest (with workbox testing utilities)",
      "storyId": "STORY-008",
      "acIndex": 0
    },
    {
      "target": "src/serviceWorker.ts::fetch",
      "description": "Serves cached assets when network is unavailable and returns offline fallback page.",
      "framework": "Jest (with workbox testing utilities)",
      "storyId": "STORY-008",
      "acIndex": 1
    }
  ],
  "integration": [
    {
      "target": "AssetLoader ↔ Renderer",
      "description": "After assets are loaded, Renderer can retrieve sprite frames without errors.",
      "framework": "Jest",
      "storyId": "STORY-001",
      "acIndex": 0
    },
    {
      "target": "InputHandler ↔ GameEngine",
      "description": "Directional commands from InputHandler correctly affect Pac‑Man movement in GameEngine.",
      "framework": "Jest",
      "storyId": "STORY-004",
      "acIndex": 0
    },
    {
      "target": "GameEngine ↔ StorageManager",
      "description": "On game over, GameEngine calls StorageManager.saveHighScore and the record is stored.",
      "framework": "Jest",
      "storyId": "STORY-005",
      "acIndex": 3
    },
    {
      "target": "AudioManager ↔ UI Mute Toggle",
      "description": "Toggling mute in UI updates AudioManager state and silences all sounds.",
      "framework": "Jest + React Testing Library",
      "storyId": "STORY-003",
      "acIndex": 1
    },
    {
      "target": "ServiceWorker ↔ Network",
      "description": "First request caches assets; subsequent offline request returns cached response.",
      "framework": "Jest (with mock Service Worker environment)",
      "storyId": "STORY-008",
      "acIndex": 1
    },
    {
      "target": "StorageManager ↔ IndexedDB",
      "description": "Saving and retrieving preferences works correctly using the idb library.",
      "framework": "Jest",
      "storyId": "STORY-007",
      "acIndex": 1
    },
    {
      "target": "Renderer ↔ PerformanceMonitor",
      "description": "Renderer reports frame times and maintains ≥60 fps under simulated load.",
      "framework": "Jest",
      "storyId": "STORY-002",
      "acIndex": 1
    }
  ],
  "e2e": [
    {
      "scenario": "Start game, eat all dots, complete level",
      "description": "User launches the game, controls Pac‑Man with keyboard, consumes every dot, and sees level‑complete transition.",
      "criticalPath": true,
      "storyId": "STORY-005",
      "acIndex": 0
    },
    {
      "scenario": "Pause and resume gameplay",
      "description": "User presses the pause button, sees pause overlay, then resumes and gameplay continues from same state.",
      "criticalPath": true,
      "storyId": "STORY-006",
      "acIndex": 1
    },
    {
      "scenario": "Toggle mute and verify no audio plays",
      "description": "User activates mute via UI; background music and sound effects stop, and remain silent after unpausing.",
      "criticalPath": true,
      "storyId": "STORY-003",
      "acIndex": 1
    },
    {
      "scenario": "Enable color‑blind mode and verify palette change",
      "description": "User selects color‑blind mode in accessibility menu; game UI switches to high‑contrast palette and remains after reload.",
      "criticalPath": true,
      "storyId": "STORY-006",
      "acIndex": 2
    },
    {
      "scenario": "Play offline after initial load",
      "description": "After the first successful load, network is disabled; user continues playing and all assets load from Service Worker cache.",
      "criticalPath": true,
      "storyId": "STORY-008",
      "acIndex": 1
    },
    {
      "scenario": "Save high score and view leaderboard",
      "description": "When game ends, high score is persisted; user opens leaderboard UI and sees the new entry.",
      "criticalPath": true,
      "storyId": "STORY-007",
      "acIndex": 0
    },
    {
      "scenario": "Keyboard navigation to start game (accessibility)",
      "description": "User tabs to the 'Start Game' button, activates it with Enter, and game begins without mouse interaction.",
      "criticalPath": true,
      "storyId": "STORY-006",
      "acIndex": 0
    },
    {
      "scenario": "Touch swipe controls on mobile",
      "description": "On a touch device, user swipes in four directions; Pac‑Man moves accordingly.",
      "criticalPath": true,
      "storyId": "STORY-004",
      "acIndex": 1
    }
  ],
  "coverageTargets": {
    "unit": 85,
    "integration": 70,
    "e2e": 100
  }
}
