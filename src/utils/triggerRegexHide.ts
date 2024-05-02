import { commands } from "vscode";
import { CONFIG_REGEX, CONFIG_COLOR, CONTEXT_KEYS } from "../extension";
import { RegexModel } from "../models/RegexModel";
import { ExtensionService } from "../services/ExtensionService";


export const triggerRegexHide = async (colors: any) => {
  const ext = ExtensionService.getInstance();
  const colorConfig = ext.getSetting<boolean>(CONFIG_COLOR);
  const enabled =
    colors &&
    (!colors["comments"] ||
      (colors["comments"] && colors["comments"] !== colorConfig));
  const regExps = ext.getSetting<RegexModel[]>(CONFIG_REGEX);
  
  await commands.executeCommand('setContext', CONTEXT_KEYS.regex, (regExps && regExps.length > 0));
}
