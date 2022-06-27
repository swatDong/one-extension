import * as vscode from 'vscode';
import { OneTaskProvider } from './taskProvider';
import { onDidStartTask } from './taskHandler';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('one-extension.helloWorld', async () => {
		console.log("Hello World");
	});

	context.subscriptions.push(disposable);

	let tryCmd = vscode.commands.registerCommand("one-extension.precheck", async (args: any) => {
		const allArgs = args ? args.join(", ") : "NO ARGS";
		console.log(allArgs);
		return "0";
	});

	context.subscriptions.push(tryCmd);

	const taskProvider: OneTaskProvider = new OneTaskProvider();
	context.subscriptions.push(
	  vscode.tasks.registerTaskProvider(OneTaskProvider.type, taskProvider)
	);

	context.subscriptions.push(vscode.tasks.onDidStartTask(onDidStartTask));

	console.log('Congratulations, your extension "one-extension" is now active!');
}

export function deactivate() {}