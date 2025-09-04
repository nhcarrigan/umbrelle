/**
 * @copyright NHCarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import type { Umbrelle } from "../interfaces/umbrelle.js";
import type { Message } from "discord.js";

/**
 * Fetches the configured honeypot channels from the database
 * and attaches them to Umbrelle's cache.
 * @param umbrelle - Umbrelle's instance.
 * @param message - The message payload from Discord.
 */
export const handleMessage = async(
  umbrelle: Umbrelle,
  message: Message,
): Promise<void> => {
  if (!message.inGuild()) {
    return;
  }
  const { author, member, guild, channel } = message;

  const cached = umbrelle.cache.get(guild.id);
  if (cached !== channel.id) {
    return;
  }
  const resolvedMember = member
    ?? guild.members.cache.get(author.id)
    ?? await guild.members.fetch(author.id).catch(() => {
      return null;
    });
  if (!resolvedMember) {
    return;
  }
  await author.send({
    content: `Your account appears to have been compromised. As a security measure, you have been removed from the ${guild.name} community.

You are not banned, however, and may rejoin at any time after you recover your account.`,
  });
  await resolvedMember.ban({
    deleteMessageSeconds: 24 * 60 * 60 * 1000,
    reason:               "Soft ban for a compromised account.",
  });
  await guild.bans.remove(resolvedMember.id,
    "Soft ban for a compromised account.");
};
