import { darkTheme } from '@/shared/styles/themes/theme.dark.css';
import { lightTheme } from '@/shared/styles/themes/theme.light.css';

export function ThemeScript() {
  const script = `
    (function () {
      var root = document.documentElement;
      var light = "${lightTheme}";
      var dark = "${darkTheme}";
      var darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

      if (darkModeQuery.matches) {
        root.classList.remove(light);
        root.classList.add(dark);
      }

      darkModeQuery.addEventListener("change", function (event) {
        root.classList.remove(light, dark);
        root.classList.add(event.matches ? dark : light);
      });
    })();
  `;

  // biome-ignore lint/security/noDangerouslySetInnerHtml: We need to set the script so we prevent a flash of unstyled content.
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
