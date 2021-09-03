import * as vscode from 'vscode';
import TreeDataProviderInstance from './treeView';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('one-extension.helloWorld', async () => {
		TreeDataProviderInstance.addOne();
	});

	context.subscriptions.push(disposable);
	vscode.window.registerTreeDataProvider('exampleView', TreeDataProviderInstance);

	console.log('Congratulations, your extension "one-extension" is now active!');
}

export function deactivate() {}

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}