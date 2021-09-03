import * as vscode from 'vscode';

class TreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
    private static instance: TreeDataProvider;

    private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined | void> = new vscode.EventEmitter<vscode.TreeItem | undefined | void>();
    readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined | void> = this._onDidChangeTreeData.event;

    private hello: vscode.TreeItem;

    private counter: number;

    constructor() {
        this.hello = new vscode.TreeItem("Hello");
        this.hello.command = {
            title: "Hello World",
            command: "one-extension.helloWorld",
        }
        this.counter = 0;
    }

    getTreeItem(element: vscode.TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren(element?: vscode.TreeItem | undefined): vscode.ProviderResult<vscode.TreeItem[]> {
        return [this.hello];
    }

    addOne() {
        this.counter ++;
        this.hello.label = `Hello (${this.counter})`;
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