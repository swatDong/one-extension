import * as vscode from "vscode";

export class OneTaskProvider implements vscode.TaskProvider {
    public static readonly type: string = "one";

    public async provideTasks(token?: vscode.CancellationToken | undefined): Promise<vscode.Task[]> {
      const tasks: vscode.Task[] = [];
      return tasks;
    }
  
    public async resolveTask(_task: vscode.Task, _token?: vscode.CancellationToken | undefined): Promise<vscode.Task | undefined> {
      const newTask = new vscode.Task(
        _task.definition,
        _task.scope ?? vscode.TaskScope.Workspace,
        _task.name,
        OneTaskProvider.type,
        new vscode.ShellExecution("npx tsc --watch --alwaysStrict"),
      );
      newTask.isBackground = _task.isBackground;
      newTask.problemMatchers = _task.problemMatchers;
      return newTask;
    }
}