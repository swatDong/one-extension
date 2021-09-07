import * as vscode from "vscode";

export class OneTaskProvider implements vscode.TaskProvider {
    public static readonly type: string = "one";

    public async provideTasks(token?: vscode.CancellationToken | undefined): Promise<vscode.Task[]> {
      const tasks: vscode.Task[] = [];
      if (vscode.workspace.workspaceFolders) {
        const workspaceFolder: vscode.WorkspaceFolder = vscode.workspace.workspaceFolders[0];
        const workspacePath: string = workspaceFolder.uri.fsPath;

        const startTask = new vscode.Task(
            {
                type: OneTaskProvider.type,
                command: "start",
            },
            workspaceFolder,
            "start",
            OneTaskProvider.type,
            new vscode.ShellExecution(
                "npm run start",
                {
                    cwd: workspacePath,
                    env: {
                        "REACT_APP_HINT": "Extension Start"
                    }
                }
            ),
            "$one-start-watch"
        );
        startTask.isBackground = true;
        tasks.push(startTask);
      }
      return tasks;
    }
  
    public async resolveTask(
      task: vscode.Task,
      token?: vscode.CancellationToken | undefined
    ): Promise<vscode.Task | undefined> {
      // Return undefined since all tasks are provided and fully resolved
      return undefined;
    }
}