import VcRole from './vcRole.js';

export default class VcRoles {
	constructor() {
		this.vcRoles = [];
	}

	addVcRole(channel, role) {
		this.vcRoles.push(new VcRole(channel, role));
	}

	getRole(channelId) {
		const vcRole = this.vcRoles.find(vcrole => vcrole.channel.id === channelId);
		return vcRole == null ? null : vcRole.role;
	}
}