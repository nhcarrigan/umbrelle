/**
 * @copyright NHCarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import { MessageFlags, type Interaction, ChannelType } from "discord.js";
import { about } from "../components/about.js";
import type { Umbrelle } from "../interfaces/umbrelle.js";

/**
 * Handles interactions. Rejects anything but chat commands,
 * runs logic based on command name.
 * @param umbrelle - Umbrelle's instance.
 * @param interaction - The interaction payload from Discord.
 */
export const handleInteraction = async(
  umbrelle: Umbrelle,
  interaction: Interaction,
): Promise<void> => {
  if (!interaction.isChatInputCommand() || !interaction.inCachedGuild()) {
    return;
  }
  await interaction.deferReply({
    flags: [ MessageFlags.Ephemeral ],
  });
  const { commandName, options, guild } = interaction;
  if (commandName === "about") {
    await interaction.editReply({
      components: about,
      flags:      [ MessageFlags.IsComponentsV2 ],
    });
    return;
  }
  if (commandName === "honeypot") {
    const channel
      = options.getChannel("channel", true, [ ChannelType.GuildText ]);
    await umbrelle.db.honeypots.upsert({
      create: {
        channelId: channel.id,
        serverId:  guild.id,
      },
      update: {
        channelId: channel.id,
      },
      where: {
        serverId: guild.id,
      },
    });
    umbrelle.cache.set(guild.id, channel.id);
    await interaction.editReply({
      content: `Okay! When people post in <#${channel.id}> I will soft-ban them.`,
    });
    return;
  }
  await interaction.editReply({
    content: `Sorry, but I do not know what to do with a ${commandName} command.`,
  });
};
