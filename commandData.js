import { SlashCommandBuilder, ChannelType } from "discord.js";

const about = new SlashCommandBuilder()
      .setName("about")
      .setDescription("Get information about the bot.");

const honeypot = new SlashCommandBuilder()
      .setName("honeypot")
      .setDescription("Configure your honeypot channel.")
      .addChannelOption(
        option => option.setName("channel").setDescription("Your honeypot channel.").setRequired(true).addChannelTypes(ChannelType.GuildText)
      );

console.log(JSON.stringify([
  about.toJSON(),
  honeypot.toJSON()
]));
