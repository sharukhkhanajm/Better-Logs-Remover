import * as vscode from "vscode";
export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "better-logs-remover" is now active!'
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("remove-logs.js", () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const range = new vscode.Range(0, 0, editor.document.lineCount, 0);
        const newTextLines = editor.document
          .getText()
          // .replace(/console\.log\(.*?\);{0,}/gs, "");
          //.replace(/console\.log\((\W?).*?\1,?\);/gs, "");
          .replace(/(console.+\);{0,1})/gim, "");
        editor.edit((editBuilder) => {
          return editBuilder.replace(range, newTextLines);
        });
        editor.document.save();
        vscode.window.showInformationMessage("Console logs removed!");
      } else {
        vscode.window.showInformationMessage("No! Document");
        return;
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("remove-logs.php", () => {
      console.log("php");
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const range = new vscode.Range(0, 0, editor.document.lineCount, 0);
        const newTextLines = editor.document
          .getText()
          .replace(
            /echo\s*(\W?.*)?;|print\s*\((\W?.*)\)?;|print_r\s*\((\W?.*)\)?;/gm,
            ""
          );
        editor.edit((editBuilder) => {
          return editBuilder.replace(range, newTextLines);
        });
        editor.document.save();
        vscode.window.showInformationMessage("Php logs removed!");
      } else {
        vscode.window.showInformationMessage("No! Document");
        return;
      }
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
