import * as vscode from 'vscode';
import { onDidStartTaskProcess, onDidEndTaskProcess } from './taskHandler';
import { OneTaskProvider } from './taskProvider';
import TreeDataProviderInstance from './treeView';

export function activate(context: vscode.ExtensionContext) {
	vscode.window.registerTreeDataProvider('environment', TreeDataProviderInstance);

	const taskProvider: OneTaskProvider = new OneTaskProvider();
	context.subscriptions.push(
	  vscode.tasks.registerTaskProvider(OneTaskProvider.type, taskProvider)
	);

	context.subscriptions.push(vscode.tasks.onDidStartTaskProcess(onDidStartTaskProcess));
	context.subscriptions.push(vscode.tasks.onDidEndTaskProcess(onDidEndTaskProcess));

	console.log('Congratulations, your extension "one-extension" is now active!');
}

export function deactivate() {}

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}