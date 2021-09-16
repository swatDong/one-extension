import * as vscode from "vscode";

interface IRunningTask {
    source: string;
    name: string;
    scope?: vscode.WorkspaceFolder | vscode.TaskScope;
}

const allRunningTasks: Map<IRunningTask, number> = new Map<
    IRunningTask,
    number
>();

const oneOutput = vscode.window.createOutputChannel("One");

function needTracking(task: vscode.Task): boolean {
    return true;
}

export function onDidStartTask(event: vscode.TaskStartEvent): void {
    const task = event.execution.task;
    if (needTracking(task)) {
        allRunningTasks.set(
            { source: task.source, name: task.name, scope: task.scope },
            0
        );
        oneOutput.appendLine(`Task ${task.name} started.`);
    }
}