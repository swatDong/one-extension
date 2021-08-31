import * as vscode from 'vscode';

class TreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
    private static instance: TreeDataProvider;

    private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined | void> = new vscode.EventEmitter<vscode.TreeItem | undefined | void>();
    readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined | void> = this._onDidChangeTreeData.event;

    private itemA: vscode.TreeItem;
    private itemAA: vscode.TreeItem;

    private showAA: boolean;

    constructor() {
        this.itemA = new vscode.TreeItem("A (NoChild)", vscode.TreeItemCollapsibleState.None);
        this.itemAA = new vscode.TreeItem("AA (NoChild)", vscode.TreeItemCollapsibleState.None);

        this.showAA = false;
    }

    getTreeItem(element: vscode.TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren(element?: vscode.TreeItem | undefined): vscode.ProviderResult<vscode.TreeItem[]> {
        if (element === undefined) {
            // The root, always return A
            return [this.itemA];
        } else if (this.showAA) {
            // Not root, return AA if showAA
            return [this.itemAA];
        } else {
            // Not root and AA is hidden
            return [];
        }
    }

    funcRefreshA() {
        this.itemA.label = "A (show AA)";
        this.itemA.collapsibleState = vscode.TreeItemCollapsibleState.None;
        this._onDidChangeTreeData.fire();
    }

    funcExpandA() {
        this.itemA.collapsibleState = vscode.TreeItemCollapsibleState.Expanded;
        this.showAA = true;
        this._onDidChangeTreeData.fire();
    }

    public static getInstance() {
        if (!TreeDataProvider.instance) {
            TreeDataProvider.instance = new TreeDataProvider();
        }
        return TreeDataProvider.instance;
      }
}

export default TreeDataProvider.getInstance();