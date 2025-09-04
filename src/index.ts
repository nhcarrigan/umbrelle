/**
 * @copyright NHCarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import { PrismaClient } from "@prisma/client";
import { Client, GatewayIntentBits, Events } from "discord.js";
import { handleInteraction } from "./events/handleInteraction.js";
import { handleMessage } from "./events/handleMessage.js";
import { handleReady } from "./events/handleReady.js";
import { instantiateServer } from "./server/serve.js";
import type { Umbrelle } from "./interfaces/umbrelle.js";

const umbrelle: Umbrelle = {
  cache:   new Map<string, string>(),
  db:      new PrismaClient(),
  discord: new Client({
    intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages ],
  }),
};

umbrelle.discord.once(Events.ClientReady, () => {
  void handleReady(umbrelle);
});

umbrelle.discord.on(Events.MessageCreate, (message) => {
  void handleMessage(umbrelle, message);
});

umbrelle.discord.on(Events.InteractionCreate, (interaction) => {
  void handleInteraction(umbrelle, interaction);
});

await umbrelle.discord.login(process.env.BOT_TOKEN);
instantiateServer();
