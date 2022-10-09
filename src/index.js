import dotenv from 'dotenv';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import registerSlashCommands from './rest/commands.js';
import CommandHandler from './handlers/commandHandler.js';
import VoiceStateHandler from './handlers/voiceStateHandler.js';
import VcRoles from './models/vcRoles.js';

// Environment variabbles
dotenv.config();

// Setting up Discord bot
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });
const vcRoles = new VcRoles();
const commandHandler = new CommandHandler(vcRoles);
const voiceStateHandler = new VoiceStateHandler(vcRoles);
client.commands = new Collection();
registerSlashCommands();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) { return; }

	commandHandler.handle(interaction);
});

client.on('voiceStateUpdate', async (oldState, newState) => {
	if (oldState.member.user.bot) return;

	voiceStateHandler.handle(oldState, newState);
});

// Log in the Discord Bot
client.login(process.env.TOKEN);

