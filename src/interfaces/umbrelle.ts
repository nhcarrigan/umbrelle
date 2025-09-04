/**
 * @copyright NHCarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import type { PrismaClient } from "@prisma/client";
import type { Client } from "discord.js";

export interface Umbrelle {
  db:      PrismaClient;
  discord: Client;
  cache:   Map<string, string>;
}
