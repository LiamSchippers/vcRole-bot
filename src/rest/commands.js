import dotenv from 'dotenv';
import { REST, SlashCommandBuilder, Routes } from 'discord.js';
import Command from '../commands/commandEnums.js';

dotenv.config();

const slashCommands = [
	new SlashCommandBuilder().setName(Command.Ping.name).setDescription('Replies with pong!').setDMPermission(false),
	new SlashCommandBuilder()
		.setName(Command.VcRole.name)
		.setDescription('Select a voice chat and a role to be added to the user when they join said voice chat')
		.addChannelOption(option => option.setName('channel').setDescription('The voice chat').setRequired(true))
		.addRoleOption(option => option.setName('viewerrole').setDescription('The role that needs to be added to the user').setRequired(true)),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

export default function registerSlashCommands() {
	rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: slashCommands })
		.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
		.catch(console.error);
}