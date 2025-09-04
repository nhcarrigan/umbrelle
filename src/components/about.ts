/**
 * @copyright NHCarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import {
  TextDisplayBuilder,
  SeparatorBuilder,
  SeparatorSpacingSize,
  ContainerBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} from "discord.js";

export const about = [
  new ContainerBuilder().
    addTextDisplayComponents(
      new TextDisplayBuilder().setContent("# About Umbrelle"),
    ).
    addTextDisplayComponents(
      new TextDisplayBuilder().setContent(
        // eslint-disable-next-line stylistic/max-len -- Big boi string.
        "Hi there~! I am Umbrelle, a bot that allows you to configure a honeypot channel to catch compromised accounts.",
      ),
    ).
    addSeparatorComponents(
      new SeparatorBuilder().
        setSpacing(SeparatorSpacingSize.Small).
        setDivider(true),
    ).
    addTextDisplayComponents(
      new TextDisplayBuilder().setContent("## What can I do?"),
    ).
    addTextDisplayComponents(
      new TextDisplayBuilder().setContent(
        // eslint-disable-next-line stylistic/max-len -- Big boi string.
        "To get started, you (or a server admin, if you are not one) needs to run `/honeypot` to set the channel up. From there, sit back and relax and let me do the work! Anyone who sends a message in that channel will be 'soft-banned'; that is, I will ban them to clean up their message history and immediately unban them so they may return to the community when they recover their account.",
      ),
    ).
    addSeparatorComponents(
      new SeparatorBuilder().
        setSpacing(SeparatorSpacingSize.Small).
        setDivider(true),
    ).
    addTextDisplayComponents(
      new TextDisplayBuilder().setContent("## What if I need help?"),
    ).
    addTextDisplayComponents(
      new TextDisplayBuilder().setContent(
        // eslint-disable-next-line stylistic/max-len -- Big boi string.
        "My deepest apologies if I have made a mistake! Please reach out to us in our Discord server or on the forum, and we will do our best to assist you.",
      ),
    ),
  new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().
      setStyle(ButtonStyle.Link).
      setLabel("Discord Server").
      setURL("https://chat.nhcarrigan.com"),
  ),
];
