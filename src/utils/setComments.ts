import { workspace } from "vscode";
import { CONFIG_TOKENS } from "../extension";
import { triggerCommentsHide } from "./triggerCommentsHide";


export const setComments = async (enabled: boolean) => {
  const config = workspace.getConfiguration("editor");
	const colors = config.get<any>(CONFIG_TOKENS);

  if (config && colors) {
    let textMateRules: any[] = colors["textMateRules"] || [];
    let commentRuleIdx = textMateRules.findIndex(r => r && r.scope && (r.scope as any[]).includes("comment.line.double-slash"));

    if (enabled) {
      colors["comments"] = "#00000000";

      if (commentRuleIdx >= 0) {
        textMateRules[commentRuleIdx].settings.foreground = "#00000000";
      } else {
        textMateRules.push({
          "scope": [
            "comment",
            "comment.block",
            "comment.line",
            "comment.line.double-slash",
            "variable.other.jsdoc",
            "storage.type.class.jsdoc",
            "punctuation.definition.block.tag.jsdoc",
            "punctuation.definition.bracket.curly.begin.jsdoc",
            "punctuation.definition.bracket.curly.end.jsdoc",
            "entity.name.type.instance.jsdoc",
            "comment.block.documentation.ts",
            "comment.block.documentation.js"
          ],
          "settings": {
            "foreground": "#00000000"
          }
        });
      }
    } else {
      colors["comments"] = "";

      if (commentRuleIdx >= 0) {
        textMateRules = textMateRules.filter(r => r && r.scope && !(r.scope as any[]).includes("comment.line.double-slash"));
      }
    }

    colors["textMateRules"] = textMateRules;

    await config.update(CONFIG_TOKENS, colors);

    triggerCommentsHide(colors && !colors["comments"]);
  }
};