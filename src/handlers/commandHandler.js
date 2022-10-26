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
				this.handleVcRoleCommand(interaction);
				break;
		}
	}

	async handleVcRoleCommand(interaction) {

		await interaction.deferReply({ ephemeral: true });

		if (!interaction.memberPermissions.has('ADMINISTRATOR')) {
			await interaction.editReply('You aren\'t allowed to use this command');
			return;
		}

		this.vcRoles.addVcRole(interaction.options.getChannel('channel'), interaction.options.getRole('viewerrole'));
		await interaction.editReply('VcRole set!');
	}
}