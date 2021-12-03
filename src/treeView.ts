import * as vscode from 'vscode';

class TreeDataProvider implements vscode.TreeDataProvider<string> {
    private static instance: TreeDataProvider;

    private _onDidChangeTreeData: vscode.EventEmitter<string | undefined | void> = new vscode.EventEmitter<string | undefined | void>();
    readonly onDidChangeTreeData: vscode.Event<string | undefined | void> = this._onDidChangeTreeData.event;

    private items: Map<string, vscode.TreeItem> = new Map<string, vscode.TreeItem>([
        [
            "1",
            {
                label: "local",
                iconPath: new vscode.ThemeIcon("symbol-folder"),
                collapsibleState: vscode.TreeItemCollapsibleState.Expanded,
                contextValue: "local-env"
            }
        ],
        [
            "1-1",
            {
                label: "Debug Prerequisites",
                iconPath: new vscode.ThemeIcon("checklist"),
                collapsibleState: vscode.TreeItemCollapsibleState.Expanded,
                tooltip: "Prerequisites required by local debug",
                contextValue: "local-pre-check"
            }
        ],
        [
            "1-1-1",
            {
                label: "Node.js",
                iconPath: new vscode.ThemeIcon("check"),
                collapsibleState: vscode.TreeItemCollapsibleState.None,
                contextValue: "check-node"
            }
        ],
        [
            "1-1-2",
            {
                label: ".NET",
                iconPath: new vscode.ThemeIcon("check"),
                collapsibleState: vscode.TreeItemCollapsibleState.None,
                contextValue: "check-dotnet"
            }
        ],
        [
            "1-1-3",
            {
                label: "Func Core Tools",
                iconPath: new vscode.ThemeIcon("check"),
                collapsibleState: vscode.TreeItemCollapsibleState.None,
                contextValue: "check-func"
            }
        ],
        [
            "1-1-4",
            {
                label: "M365 Account",
                iconPath: new vscode.ThemeIcon("check"),
                collapsibleState: vscode.TreeItemCollapsibleState.None,
                contextValue: "check-m365"
            }
        ],
        [
            "1-1-5",
            {
                label: "Localhost Certificate",
                iconPath: new vscode.ThemeIcon("info"),
                collapsibleState: vscode.TreeItemCollapsibleState.None,
                contextValue: "check-cert"
            }
        ],
        [
            "1-2",
            {
                label: "Local Services",
                iconPath: new vscode.ThemeIcon("list-flat"),
                collapsibleState: vscode.TreeItemCollapsibleState.Expanded,
                tooltip: "Local services launched by Teams Toolkit",
                contextValue: "services"
            }
        ],
        /*
        [
            "1-2-1",
            {
                label: "No local service is running.",
                iconPath: new vscode.ThemeIcon("info"),
                collapsibleState: vscode.TreeItemCollapsibleState.None,
                contextValue: "task-none"
            }
        ]
        */
        [
            "1-2-1",
            {
                label: "Frontend (Starting)",
                iconPath: new vscode.ThemeIcon("sync"),
                collapsibleState: vscode.TreeItemCollapsibleState.None,
                contextValue: "task-frontend"
            }
        ],
        [
            "1-2-2",
            {
                label: "Backend (Running)",
                iconPath: new vscode.ThemeIcon("pass"),
                collapsibleState: vscode.TreeItemCollapsibleState.None,
                contextValue: "task-backend"
            }
        ]
    ]);

    constructor() {
    }

    getTreeItem(element: string): vscode.TreeItem | Thenable<vscode.TreeItem> {
        if (this.items.has(element)) {
            return this.items.get(element)!;
        } else {
            throw new Error(`Element ${element} not found`);
        }
    }

    getChildren(element?: string | undefined): vscode.ProviderResult<string[]> {
        if (element === undefined) {
            return ["1"];
        } else {
            return Array.from(this.items.keys()).filter(item => item.startsWith(`${element}-`) && item.substring(element.length + 1).indexOf("-") < 0);
        }
    }

    public static getInstance() {
        if (!TreeDataProvider.instance) {
            TreeDataProvider.instance = new TreeDataProvider();
        }
        return TreeDataProvider.instance;
    }
}

export default TreeDataProvider.getInstance();