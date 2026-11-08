# Third-party notices

This candidate imports these dependencies. These notices do not license the ComePlayers-specific game source, which is separately licensed under MIT in LICENSE with the rights holder's approval.

- Next.js 16.3.6: MIT. See `third-party-licenses/next-16.3.6.txt`.
- React 19.2.4: MIT. See `third-party-licenses/react-19.2.4.txt`.
- React DOM 19.2.4: MIT. See `third-party-licenses/react-dom-19.2.4.txt`.
- React Icons 5.6.0: MIT for its wrapper code; individual icon sets retain their own licenses. See `third-party-licenses/react-icons-5.6.0.txt`.
- Font Awesome 6 icons, by Fonticons, Inc.: CC BY 4.0, as identified in the React Icons distribution. Source: https://fontawesome.com/. License: https://creativecommons.org/licenses/by/4.0/. These icons are rendered through React Icons' Font Awesome 6 components; no intentional changes to the icon artwork are made by this extraction.

Dependencies are installed from the lockfile rather than vendored here. Their included licenses and notices must be retained when distributing bundled builds. The temporary letter avatars and CP badge are newly created geometric SVG placeholders, not imported game artwork.


## Added game dependencies

The standalone procedural Strike engine uses three.js 0.185.1 (MIT). Its complete license is preserved in `third-party-licenses/three-0.185.1.txt`; see also `THIRD_PARTY_NOTICES_STRIKE.md`. React, React DOM, Next.js and react-icons notices above apply to the added Match, Strike and Arrow routes as well. Dependency licenses do not license ComePlayers game source or excluded historical artwork.

- Font Awesome 5 icons, by Fonticons, Inc.: CC BY 4.0 as identified in React Icons. Strike and Arrow import `react-icons/fa`. Source: https://fontawesome.com/. License: https://creativecommons.org/licenses/by/4.0/. No intentional changes to icon artwork.
