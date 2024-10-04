document.addEventListener('DOMContentLoaded', () => {
    const accentColorPicker = document.getElementById('accentColor');
    const darkModeToggle = document.getElementById('darkMode');
    const cssOutput = document.getElementById('cssOutput');
    const jsOutput = document.getElementById('jsOutput');
    const copyCssButton = document.getElementById('copyCss');
    const copyJsButton = document.getElementById('copyJs');
    const openCssButton = document.getElementById('openCss');
    const colorNameInput = document.getElementById('colorName');
    const htmlOutput = document.getElementById('htmlOutput');

    let originalCss = '';

    function updateTheme() {
        const accentColor = accentColorPicker.value;
        const isDarkMode = darkModeToggle.checked;
        const colorName = colorNameInput.value;

        document.body.style.setProperty('--accent-color', accentColor);
        document.body.classList.toggle('dark-mode', isDarkMode);

        updateCodeOutput(accentColor, isDarkMode, colorName);
    }

    function updateCodeOutput(accentColor, isDarkMode, colorName) {
        const css = generateCSS(accentColor, isDarkMode, colorName);
        const js = generateJS(accentColor, isDarkMode);
        const html = generateHTML(accentColor, colorName);

        cssOutput.textContent = css;
        jsOutput.textContent = js;
        htmlOutput.textContent = html;
    }

    function generateCSS(accentColor, isDarkMode, colorName) {
        const newCssSection = `
/* ${colorName} theme */
body.theme-${colorName.toLowerCase()} {
    --accent-color: ${accentColor};
    --accent-hover-light: ${adjustColor(accentColor, 20)};
    --accent-hover-dark: ${adjustColor(accentColor, -20)};
    --text-on-accent: ${getContrastColor(accentColor)};
}
`;

        return originalCss + newCssSection;
    }

    function generateJS(accentColor, isDarkMode) {
        return `function applyTheme(accentColor, isDarkMode) {
    document.documentElement.style.setProperty('--accent-color', accentColor);
    document.body.classList.toggle('dark-mode', isDarkMode);

    // Set HSL values for the accent color
    const accentHSL = hexToHSL(accentColor);
    document.body.style.setProperty('--accent-h', accentHSL.h);
    document.body.style.setProperty('--accent-s', \`\${accentHSL.s}%\`);
    document.body.style.setProperty('--accent-l', \`\${accentHSL.l}%\`);
}

function hexToHSL(hex) {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
        r = parseInt(hex.slice(1, 3), 16);
        g = parseInt(hex.slice(3, 5), 16);
        b = parseInt(hex.slice(5, 7), 16);
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

// Apply the theme
applyTheme('${accentColor}', ${isDarkMode});
`;
    }

    function generateHTML(accentColor, colorName) {
        return `<option value="${accentColor}">${colorName}</option>`;
    }

    function adjustColor(hex, percent) {
        const num = parseInt(hex.slice(1), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return `#${(1 << 24 | (R < 255 ? R < 1 ? 0 : R : 255) << 16 | (G < 255 ? G < 1 ? 0 : G : 255) << 8 | (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)}`;
    }

    function getContrastColor(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? '#000000' : '#ffffff';
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert('Copied to clipboard!');
        }, (err) => {
            console.error('Could not copy text: ', err);
        });
    }

    openCssButton.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.css';
        input.onchange = (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                originalCss = e.target.result;
                updateTheme();
            };
            reader.readAsText(file);
        };
        input.click();
    });

    function saveCss(css, colorName) {
        const blob = new Blob([css], { type: 'text/css' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `theme_with_${colorName.toLowerCase()}.css`;
        a.click();
        URL.revokeObjectURL(url);
    }

    accentColorPicker.addEventListener('input', updateTheme);
    darkModeToggle.addEventListener('change', updateTheme);
    colorNameInput.addEventListener('input', updateTheme);
    copyCssButton.addEventListener('click', () => {
        copyToClipboard(cssOutput.textContent);
        saveCss(cssOutput.textContent, colorNameInput.value);
    });
    copyJsButton.addEventListener('click', () => copyToClipboard(jsOutput.textContent));

    // Initial update
    updateTheme();
});