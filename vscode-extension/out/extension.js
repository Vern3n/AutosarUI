"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const path = require("path");
function activate(context) {
    console.log('AutosarUI extension is active');
    let currentPanel = undefined;
    let disposable = vscode.commands.registerCommand('autosar-ui.open', () => {
        if (currentPanel) {
            currentPanel.reveal(vscode.ViewColumn.One);
        }
        else {
            currentPanel = vscode.window.createWebviewPanel('autosarUi', 'AutosarUI Editor', vscode.ViewColumn.One, {
                enableScripts: true,
                localResourceRoots: [
                    vscode.Uri.file(path.join(context.extensionPath, 'media'))
                ]
            });
            currentPanel.webview.html = getWebviewContent(currentPanel.webview, context.extensionPath);
            currentPanel.onDidDispose(() => {
                currentPanel = undefined;
            }, null, context.subscriptions);
        }
    });
    context.subscriptions.push(disposable);
}
function getWebviewContent(webview, extensionPath) {
    // The React build output is in 'media' folder (configured in vite.config.ts)
    const scriptPathOnDisk = vscode.Uri.file(path.join(extensionPath, 'media', 'index.js'));
    const stylePathOnDisk = vscode.Uri.file(path.join(extensionPath, 'media', 'index.css'));
    // In a real build, Vite might generate hashed filenames (e.g., assets/index.2342.js)
    // For simplicity efficiently, we assume the build will output known names or we scan the directory.
    // However, since we can't easily scan directory in 'getWebviewContent' without fs,
    // a common trick is to read the index.html produced by Vite and modify URIs.
    // For this MVP, we will assume the user has built the React app and we read generated index.html.
    // BUT, simple reading of index.html from disk:
    const fs = require('fs');
    const indexPath = path.join(extensionPath, 'media', 'index.html');
    let htmlContent = '';
    try {
        htmlContent = fs.readFileSync(indexPath, 'utf8');
    }
    catch (err) {
        return `<!DOCTYPE html><html><body><h1>Error loading React App</h1><p>Could not find ${indexPath}. Did you run 'npm run build'?</p></body></html>`;
    }
    // Rewrite relative paths in htmlContent to webview URIs
    // Base tag is './', so scripts like src="/assets/index.js" or src="./assets/index.js" need remapping
    // We can use a regex to replace src="..." and href="..."
    // This is a naive replacement but works for standard Vite builds with base='./'
    const mediaPath = vscode.Uri.file(path.join(extensionPath, 'media'));
    const mediaUri = webview.asWebviewUri(mediaPath);
    // Replace <script src="./assets/..." ...> with <script src="${mediaUri}/assets/..." ...>
    // Vite with base='./' produces: <script type="module" crossorigin src="./assets/index-D_...js"></script>
    htmlContent = htmlContent.replace(/(src|href)="(\.\/|\/)?([^"]*)"/g, (match, attr, prefix, p3) => {
        // Ignore absolute URLs (http, https)
        if (p3.startsWith('http'))
            return match;
        return `${attr}="${mediaUri}/${p3}"`;
    });
    return htmlContent;
}
function deactivate() { }
//# sourceMappingURL=extension.js.map