import Command from '../commands/commandEnums.js';

export default class CommandHandler {

	constructor(vcRoles) {
		this.vcRoles = vcRoles;
	}

	async handle(interaction) {
		const { commandName } = interaction;

		switch (commandName) {
			case Command.Ping.name:
				await interaction.reply('Pong!');
				break;
			case Command.VcRole.name:
				await interaction.deferReply();
				this.vcRoles.addVcRole(interaction.options.getChannel('channel'), interaction.options.getRole('viewerrole'));
				await interaction.editReply('VcRole set!');
				break;
		}

	}
}