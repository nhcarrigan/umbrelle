/**
 * @copyright NHCarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import { logger } from "../utils/logger.js";
import type { Umbrelle } from "../interfaces/umbrelle.js";

/**
 * Fetches the configured honeypot channels from the database
 * and attaches them to Umbrelle's cache.
 * @param umbrelle - Umbrelle's instance.
 */
export const handleReady = async(umbrelle: Umbrelle): Promise<void> => {
  await logger.log(
    "debug",
    `Client authenticated as ${umbrelle.discord.user?.username ?? "unknown user"}`,
  );
  const records = await umbrelle.db.honeypots.findMany();
  for (const record of records) {
    umbrelle.cache.set(record.serverId, record.channelId);
  }
  await logger.log(
    "debug",
    `Cached ${records.length.toString()} honeypot channels.`,
  );
};
