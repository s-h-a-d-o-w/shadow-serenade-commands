# s-h-a-d-o-w's Serenade Commands (Mostly designed for Linux and Windows)

To learn more about custom Serenade commands, check out the [Serenade Documentation](https://serenade.ai/docs#custom-commands).

## Requirements for specific features

- Agnostic JS package management: https://gist.github.com/s-h-a-d-o-w/d1be4eb4ecad3576af8fa69c248be615
- Browser extension reload: https://chrome.google.com/webstore/detail/extensions-reloader/fimgfedafeadlieiabdeeaodndnlbhid/related?hl=en
- VS Code bookmark extension

## How to install

1. Clone/download into your Serenade custom commands directory.
1. Run `yarn` in the root directory.

## Overview

This is not an exhaustive list but the highlights for me that I use every day (depending on the OS I use, obviously 🙂) are:

- A command to open the dictation box quickly - "dict". (Unfortunately, a command to stop dictating and close is currently not possible.)
- A ton of special key commands, so that you don't need to keep saying "press" before everything when wanting to trigger special keys.
- "reset window" to resize the current window to fit an area that doesn't overlap with Serenade. (Uses `wmctrl`/`xdotool` on Linux)
- An "emoji" command! 😊 (On Linux, this requires an open `xed` window.)
- "headphones"/"speakers" to switch the current audio output device. (Requires [`nircmdc`](https://www.nirsoft.net/utils/nircmd.html) to be globally available on Windows, uses `pactl`/`pacmd` on Linux.)
- "media <key>" commands. (Uses `xdotool` on Linux and Powershell on Windows.)
