import * as vscode from 'vscode';

class TreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
    private static instance: TreeDataProvider;

    private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined | void> = new vscode.EventEmitter<vscode.TreeItem | undefined | void>();
    readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined | void> = this._onDidChangeTreeData.event;

    private parent: vscode.TreeItem = new vscode.TreeItem("Tree Item A (Parent)");
    private child: vscode.TreeItem = new vscode.TreeItem("Tree Item AA (Child)");

    private showChild: boolean = false;

    constructor() {
    }

    getTreeItem(element: vscode.TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren(element?: vscode.TreeItem | undefined): vscode.ProviderResult<vscode.TreeItem[]> {
        if (element === undefined) {
            // The root, always return parent
            return [this.parent];
        } else if (this.showChild) {
            // Not root, return child if showChild
            return [this.child];
        } else {
            // Not root and child is hidden
            return [];
        }
    }

    funcExpand() {
        this.parent.collapsibleState = vscode.TreeItemCollapsibleState.Expanded;
        this.showChild = true;
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