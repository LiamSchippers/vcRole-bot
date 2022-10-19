export default class VoiceStateHandler {

	constructor(vcRoles) {
		this.vcRoles = vcRoles;
	}

	async handle(oldState, newState) {
		if (newState.channelId === null) {
			console.log('user left channel', oldState.channelId);
			const role = this.vcRoles.getRole(oldState.channelId);

			if (role != null) {
				newState.member.roles.remove(role);
			}
		}
		else if (oldState.channelId === null) {
			console.log('user joined channel', newState.channelId);
			const role = this.vcRoles.getRole(newState.channelId);

			if (role != null) {
				newState.member.roles.add(role);
			}
		}
		else {
			console.log('user moved channels', oldState.channelId, newState.channelId);

			let role = this.vcRoles.getRole(newState.channelId);

			if (role != null) {
				newState.member.roles.add(role);
				return;
			}

			role = this.vcRoles.getRole(oldState.channelId);
			if (role != null) {
				newState.member.roles.remove(role);
			}
		}
	}
}