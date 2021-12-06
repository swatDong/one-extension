import * as vscode from "vscode";

export class WebviewPanel {
    public static currentPanel: WebviewPanel | undefined;
    public static readonly viewType = "One";

    private readonly _panel: vscode.WebviewPanel;
    private readonly _extensionUri: vscode.Uri;
    private _disposables: vscode.Disposable[] = [];

    public static createOrShow(extensionUri: vscode.Uri) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        // If we already have a panel, show it.
        if (WebviewPanel.currentPanel) {
            WebviewPanel.currentPanel._panel.reveal(column);
            return;
        }

        // Otherwise, create a new panel.
        const panel = vscode.window.createWebviewPanel(
            WebviewPanel.viewType,
            'One Extension',
            column || vscode.ViewColumn.One,
            {
                // Enable javascript in the webview
                enableScripts: true,
                retainContextWhenHidden: true,
                localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'out', 'view')]
            }
        );

        WebviewPanel.currentPanel = new WebviewPanel(panel, extensionUri);
    }

    private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
        this._panel = panel;
        this._extensionUri = extensionUri;

        // Listen for when the panel is disposed
        // This happens when the user closes the panel or when the panel is closed programmatically
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

        // Handle messages from the webview
        this._panel.webview.onDidReceiveMessage(
            message => {
                switch (message.command) {
                    case 'alert':
                        vscode.window.showErrorMessage(message.text);
                        return;
                }
            },
            null,
            this._disposables
        );

        // Set the webview's initial html content
        this._panel.webview.html = this.getHtmlForWebview();
    }

    public dispose() {
        WebviewPanel.currentPanel = undefined;

        // Clean up our resources
        this._panel.dispose();

        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }

    private getHtmlForWebview() {
        const scriptBasePathOnDisk = vscode.Uri.joinPath(this._extensionUri, "out", "view");
        const scriptBaseUri = scriptBasePathOnDisk.with({ scheme: "vscode-resource" });

        const scriptPathOnDisk = vscode.Uri.joinPath(this._extensionUri, "out", "view", "index.js");
        const scriptUri = scriptPathOnDisk.with({ scheme: "vscode-resource" });

        // Use a nonce to to only allow specific scripts to be run
        const nonce = this.getNonce();
        return `<!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>local-debug</title>
                <base href='${scriptBaseUri}' />
              </head>
              <body>
                <div id="root"></div>
                <script>
                  const vscode = acquireVsCodeApi();
                </script>
                <script nonce="${nonce}"  type="module" src="${scriptUri}"></script>
              </body>
            </html>`;
    }

    private getNonce() {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 32; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}