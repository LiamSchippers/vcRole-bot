// Command Enums
export default class Command {

	static Ping = new Command('ping');
	static VcRole = new Command('setvcjoinrole');

	constructor(name) {
		this.name = name;
	}
}